import express from 'express';
import { generateImage, generateVideo, chatRequest, utilityGeneric, removeBackground, n8nProxy, geminiBrain } from '../controllers/toolController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Require auth for all tool routes
router.use(protect);

router.post('/image', generateImage);
router.post('/video', generateVideo);
router.post('/chat', chatRequest);
router.post('/utility/:action', utilityGeneric);
router.post('/proxy/:action', n8nProxy);
router.post('/remove-bg', removeBackground);
router.post('/gemini-brain', geminiBrain);

export default router;
