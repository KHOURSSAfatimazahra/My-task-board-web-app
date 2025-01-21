import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const CustomTypewriter = () => {
  const [typeEffect] = useTypewriter({
    words: [
      "Plan Today, Win Tomorrow.",
      "Simplify. Prioritize. Succeed. ",
      "Focus. Organize. Achieve.",
      "Turn To-Do into Done.",
      "Plan Smart, Work Smarter.",
    ],
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 80,
  });
  return (
    <div className="bg-black md:h-full h-[40%] w-full md:w-2/4 lg:w-3/5 flex justify-center items-center flex-col">
      <h1 className="text-white text-2xl md:text-lg lg:text-4xl font-semibold mt-5">
        <span>{typeEffect}</span> <Cursor />
      </h1>
    </div>
  );
};

export default CustomTypewriter;
