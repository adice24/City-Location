"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    try {
        const decoded = (0, jwt_utils_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map