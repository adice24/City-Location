import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../services/prisma.service';
import { generateToken } from '../utils/jwt.utils';
import { signupSchema, loginSchema } from '../validation/auth.validation';
import { ZodError } from 'zod';

export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const { email, password, name, role } = validatedData;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword, 
        name,
        role: (role as any) || 'NORMAL'
      }
    });

    const token = generateToken({ id: user.id, role: user.role, cityId: user.cityId });
    res.status(201).json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: error.issues.map((e: any) => ({ path: e.path[0], message: e.message })) 
      });
    }
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken({ id: user.id, role: user.role, cityId: user.cityId });
    res.json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name, role: user.role, cityId: user.cityId } 
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: error.issues.map((e: any) => ({ path: e.path[0], message: e.message })) 
      });
    }
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
};
