import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists, please try another one"],
        trim: [true, "Email must not contain any space"],
        validate: [validator.isEmail, "Email must be valid"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email must be valid"],
        isLowercase: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLen: 6,
        //password upper, lower, number, character
        match: [/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, "Password must contain upper, lower, number, character"],
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, "Password is required"],
        minLen: 6,
        select: false,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Password and Confirm Password must be same"
        }
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        default: null,

    },
    otpExpires: {
        type: Date,
        default: null,
    },
    resetPasswordOTP: {
        type: String,
        default: null,
    },
    resetPasswordOTPExpires: {
        type: String,
        default: null,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    updateAt: {
        type: Date,
        default: Date.now(),
    },

})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});
//coorectPassword method to compare the password with the hashed password
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
export default User;