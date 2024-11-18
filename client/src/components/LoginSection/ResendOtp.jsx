import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resendOtp } from "../../service/auth.service";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa"; // FaSpinner for the loading spinner

const ResendOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await resendOtp(data); 
      if (result.status === "success") {
        toast.success(result.message);
        navigate("/verify-otp");
      } else {
        toast.error(result.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        // Server response error
        toast.error(error.response.data.message || "An error occurred while resending OTP.");
      } else if (error.request) {
        // Network or server not responding
        toast.error("Network error. Please check your connection.");
      } else {
        // Unknown error
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-6">Resend OTP</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              placeholder="Enter a valid email address"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${errors.email ? 'border-red-500' : ""}`}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? <FaSpinner className="animate-spin text-2xl" /> : 'Resend OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResendOtp;
