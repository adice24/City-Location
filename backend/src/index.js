"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const server = app_1.default.listen(PORT, () => {
    console.log(`🚀 Antigravity City Intelligence running at http://localhost:${PORT}`);
    console.log(`📡 API System Active: http://localhost:${PORT}/api`);
});
server.on('error', (err) => {
    console.error('SERVER ERROR:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
//# sourceMappingURL=index.js.map