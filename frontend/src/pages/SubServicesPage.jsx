import React from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";


const SubServicesPage = () => {
  const issues = ["Sub Issue 1", "Sub Issue 2", "Sub Issue 3"];

  return (
    <div className="w-[430px] h-[932px] bg-white shadow-lg mx-auto border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-white">
        <FaBars className="text-2xl text-gray-800" />
        <div className="flex items-center gap-2">

          <h1 className="text-lg font-bold text-gray-800">Smart Gov</h1>
        </div>
        <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
          <option>English</option>
          <option>සිංහල</option>
          <option>தமிழ்</option>
        </select>
      </div>

      {/* Title */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-300 bg-gray-50">
        <FaUser className="text-xl text-gray-700" />
        <p className="text-gray-800 font-medium text-sm">
          Birth certificate new/issue
        </p>
      </div>

      {/* Issues List */}
      <div className="flex flex-col gap-3 px-4 py-5">
        {issues.map((issue, idx) => (
          <button
            key={idx}
            className="flex justify-between items-center bg-orange-300 hover:bg-orange-400 transition rounded-xl px-4 py-3 shadow-md"
          >
            <span className="font-semibold text-gray-900">{issue}</span>
            <IoIosArrowForward className="text-lg text-gray-800" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubServicesPage;
