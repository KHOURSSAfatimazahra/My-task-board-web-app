import React from "react";
import { useDispatch } from "react-redux";
import {
  logOutFailure,
  logOutStart,
  logOutSuccess,
} from "../../redux/user/userSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const handleLogoutBtn = async (req, res) => {
    try {
      dispatch(logOutStart());
      const res = await fetch("/api/logout");
      const data = res.json();
      if (data.success === false) {
        dispatch(logOutFailure(data.message));
        return;
      }
      dispatch(logOutSuccess());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="w-full h-[80px] bg-black flex justify-center items-center">
      <button
        className="border border-white text-white p-3 rounded-md"
        onClick={handleLogoutBtn}
      >
        Logout
      </button>
    </nav>
  );
}
