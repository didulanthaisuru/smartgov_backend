// SmartGovSignupPage.jsx

import React from 'react';
// You'll need to install react-icons: npm install react-icons
import { HiOutlineDocumentCheck } from 'react-icons/hi2';

const SignUp = () => {
    return (
        // Wrapper to simulate the iPhone 14 Pro Max screen (430x932)
        // You can remove this outer div for a real-world application
        <div
          style={{ width: '430px', height: '932px' }}
          className="bg-gray-50 font-sans mx-auto mt-8 border-4 border-gray-800 rounded-[50px] overflow-hidden shadow-2xl"
        >
            <div className="w-full h-full overflow-y-auto">
                <div className="flex flex-col items-center justify-start pt-16 pb-8 px-8 min-h-full">

                    {/* Header Section */}
                    <header className="flex flex-col items-center mb-10 text-center">
                        <div className="p-4 bg-[#fde8c9] rounded-2xl mb-3 inline-block">
                            <HiOutlineDocumentCheck className="w-10 h-10 text-[#8B4513]" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">Smart Gov</h2>
                        <h1 className="font-serif text-8xl text-black mt-4 leading-none">Sign Up</h1>
                        <p className="text-xl text-gray-600 mt-2">Create Free Account</p>
                    </header>

                    {/* Signup Form Card */}
                    <main className="bg-white w-full rounded-3xl shadow-lg p-8">
                        <div className="text-left mb-8">
                            <h3 className="text-3xl font-bold text-gray-900">Personal Info</h3>
                            <p className="text-gray-500 mt-2 text-[15px] leading-snug">
                                Sign up to manage appointments, documents, and more.
                            </p>
                        </div>

                        <form noValidate>
                            {/* First and Last Name */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        placeholder="| First Name"
                                        className="w-full px-4 py-3 bg-[#fde8c9] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d5a97a]"
                                    />
                                </div>
                                <div className="self-end">
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2 sr-only">Last Name</label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        placeholder="| Last Name"
                                        className="w-full px-4 py-3 bg-[#fde8c9] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d5a97a]"
                                    />
                                </div>
                            </div>

                            {/* NIC Number */}
                            <div className="mb-4">
                                <label htmlFor="nic-number" className="block text-sm font-medium text-gray-700 mb-2">NIC Number</label>
                                <input
                                    type="text"
                                    id="nic-number"
                                    placeholder="| Your NIC Number"
                                    className="w-full px-4 py-3 bg-[#fde8c9] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d5a97a]"
                                />
                            </div>

                            {/* Mobile Number */}
                            <div className="mb-4">
                                <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                                <input
                                    type="tel"
                                    id="mobile-number"
                                    placeholder="| Your Mobile Number"
                                    className="w-full px-4 py-3 bg-[#fde8c9] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d5a97a]"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="| Your Email"
                                    className="w-full px-4 py-3 bg-[#fde8c9] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d5a97a]"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    defaultValue="********************"
                                    className="w-full px-4 py-3 bg-[#fde8c9] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d5a97a]"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-6">
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    defaultValue="********************"
                                    className="w-full px-4 py-3 bg-[#fde8c9] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d5a97a]"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-[#8B4513] hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A0522D] transition-colors"
                            >
                                Save & Continue
                            </button>
                        </form>

                        {/* Back to Login Link */}
                        <p className="mt-6 text-center text-sm">
                            <a href="#" className="font-medium text-gray-600 hover:text-gray-800">
                                Back to Login
                            </a>
                        </p>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SignUp;