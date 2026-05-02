import { Response } from 'express';
import prisma from '../services/prisma.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const getListings = async (req: AuthRequest, res: Response) => {
  try {
    const { cityId, status } = req.query;
    let filter: any = {};
    
    // ROLE-BASED FILTERING
    if (req.user.role === 'NORMAL') {
      // Normal users only see THEIR own uploads in the dashboard
      filter.userId = req.user.id;
    } else if (req.user.role === 'CITY_ADMIN') {
      // City admins only see listings in THEIR city
      filter.cityId = req.user.cityId;
    }
    // SUPER_ADMIN sees everything

    if (status) filter.status = status;
    if (cityId && req.user.role !== 'CITY_ADMIN') filter.cityId = cityId;

    const listings = await prisma.listing.findMany({
      where: filter,
      include: { city: true, user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(listings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createListing = async (req: AuthRequest, res: Response) => {
  try {
    const { name, category, cityId, data } = req.body;

    // Normal users can upload anywhere, but City Admins are locked to their city
    if (req.user.role === 'CITY_ADMIN' && req.user.cityId !== cityId) {
      return res.status(403).json({ message: 'Unauthorized for this location' });
    }

    const listing = await prisma.listing.create({
      data: { 
        name, 
        category, 
        cityId, 
        data, 
        userId: req.user.id,
        status: 'PENDING' // All new uploads from Normal users start as pending
      }
    });
    res.status(201).json(listing);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateListingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body; // APPROVED or REJECTED

    if (req.user.role === 'NORMAL') {
      return res.status(403).json({ message: 'Normal users cannot moderate status' });
    }

    const existing = await prisma.listing.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Listing not found' });

    if (req.user.role === 'CITY_ADMIN' && req.user.cityId !== existing.cityId) {
      return res.status(403).json({ message: 'Unauthorized for this city' });
    }

    const listing = await prisma.listing.update({
      where: { id },
      data: { status }
    });
    res.json(listing);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteListing = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.listing.findUnique({ where: { id } });
    
    if (!existing) return res.status(404).json({ message: 'Listing not found' });

    // Users can delete their own, Admins can delete in their city, Super Admin can delete anything
    const isOwner = existing.userId === req.user.id;
    const isAdminOfCity = req.user.role === 'CITY_ADMIN' && req.user.cityId === existing.cityId;
    const isSuper = req.user.role === 'SUPER_ADMIN';

    if (!isOwner && !isAdminOfCity && !isSuper) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await prisma.listing.delete({ where: { id } });
    res.json({ message: 'Deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
