import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const upvoteFeedback = async (req: Request  & { user?: { id: number } }, res: Response): Promise<void> => {
  const feedbackId = Number(req.params.id);
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const feedback = await prisma.feedback.findUnique({ where: { id: feedbackId } });
    if (!feedback) {
      res.status(404).json({ message: 'Feedback not found' });
      return;
    }

    const existingUpvote = await prisma.upvote.findUnique({
      where: { feedbackId_userId: { feedbackId, userId } },
    });

    if (existingUpvote) {
      res.status(400).json({ message: 'You have already upvoted this feedback' });
      return;
    }

    await prisma.upvote.create({
      data: { feedbackId, userId },
    });

    res.status(201).json({ message: 'Upvote added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const removeUpvote = async (req: Request  & { user?: { id: number } }, res: Response): Promise<void> => {
  const feedbackId = Number(req.params.id);
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const upvote = await prisma.upvote.findUnique({
      where: { feedbackId_userId: { feedbackId, userId } },
    });

    if (!upvote) {
      res.status(404).json({ message: 'Upvote not found' });
      return;
    }

    await prisma.upvote.delete({
      where: { feedbackId_userId: { feedbackId, userId } },
    });

    res.status(200).json({ message: 'Upvote removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
