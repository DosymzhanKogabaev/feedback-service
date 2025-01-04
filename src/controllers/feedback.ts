import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createFeedback = async (req: Request & { user?: { id: number } }, res: Response): Promise<void> => {
  const { title, description, categoryId, statusId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const feedback = await prisma.feedback.create({
      data: {
        title,
        description,
        categoryId,
        statusId,
        authorId: userId,
      },
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getFeedbackById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: Number(id) },
      include: {
        author: true,
        category: true,
        status: true,
        upvotes: true,
      },
    });

    if (!feedback) {
      res.status(404).json({ message: 'Feedback not found' });
      return;
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const updateFeedback = async (req: Request & { user?: { id: number } }, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, categoryId, statusId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const feedback = await prisma.feedback.updateMany({
      where: { id: Number(id), authorId: userId },
      data: { title, description, categoryId, statusId },
    });

    if (!feedback.count) {
      res.status(403).json({ message: 'Not authorized to update this feedback' });
      return;
    }

    res.status(200).json({ message: 'Feedback updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const deleteFeedback = async (req: Request & { user?: { id: number } }, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const feedback = await prisma.feedback.deleteMany({
      where: { id: Number(id), authorId: userId },
    });

    if (!feedback.count) {
      res.status(403).json({ message: 'Not authorized to delete this feedback' });
      return;
    }

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getAllFeedback = async (req: Request, res: Response): Promise<void> => {
  const { category, status, sort, page = 1, pageSize = 10 } = req.query;

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        category: category ? { name: String(category) } : undefined,
        status: status ? { name: String(status) } : undefined,
      },
      orderBy: sort === 'upvotes'
        ? { upvotes: { _count: 'desc' } }
        : { createdAt: 'desc' },
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
      include: {
        author: true,
        category: true,
        status: true,
        upvotes: true,
      },
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
