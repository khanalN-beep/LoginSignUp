import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSignUp } from "../redux/authSlice"; // Adjust the path as needed
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";

const LoginSignup = () => {
  const isSignUp = useSelector((state) => state.auth.isSignUp);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between min-h-screen font-serif bg-white overflow-hidden">
      {/* White Container (Sign In / Sign Up) */}
      <div
        className={`transition-all duration-500 ease-in-out w-1/2 text-center p-16 flex flex-col justify-center transform ${
          isSignUp ? "translate-x-full" : "translate-x-0"
        }`}
      >
        {isSignUp ? (
          <>
            <h1 className="font-black text-5xl text-black mt-10">Sign Up</h1>
            <div className="flex justify-center mt-10 gap-4">
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer">
                <FaFacebook size={20} className="text-gray-600" />
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer">
                <FaGoogle size={20} className="text-gray-600" />
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer">
                <FaLinkedin size={20} className="text-gray-600" />
              </button>
            </div>
            <p className="text-gray-500 mt-4">
              or use your email for registration
            </p>
            <div className="mt-6 w-full max-w-md mx-auto">
              <div className="mt-4 space-x-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-55 h-14 bg-gray-100 rounded px-4 text-gray-700"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-55 h-14 bg-gray-100 rounded px-4 text-gray-700"
                />
              </div>
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-14 bg-gray-100 rounded px-4 text-gray-700"
                />
              </div>
              <div className="mt-4">
                <input
                  type="password"
                  placeholder="Set Password"
                  className="w-full h-14 bg-gray-100 rounded px-4 text-gray-700"
                />
              </div>
              <div className="mt-4">
                <input
                  type="password"
                  placeholder="Repeat Password"
                  className="w-full h-14 bg-gray-100 rounded px-4 text-gray-700"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-10 rounded-full uppercase cursor-pointer">
                Sign Up
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-black text-5xl text-black mt-10">Sign In</h1>
            <div className="flex justify-center mt-10 gap-4">
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer">
                <FaFacebook size={20} className="text-gray-600" />
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer">
                <FaGoogle size={20} className="text-gray-600" />
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer">
                <FaLinkedin size={20} className="text-gray-600" />
              </button>
            </div>
            <p className="text-gray-500 mt-4">or use your account</p>
            <div className="mt-6 w-full max-w-md mx-auto">
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-14 bg-gray-100 rounded px-4 text-gray-700"
                />
              </div>
              <div className="mt-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full h-14 bg-gray-100 rounded px-4 text-gray-700"
                />
              </div>
            </div>
            <p className="text-gray-500 hover:underline mt-4 cursor-pointer">
              Forgot your password?
            </p>
            <div className="mt-8 flex justify-center">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-10 rounded-full uppercase cursor-pointer">
                Sign In
              </button>
            </div>
          </>
        )}
      </div>

      {/* Red Container (Welcome Message) */}
      <div
        className={`transition-all duration-500 ease-in-out w-1/2 bg-red-500 flex items-center justify-center text-center text-white transform ${
          isSignUp ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="text-center px-8">
          <h1 className="text-5xl font-bold">
            {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
          </h1>
          <p className="font-normal mt-8 text-lg">
            {isSignUp
              ? "To keep connected with us, please login with your personal info"
              : "Enter your personal details and start your journey with us"}
          </p>
          <button
            onClick={() => dispatch(toggleSignUp())}
            className="border-2 border-white hover:bg-white hover:text-red-500 text-white font-bold py-3 px-10 rounded-full mt-16 uppercase cursor-pointer"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
