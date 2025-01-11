import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  resetError,
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../../../redux/user/userSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [errors, setErrors] = useState({
    validpassword: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Add an uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Add a lowercase letter.";
    }
    if (!hasNumber) {
      return "Add a number.";
    }
    if (!hasSpecialChar) {
      return "Add a special character.";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      const passwordError = validatePassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        validpassword: passwordError,
      }));
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      const res = await fetch("/api/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signUpFailure(data.message));
        return;
      }
      dispatch(signUpSuccess(data.data));
      navigate("/");
    } catch (error) {
      dispatch(signUpFailure(error.message));
    }
  };
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#c2c2c2] ">
      <div className="lg:w-[90%] lg:h-[95%] w-full h-full bg-white flex items-center justify-center md:flex-row flex-col ">
        {/* <div className="bg-black md:h-full h-[50%] w-full md:w-2/4 lg:w-3/5 testipmg "></div> */}
        <div className=" h-full lg:w-2/5 md:w-2/4 w-full flex justify-center items-center  ">
          <div className="h-full w-full flex items-center justify-center flex-col p-5 ">
            <h2 className="md:text-2xl text-3xl font-semibold text-center">
              Sign Up
            </h2>
            <p className="text-gray-500 font-normal text-base md:text-sm mb-3">
              Your productivity journey starts here
            </p>
            <form className="p-3 flex flex-col gap-3" onSubmit={handleSubmit}>
              <div>
                <label className="md:text-sm text-lg font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  required
                  name="fullName"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="full name"
                  className="w-full px-4 py-2 border border-gray-300 placeholder:text-lg md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="">
                <label className="md:text-sm text-lg font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email address"
                  className="w-full px-4 py-2 border border-gray-300 placeholder:text-lg md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="relative">
                <label className="md:text-sm text-lg font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-2 ">
                  <input
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    type={visibility.password ? "text" : "password"}
                    placeholder="e.g.: X Æ A-12"
                    className="w-full px-4 py-2 border border-gray-300 placeholder:text-lg md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black rounded"
                  />
                  {errors.validpassword && (
                    <p className="text-red-500 text-sm -bottom-5 absolute">
                      {errors.validpassword}
                    </p>
                  )}
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
                    onClick={() => toggleVisibility("password")}
                  >
                    {visibility.password ? (
                      <IoEyeOutline />
                    ) : (
                      <IoEyeOffOutline />
                    )}
                  </button>
                </div>
              </div>
              <div className="relative">
                <label className="md:text-sm text-lg font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative mt-2 ">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    type={visibility.confirmPassword ? "text" : "password"}
                    placeholder="e.g.: X Æ A-12"
                    className="w-full px-4 py-2 border border-gray-300 placeholder:text-lg md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black rounded"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm -bottom-5 absolute">
                      {errors.confirmPassword}
                    </p>
                  )}

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
                    onClick={() => toggleVisibility("confirmPassword")}
                  >
                    {visibility.confirmPassword ? (
                      <IoEyeOutline />
                    ) : (
                      <IoEyeOffOutline />
                    )}
                  </button>
                  {error && (
                    <p className="text-red-500 text-sm absolute">{error}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-lg md:text-base bg-black hover:bg-white hover:text-black border-2 border-black text-white py-2  focus:outline-none mt-9"
              >
                Sign Up
              </button>
              <button className="flex items-center justify-center text-lg md:text-base w-full py-2 border border-gray-300  hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition duration-200">
                <FcGoogle className="mr-2 text-lg" />
                Sign Up with Google
              </button>
            </form>

            <div className="flex items-center justify-center w-full mt-5">
              <h1 className="text-gray-500 font-normal text-base md:text-sm">
                Have an account?{" "}
                <Link
                  className="text-blue-600 hover:text-blue-700"
                  to={"/signin"}
                >
                  Sign in
                </Link>
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-black md:h-full h-[50%] w-full md:w-2/4 lg:w-3/5 testipmg "></div>
      </div>
    </div>
  );
}
