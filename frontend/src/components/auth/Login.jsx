// SmartGovLogin.jsx

import React from 'react';
// You'll need to install react-icons: npm install react-icons
import { HiOutlineDocumentCheck } from 'react-icons/hi2';

const Login = () => {
    return (
        // Wrapper to simulate the iPhone 14 Pro Max screen (430x932)
        // You can remove the outer div and its styles for a real-world application
        <div 
          style={{ width: '430px', height: '932px' }} 
          className="bg-gray-50 font-sans mx-auto mt-8 border-4 border-gray-800 rounded-[50px] overflow-hidden shadow-2xl"
        >
            <div className="w-full h-full overflow-y-auto">
                <div className="flex flex-col items-center justify-start pt-16 pb-8 px-8 min-h-full">

                    {/* Header Section */}
                    <header className="flex flex-col items-center mb-10 text-center">
                        <div className="p-4 bg-[#fde8c9] rounded-2xl mb-3 inline-block">
                            {/* Icon matching the logo style */}
                            <HiOutlineDocumentCheck className="w-10 h-10 text-[#8B4513]" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">Smart Gov</h2>
                        <h1 className="font-serif text-7xl text-black mt-4 leading-none">Hello</h1>
                        <p className="text-xl text-gray-600 mt-2">Welcome back.</p>
                    </header>

                    {/* Login Form Card */}
                    <main className="bg-white w-full rounded-3xl shadow-lg p-8">
                        <div className="text-left mb-8">
                            <h3 className="text-3xl font-bold text-gray-900">Login Account</h3>
                            <p className="text-gray-500 mt-2 text-[15px] leading-snug">
                                Access your government services securely. Login to manage your appointments and records.
                            </p>
                        </div>

                        <form noValidate>
                            {/*  NIC Input */}
                            <div className="mb-5">
                                <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your NIC
                                </label>
                                <input
                                    type="text"
                                    id="nic"
                                    placeholder="| Your ID Number"
                                    className="w-full px-4 py-3 bg-[#fde8c9] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d5a97a]"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mb-5">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    defaultValue="********************" // Use defaultValue to show placeholder-like asterisks
                                    className="w-full px-4 py-3 bg-[#fde8c9] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d5a97a]"
                                />
                            </div>

                            {/* Save Password & Forgotten Password */}
                            <div className="flex items-center justify-between my-6">
                                <div className="flex items-center">
                                    <input
                                        id="save-password"
                                        name="save-password"
                                        type="checkbox"
                                        className="h-4 w-4 text-[#8B4513] focus:ring-[#A0522D] border-gray-300 rounded"
                                    />
                                    <label htmlFor="save-password" className="ml-2 block text-sm text-gray-800">
                                        Save Password
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-gray-600 hover:text-gray-800">
                                        Forgotten Password?
                                    </a>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-[#8B4513] hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A0522D] transition-colors"
                            >
                                Login Account
                            </button>
                        </form>

                        {/* Create New Account Link */}
                        <p className="mt-8 text-center text-sm">
                            <a href="#" className="font-medium text-gray-600 hover:text-gray-800">
                                Create New Account
                            </a>
                        </p>
                    </main>

                </div>
            </div>
        </div>
    );
};

export default Login;