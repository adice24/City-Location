"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCity = exports.createCity = exports.getCities = void 0;
const prisma_service_1 = __importDefault(require("../services/prisma.service"));
const getCities = async (req, res) => {
    try {
        const cities = await prisma_service_1.default.city.findMany({
            include: { _count: { select: { listings: true } } }
        });
        res.json(cities);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCities = getCities;
const createCity = async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        const city = await prisma_service_1.default.city.create({
            data: { name, slug, description }
        });
        res.status(201).json(city);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createCity = createCity;
const updateCity = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        if (req.user.role === 'CITY_ADMIN' && req.user.cityId !== id) {
            return res.status(403).json({ message: 'Unauthorized for this city' });
        }
        const city = await prisma_service_1.default.city.update({
            where: { id },
            data: { name, description }
        });
        res.json(city);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateCity = updateCity;
//# sourceMappingURL=city.controller.js.map