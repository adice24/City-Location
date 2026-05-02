"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListing = exports.updateListingStatus = exports.createListing = exports.getListings = void 0;
const prisma_service_1 = __importDefault(require("../services/prisma.service"));
const getListings = async (req, res) => {
    try {
        const { cityId, status } = req.query;
        let filter = {};
        // ROLE-BASED FILTERING
        if (req.user.role === 'NORMAL') {
            // Normal users only see THEIR own uploads in the dashboard
            filter.userId = req.user.id;
        }
        else if (req.user.role === 'CITY_ADMIN') {
            // City admins only see listings in THEIR city
            filter.cityId = req.user.cityId;
        }
        // SUPER_ADMIN sees everything
        if (status)
            filter.status = status;
        if (cityId && req.user.role !== 'CITY_ADMIN')
            filter.cityId = cityId;
        const listings = await prisma_service_1.default.listing.findMany({
            where: filter,
            include: { city: true, user: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(listings);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getListings = getListings;
const createListing = async (req, res) => {
    try {
        const { name, category, cityId, data } = req.body;
        // Normal users can upload anywhere, but City Admins are locked to their city
        if (req.user.role === 'CITY_ADMIN' && req.user.cityId !== cityId) {
            return res.status(403).json({ message: 'Unauthorized for this location' });
        }
        const listing = await prisma_service_1.default.listing.create({
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createListing = createListing;
const updateListingStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body; // APPROVED or REJECTED
        if (req.user.role === 'NORMAL') {
            return res.status(403).json({ message: 'Normal users cannot moderate status' });
        }
        const existing = await prisma_service_1.default.listing.findUnique({ where: { id } });
        if (!existing)
            return res.status(404).json({ message: 'Listing not found' });
        if (req.user.role === 'CITY_ADMIN' && req.user.cityId !== existing.cityId) {
            return res.status(403).json({ message: 'Unauthorized for this city' });
        }
        const listing = await prisma_service_1.default.listing.update({
            where: { id },
            data: { status }
        });
        res.json(listing);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateListingStatus = updateListingStatus;
const deleteListing = async (req, res) => {
    try {
        const id = req.params.id;
        const existing = await prisma_service_1.default.listing.findUnique({ where: { id } });
        if (!existing)
            return res.status(404).json({ message: 'Listing not found' });
        // Users can delete their own, Admins can delete in their city, Super Admin can delete anything
        const isOwner = existing.userId === req.user.id;
        const isAdminOfCity = req.user.role === 'CITY_ADMIN' && req.user.cityId === existing.cityId;
        const isSuper = req.user.role === 'SUPER_ADMIN';
        if (!isOwner && !isAdminOfCity && !isSuper) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await prisma_service_1.default.listing.delete({ where: { id } });
        res.json({ message: 'Deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteListing = deleteListing;
//# sourceMappingURL=listing.controller.js.map