import express from 'express'
import { login, logout, signup } from './controlllers.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/Login", login);
router.post("/Logout", logout);




export default router;