import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import generateOtp from "../utils/generateOtp.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail from "../utils/email.js";
import {otpTemplate,resendOtpTemplate} from "../utils/otpEmailTemplate.js";
import {welcomeEmailTemplate} from "../utils/welcomeEmailTemplate.js";
import { passwordResetSuccessEmailTemplate } from '../utils/passwordResetSuccessEmailTemplate.js';
import {passwordResetOTPEmailTemplate} from "../utils/passwordResetOTPEmailTemplate.js";


//Environment Variables
dotenv.config();


//Jwt Token
const signJwtToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
// 
const createSendToken = async (user, statusCode, res, message) => {
    const token = signJwtToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",//Secure in production only
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",//Secure in production only
    };

    res.cookie("token", token, cookieOptions);

    user.password = undefined;
    user.confirmPassword = undefined;
    user.otp = undefined;
    res.status(statusCode).json({
        status: "success",
        token,
        message,
        data: {
            user,
        }
    });


}


//=======SIGN UP========//
const signup = catchAsync(async (req, res, next) => {

    //Take the data from the body from req
    const { name, email, password, confirmPassword } = req.body;

    //Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError('User already exists', 400));
    }

    //Otp Generate 
    const otp = generateOtp();

    const otpExpires = Date.now() + 600000 //10 minutes in milliseconds
    //Create a new user
    const newUser = await User.create({name, email, password, confirmPassword, otp, otpExpires });

    //send Otp to the user
    try {
        await sendEmail({
            email: newUser.email,
            subject: "OTP received for Account verification",
            html: otpTemplate(newUser.name, otp),
        })
        createSendToken(newUser, 200, res, "OTP sent to your email, please verify your account");
    } catch (error) {
        await User.findByIdAndDelete(newUser._id);//if email sending fails, delete the user
        return next(new AppError('Error: sending email failed', 500));
    }

});


//=======Verify Account========//
const verifyEmail = catchAsync(async (req, res, next) => {

    const { otp } = req.body;
    if (!otp) {
        return next(new AppError('OTP is required', 400));
    }

    const user = req.user;
    if (user.otp !== otp) {
        return next(new AppError('Invalid OTP', 400));
    }

    if (user.otpExpires < Date.now()) {
        return next(new AppError('OTP Expired', 400));
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validatebeforeSave: false })
      // Send the welcome email
      try {
        await sendEmail({
            email: user.email,
            subject: "Welcome to Our Community! [SarvaMoh Ai 🎉❤️]",
            html: welcomeEmailTemplate(user.name),
        });
    } catch (error) {
        console.error("Error sending welcome email:", error);
        // Handle email send error here, if necessary
    }
    // Respond without creating a token
    res.status(200).json({
        status: "success",
        message: "Account verified successfully",
    });

});


//=========Resend OTP========//
const resendOtp = catchAsync(async (req, res, next) => {
    const {email} = req.user;
    if(!email){
        return next(new AppError('Email is required to send otp again', 400));
    }
    const user = await User.findOne({ email });
    
    
    if (!user) {
        return next(new AppError('User not found', 404));
    }
   

    if(user.isVerified){
        return next(new AppError('User is already verified', 400));
    }

    const newOtp = generateOtp();
    const otpExpires = Date.now() + 600000 //10 minutes in milliseconds
    user.otp = newOtp;
    user.otpExpires = otpExpires;
    await user.save({ validatebeforeSave: false })
    
    
    try {
        await sendEmail({
            email: user.email,
            subject: "New OTP received for Account verification",
            html: resendOtpTemplate(user.name, newOtp),
        })
        res.status(200).json({
            status: "success",
            message: "A new OTP has been sent successfully",
        })
    }
    catch (error) {
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save({ validatebeforeSave: false })
        return next(new AppError('Error: Sending email failed😢', 500));
    }

})




//=========Login========//

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (( !email) || !password) {
        return next(new AppError("Enter correct email  and password", 400));
    }

    // Find user by email
    const user = await User.findOne( {email}).select("+password"); // Ensure password is selected
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    // Check if password is correct
    const isPasswordCorrect = await user.correctPassword(password, user.password);
    if (!isPasswordCorrect) {
        return next(new AppError("Incorrect password", 401));
    }

    // Send response (e.g., create and send token)
    createSendToken(user, 200, res, "Login successful");
});

//=============Logout=============//
const logout = catchAsync(async (req, res, next) => {
    res.cookie("token", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),//10 seconds
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.status( 200).json({
        status: "success",
        message: "Logged out successfully",
    });
    
})

//==============forgetPassword==============//
const forgetPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    const newResetPasswordOTP = generateOtp();
    const newResetPasswordOTPExpires = Date.now() + 600000; // 10 minutes in milliseconds
    user.resetPasswordOTP = newResetPasswordOTP;
    user.resetPasswordOTPExpires = newResetPasswordOTPExpires;
    await user.save({ validatebeforeSave: false })
    //send email
    try {
        await sendEmail({
            email: user.email,
            subject: "Password reset OTP has been received",
            html: passwordResetOTPEmailTemplate(user.name, newResetPasswordOTP),
        })
        res.status(200).json({
            status: "success",
            message: "Password reset OTP has been sent successfully",
        })
    }
    catch (error) {
        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpires = undefined;
        await user.save({ validatebeforeSave: false })
        return next(new AppError('Error: Sending email failed', 500));
    }

})

//==============ResetPassword==============//
const resetPassword = catchAsync(async (req, res, next) => {
    const { email, password, confirmPassword, otp } = req.body;
    const user = await User.findOne({ 
        email,
        resetPasswordOTP: otp,
        resetPasswordOTPExpires: {$gt : Date.now()}
     });

     if(!user){
        return(new AppError("User not found", 404))
     }
     user.password = password
     user.confirmPassword = confirmPassword
     user.resetPasswordOTP= undefined
     user.resetPasswordOTPExpires=undefined

     await user.save()
      // Send the welcome email
      try {
        await sendEmail({
            email: user.email,
            subject: "Password Reset Successful 🎉🎉",
            html: passwordResetSuccessEmailTemplate(user.name),
        });
    } catch (error) {
        console.error("Error sending welcome email:", error);
        // Handle email send error here, if necessary
    }
     createSendToken(user,200,res,"Password reset has been sucessfully done!🎉")

})



export { signup, verifyEmail,resendOtp,login,logout, forgetPassword, resetPassword }
