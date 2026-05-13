import express from "express";
import { register, login, logout ,checkAuth} from "../controllers/authController.js";
import  {profileUpdate,getProfile}  from "../controllers/ProfileController.js";
import multer from "multer";
import {verifyToken} from "../middleware/authMiddleware.js";
import { getCompliments } from "../controllers/complimentController.js";
import { forgotPassword,resetPassword } from "../controllers/authController.js";
import { getTransactions } from "../controllers/transactionController.js";  
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Attach multer to the register route
router.post("/register", upload.single("profilePic"), register);


router.post("/login", login);
router.post("/logout", logout);
router.get("/check", checkAuth);
router.get("/profile",verifyToken,getProfile);
router.get("/compliments",verifyToken,getCompliments);
router.post("/profile",verifyToken,upload.single("profilePic"),profileUpdate);   
router.get("/getTransactions",verifyToken,getTransactions);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;