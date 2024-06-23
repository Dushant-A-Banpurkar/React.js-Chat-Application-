import express from 'express';
import { getUserForSideBar } from '../controllers/user_controller.js';
import protectRoutes from '../middleware/protectRoutes.js';


const router=express.Router();

router.get("/",protectRoutes,getUserForSideBar);

export default router;