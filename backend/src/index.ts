import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
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
