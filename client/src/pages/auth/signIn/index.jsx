import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  resetError,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../../redux/user/userSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [visibility, setVisibility] = useState({
    password: false,
  });

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) {
      dispatch(signInFailure(null));
    }
    error = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Please fill in all required fields."));
      return;
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data.data));

      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#c2c2c2] ">
      <div className="w-full h-full md:w-[90%] md:h-[95%] bg-white flex items-center justify-center md:flex-row flex-col ">
        <div className="bg-black md:h-full h-[40%] w-full md:w-2/4 lg:w-3/5 testipmg "></div>
        <div className=" h-full md:w-2/4 lg:w-2/5 w-full flex justify-center items-center  ">
          <div className="h-full w-full flex items-center justify-center flex-col p-5 ">
            <h2 className="md:text-2xl text-3xl font-semibold text-center">
              Sign In
            </h2>
            <p className="text-gray-500 font-normal text-base md:text-sm mb-3">
              Your productivity journey starts here
            </p>
            <form className="p-3 flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="">
                <label className="md:text-sm  text-lg font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email address"
                  className="w-full px-4 py-2 border border-gray-300 md:placeholder:text-sm placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="relative">
                <label className="text-lg md:text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type={visibility.password ? "text" : "password"}
                    placeholder="e.g.: X Æ A-12"
                    className="w-full px-4 py-2 border border-gray-300 placeholder:text-lg md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black rounded"
                  />
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

                {error && (
                  <p className="text-red-500 text-sm absolute">{error}</p>
                )}
              </div>

              <Link className=" text-base md:text-xs font-medium text-gray-700 flex self-end">
                Forgot Password
              </Link>

              <button
                type="submit"
                className="w-full text-lg md:text-base bg-black hover:bg-white hover:text-black border-2 border-black text-white py-2  focus:outline-none mt-9"
              >
                Sign In
              </button>
              <button className="flex items-center justify-center text-lg md:text-base w-full py-2 border border-gray-300  hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition duration-200">
                <FcGoogle className="mr-2 text-lg" />
                Sign In with Google
              </button>
            </form>
            <div className="flex items-center justify-center w-full mt-5">
              <h1 className="text-gray-500 font-normal text-base md:text-sm">
                Dont't have an account?{" "}
                <Link
                  className="text-blue-600 hover:text-blue-700"
                  to={"/signup"}
                >
                  Sign up
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
