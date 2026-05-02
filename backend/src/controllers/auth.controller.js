"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_service_1 = __importDefault(require("../services/prisma.service"));
const jwt_utils_1 = require("../utils/jwt.utils");
const auth_validation_1 = require("../validation/auth.validation");
const zod_1 = require("zod");
const signup = async (req, res) => {
    try {
        const validatedData = auth_validation_1.signupSchema.parse(req.body);
        const { email, password, name, role } = validatedData;
        const existing = await prisma_service_1.default.user.findUnique({ where: { email } });
        if (existing)
            return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_service_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role || 'NORMAL'
            }
        });
        const token = (0, jwt_utils_1.generateToken)({ id: user.id, role: user.role, cityId: user.cityId });
        res.status(201).json({
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: error.issues.map((e) => ({ path: e.path[0], message: e.message }))
            });
        }
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const validatedData = auth_validation_1.loginSchema.parse(req.body);
        const { email, password } = validatedData;
        const user = await prisma_service_1.default.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ message: 'Invalid email or password' });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid email or password' });
        const token = (0, jwt_utils_1.generateToken)({ id: user.id, role: user.role, cityId: user.cityId });
        res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role, cityId: user.cityId }
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: error.issues.map((e) => ({ path: e.path[0], message: e.message }))
            });
        }
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map