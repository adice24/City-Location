import { Request, Response } from 'express';
import prisma from '../services/prisma.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const getCities = async (req: Request, res: Response) => {
  try {
    const cities = await prisma.city.findMany({
      include: { _count: { select: { listings: true } } }
    });
    res.json(cities);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCity = async (req: AuthRequest, res: Response) => {
  try {
    const { name, slug, description } = req.body;
    const city = await prisma.city.create({
      data: { name, slug, description }
    });
    res.status(201).json(city);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCity = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { name, description } = req.body;

    if (req.user.role === 'CITY_ADMIN' && req.user.cityId !== id) {
      return res.status(403).json({ message: 'Unauthorized for this city' });
    }

    const city = await prisma.city.update({
      where: { id },
      data: { name, description }
    });
    res.json(city);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
