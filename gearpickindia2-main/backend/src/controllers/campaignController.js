import db from '../services/db.js';
import { v4 as uuid } from 'uuid';
export const createCampaign = (req, res) => {
  const campaign = { id: uuid(), tenantId: req.user.tenantId, ...req.body, createdAt: new Date().toISOString() };
  db.campaigns.push(campaign);
  res.status(201).json(campaign);
};
export const listCampaigns = (req, res) => res.json(db.campaigns.filter((c) => c.tenantId === req.user.tenantId));
