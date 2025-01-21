import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetError } from "../../../redux/user/userSlice";
import CustomTypewriter from "../utils/customTypewriter";

export default function ForgotPassword() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const { loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      console.log(email);

      setError("Please enter a valid email");
      return;
    }
    try {
      const res = await fetch("/api/forgot-password", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate("/reset-password");
    } catch (error) {
      setError("An error occurred");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!email) {
  //     setError = "Please enter a valid email";
  //     return;
  //   }
  //   try {
  //     const res = await fetch("/api/forgot-password", {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (data.success == false) {
  //       setError = data.message;
  //       return;
  //     }

  //     navigate("/reset-password");
  //   } catch (error) {
  //     setError = "error occurred ";
  //   }
  // };
  //   useEffect(() => {
  //     dispatch(resetError());
  //   }, [dispatch]);
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#c2c2c2] ">
      <div className="w-full h-full md:w-[90%] md:h-[95%] bg-white flex items-center justify-center md:flex-row flex-col ">
        <CustomTypewriter />

        <div className=" h-full md:w-2/4 lg:w-2/5 w-full flex justify-center items-center  ">
          <div className="h-full w-full flex items-center justify-center flex-col p-5 ">
            <h2 className="md:text-2xl text-3xl font-semibold text-center">
              Recover your password
            </h2>
            <p className="text-gray-500 font-normal text-base md:text-sm mb-3 ">
              No worries !
            </p>

            <form
              className="p-3 flex flex-col gap-3 relative"
              onSubmit={handleSubmit}
            >
              <div className="">
                <label className="md:text-sm  text-lg font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  //   onChange={handleInputChange}
                  placeholder="email address"
                  className="w-full px-4 py-2 border border-gray-300 md:placeholder:text-sm placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="w-full text-lg md:text-base bg-black hover:bg-white hover:text-black border-2 border-black text-white py-2  focus:outline-none mt-9"
              >
                Continue
              </button>
              <Link
                className="flex items-center justify-center text-lg md:text-base w-full py-2 border border-gray-300  hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition duration-200"
                to={"/signin"}
              >
                Sign In
              </Link>
              {error && (
                <p className="text-red-500 text-sm -bottom-3 absolute">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
