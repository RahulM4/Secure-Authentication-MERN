import { authFailure, authRequest, authSuccess, logoutSuccess, verifyOtpSuccess } from "../redux/authSlice";
import store from "../redux/store";
import axiosInstance from "./url.service";


const dispatch = store.dispatch;


//signup user
export const signUpUser = async (userData) => {
    dispatch(authRequest());
    try {
        const response = await axiosInstance.post('/signup', userData);
        console.log(response);
        dispatch(authSuccess(response.data.data));
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Network error occurred';
        const errorStatus = error.response?.status || 500;

        dispatch(authFailure({
            message: errorMessage,
            status: errorStatus
        }));
        throw error.response.data;
    
     }
}



//signin user
export const signInUser = async (userData) => {
    dispatch(authRequest);
    try {
        const response = await axiosInstance.post('/login', userData)
        dispatch(authSuccess(response.data.data))
        return response.data;
    } catch (error) {
        dispatch(authFailure(error))
        throw error.response.data;
    }
}


//otp verify user
export const otpVerify = async (optData) => {
    dispatch(authRequest);
    try {
        const response = await axiosInstance.post('/verify-otp', optData)
        dispatch(verifyOtpSuccess())
        return response.data;
    } catch (error) {
        dispatch(authFailure(error.response.data));
        throw error.response.data;
    }
}

//user resend otp
export const resendOtp = async () => {
    dispatch(authRequest());
    try {
        const response = await axiosInstance.post('/resend-otp')
        dispatch(authSuccess(response.data.data));
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Network error occurred';
        const errorStatus = error.response?.status || 500;
        
        dispatch(authFailure({
            message: errorMessage,
            status: errorStatus
        }));
        throw error.response.data;
    }
}


//user forgot password
export const forgotPassword = async (email) => {
    try {
        const response = await axiosInstance.post('/forgot-password', email)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

//user reset password
export const resetPassword = async (resetData) => {
    try {
        const response = await axiosInstance.post('/reset-password', resetData)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

//user logout
export const logout = async () => {
    try {
        const response = await axiosInstance.post('/logout')
        if (response.status === 200) {
            dispatch(logoutSuccess())
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


//user-profile
export const fetchUserProfile = async () => {
    dispatch(authRequest());
    try {
        const response = await axiosInstance.get('/profile')
        console.log(response.data)
        dispatch(authSuccess(response.data.data))
        return response.data;
    } catch (error) {
        dispatch(authFailure(error.response.data))
        throw error.response.data;
    }
}