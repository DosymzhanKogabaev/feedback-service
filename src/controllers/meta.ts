import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getStatuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const statuses = await prisma.status.findMany();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
