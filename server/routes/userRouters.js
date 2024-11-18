import express from "express";
import { signup, verifyEmail, resendOtp,login,logout, forgetPassword,resetPassword } from "../controller/authController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();
router.post("/signup", signup);
router.post("/verify-otp", isAuthenticated, verifyEmail);
router.post("/resend-otp", isAuthenticated, resendOtp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

export default router;