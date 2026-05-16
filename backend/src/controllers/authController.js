import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { env } from '../config/env.js';
import { createUser, findUserByEmail } from '../models/userModel.js';

export const register = async (req, res) => {
  const { email, password, tenantName } = req.body;
  if (findUserByEmail(email)) return res.status(409).json({ error: 'User exists' });
  const user = { id: uuid(), email, passwordHash: await bcrypt.hash(password, 10), tenantId: tenantName || 'default' };
  createUser(user);
  res.json({ id: user.id, email: user.email, tenantId: user.tenantId });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ sub: user.id, tenantId: user.tenantId, email: user.email }, env.jwtSecret, { expiresIn: '12h' });
  res.json({ token });
};
