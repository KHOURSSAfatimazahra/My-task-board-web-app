import React, { useEffect, useState } from "react";
import "./style.css";
import { BiSolidPencil } from "react-icons/bi";
import Logo from "../../assets/svg/logo";
import TimeTrack from "../../assets/svg/timeTrack";
import { FcAlarmClock } from "react-icons/fc";
import DoneRoundDuotone from "../../assets/svg/doneRoundDuotone";
import CloseRingDuotone from "../../assets/svg/closeRingDuotone";
import AddRound from "../../assets/svg/addRound";
import CofeeSvg from "../../assets/svg/cofeeSvg";
import { useDispatch } from "react-redux";
import {
  logOutFailure,
  logOutStart,
  logOutSuccess,
} from "../../redux/user/userSlice";
import dayjs from "dayjs";

export default function Home() {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm:ss"));
  const [currentDate, setCurrentDate] = useState(
    dayjs().format("dddd D MMMM YYYY")
  );

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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-[#F8FAFC] w-full h-full flex justify-center items-center relative">
      <button
        className="border-2 border-black text-black hover:border-white hover:text-white hover:bg-black px-3 py-2 rounded-md absolute top-1 right-1"
        onClick={handleLogoutBtn}
      >
        Logout
      </button>
      <div className="md:mt-2 mt-10">
        {/* Part 1 start */}
        <div className=" flex justify-center items-center flex-col gap-3">
          <div className="flex justify-center items-center flex-col">
            <h1 className=" text-5xl md:text-8xl font-light">{currentTime}</h1>
            <h2 className="text-2xl md:text-4xl">{currentDate}</h2>
          </div>
          <div className="w-full flex justify-center items-center flex-row gap-5 mt-10">
            <Logo width={50} height={50} fillColor="#E9A23B" />
            <h1 className=" font-medium text-5xl">My Task Board</h1>
            <BiSolidPencil className="text-2xl" />
          </div>
          <p className=" text-lg">Tasks to keep orgnised</p>
        </div>
        {/* Part 1 end  */}

        {/* PART 2 START */}
        <div className=" mt-6 overflow-auto w-[1500px] h-[600px] ">
          {/* TITRE */}
          <div className="flex gap-3 justify-around">
            <h2 className="font-semibold">TASKS TO DO </h2>
            <h2 className="font-semibold">TASKS IN PROGRESS </h2>
            <h2 className="font-semibold">TASKS COMPLED </h2>
            <h2 className="font-semibold">TASKS WONT DO </h2>
          </div>
          {/* TITRE */}
          <div className="flex gap-3 mt-3 ">
            {/* tasks  */}
            {/* task1 start  */}
            <div className="flex flex-col gap-3">
              <div className=" h-[70px] w-96 rounded-md bg-[#F5E8D5] flex items-center p-3 gap-3">
                <div className="w-full h-full flex items-center justify-start gap-3">
                  <div className="bg-[#E9A23B] p-2 rounded-md ">
                    <AddRound />
                  </div>
                  <h1 className="font-semibold text-lg">Add new task</h1>
                </div>
              </div>
              <div className=" h-[90px] w-96 rounded-md bg-[#E3E8EF] flex items-center flex-col p-3 ">
                <div className="w-full h-full flex items-center justify-start gap-3">
                  <div className="bg-[#F8FAFC] p-4 rounded-md "></div>
                  <h1 className="font-semibold text-lg">Task in Progress</h1>
                </div>
                <p className="">Work on a challenge to learn TypeScript</p>
              </div>
            </div>
            {/* task1 end  */}
            {/* task2 start  */}
            <div className="flex flex-col gap-3 ">
              <div className=" h-[70px] w-96 rounded-md bg-[#F5D565] flex items-center p-3 gap-3">
                <div className="w-full h-full flex items-center justify-start gap-3">
                  <div className="bg-[#F8FAFC] p-2 rounded-md ">
                    <FcAlarmClock />
                  </div>
                  <h1 className="font-semibold text-lg">Task in Progress</h1>
                </div>
                <div className="bg-[#E9A23B] w-fit h-fit p-2 rounded-md ">
                  <TimeTrack />
                </div>
              </div>
            </div>
            {/* task 2 end  */}
            {/* tesk 3 START */}
            <div className="flex flex-col gap-3 ">
              {" "}
              <div className=" h-[70px] w-96 rounded-md bg-[#A0ECB1] flex items-center p-3 gap-3">
                <div className="w-full h-full flex items-center justify-start gap-3">
                  <div className="bg-[#F8FAFC] p-4 rounded-md "></div>
                  <h1 className="font-semibold text-lg">Task Completed</h1>
                </div>
                <div className="bg-[#32D657] w-fit h-fit p-2 rounded-md ">
                  {" "}
                  <DoneRoundDuotone />
                </div>
              </div>
            </div>
            {/* task 3 end  */}
            {/* tesk 4 START */}
            <div className="flex flex-col gap-3 ">
              <div className=" h-[70px] w-96 rounded-md bg-[#F7D4D3] flex items-center p-3 gap-3">
                <div className="w-full h-full flex items-center justify-start gap-3">
                  <div className="bg-[#F8FAFC] p-2 rounded-md ">
                    <CofeeSvg />
                  </div>
                  <h1 className="font-semibold text-lg">Task Won't Do</h1>
                </div>
                <div className="bg-[#DD524C] p-2 rounded-md ">
                  {" "}
                  <CloseRingDuotone />{" "}
                </div>
              </div>
            </div>
            {/* task 4 end  */}

            {/* tasks  */}
          </div>
        </div>
        {/* PART 2 END */}
      </div>
    </div>
  );
}
