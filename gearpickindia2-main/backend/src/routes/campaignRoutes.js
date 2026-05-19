import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createCampaign, listCampaigns } from '../controllers/campaignController.js';
const router = Router();
router.use(requireAuth);
router.get('/', listCampaigns);
router.post('/', createCampaign);
export default router;
