import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { signInUser, signUpUser } from "../../service/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authRequest, authSuccess } from "../../redux/authSlice";
import { VscAccount } from "react-icons/vsc";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const signinSchema = yup.object().shape({
    email: yup
      .string()
      .email("invalid email format")
      .required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("password is required"),
  });

  const signupSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isSignUp ? signupSchema : signinSchema),
  });

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  const onSubmit = async (data) => {
    dispatch(authRequest())
    try {
      if (isSignUp) {
        const result = await signUpUser(data);
        console.log(result.data.user);
        if (result.status === "success") {
          dispatch(authSuccess(result.data))
          console.log(result);
          
          toast.success(result.message);
          navigate("/verify-otp");
        } else {
          toast.error(result.message);
        }
      } else {
        const result = await signInUser(data);
        console.log(result);
        if (result.status === "success") {
          toast.success(result.message);
          navigate("/");
        } else {
          toast.error(
            result.message ||
            "Login failed . please check your email and password"
          );
        }
      }
    } catch (error) {
      toast.error("An unexpectd error occurred. please try again later");
      console.error(error);
    } finally {
      reset();
    }
  };


  const handleForgotPassword = (e) => {
    e.preventDefault()
    navigate("/forgot-password");
  }

  return (
    <div className="flex min-h-[80vh] flex-1 justify-center px-6  lg:px-8 mt-10 ">
      <div className="flex flex-col justify-center w-full px-2 py-2 md:px-0 max-w-md space-y-6 shadow-xl rounded-l-lg bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <VscAccount className="mx-auto h-10 w-auto" />
          <h2 className="mt-5 text-center  font-bold text-2xl leading-3 tracking-tight text-gray-900">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
           
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="flex text-sm font-medium leading-3 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    type="text"
                    {...register("name")}
                    className="block w-full rounded-md border-0  px-2 text-gray-900 shadow-sm ring-1 ring-inset rign-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-9"
                  />
                  {errors.name && (
                    <p className="text-red-600">{errors.name.message}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="flex text-sm font-medium leading-3 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="block w-full rounded-md border-0  px-2 text-gray-900 shadow-sm ring-1 ring-inset rign-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-9"
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="flex text-sm font-medium leading-3 text-gray-900"
              >
                password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  placeholder="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="block w-full rounded-md border-0 px-2 text-gray-900 shadow-sm ring-1 ring-inset rign-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-9"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>
            {!isSignUp && (
              <div className="text-sm flex mt-2 ">
                <button className="font-semibold text-indigo-600 hover:text-indigo-400" onClick={handleForgotPassword}>
                  Forgot Password
                </button>
              </div>
            )}
            {isSignUp && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="flex text-sm font-medium leading-3 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset rign-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-9"
                  />

                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                    onClick={toggleConfirmPassword}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? <FaSpinner className="animate-spin text-2xl" /> : isSignUp ? "Create Account" : "Sign in"}
              </button>
            </div>
          </form>

          {/* <div className="mt-4">
            <GoogleLogin />
          </div> */}

          <p className="mt-3 text-center text-sm text-gray-500">
            {isSignUp ? "Already have an account !" : "Not a account?"}{" "}
            <button
              type="button"
              onClick={toggleSignUp}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-400 "
            >
              {isSignUp ? "Sign in" : "Create Account"}
            </button>
            <br />
              <a className=" bg-slate-100 font-semibold leading-6 text-indigo-600 hover:text-indigo-400" href="/resend-otp" >Resend otp to verify email</a>
          </p>
        </div>
      </div>
      <div className="hidden md:flex md:items-center md:justify-center md:w-1/2">
        <img
          src="https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg"
          alt="login_img"
          className="object-cover w-full h-full  rounded-r-lg"
        />
      </div>
    </div>
  );
};

export default Login;
