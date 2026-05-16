import dotenv from 'dotenv';
dotenv.config();
export const env = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'dev_secret',
  wsPath: process.env.WS_PATH || '/ws'
};
