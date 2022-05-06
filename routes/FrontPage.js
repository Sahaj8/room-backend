import express from 'express';
import { getFrontPage } from '../controllers/FrontPage.js';

const router = express.Router();

router.get("/", getFrontPage);

export default router;