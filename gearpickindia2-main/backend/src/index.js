import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import { bindSockets } from './ws/socketServer.js';
import { startLoop } from './jobs/autonomousLoop.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_, res) => res.json({ ok: true, service: 'backend' }));
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);

const server = http.createServer(app);
const io = new Server(server, { path: env.wsPath, cors: { origin: '*' } });
bindSockets(io);
startLoop();
server.listen(env.port, () => console.log(`backend on ${env.port}`));
