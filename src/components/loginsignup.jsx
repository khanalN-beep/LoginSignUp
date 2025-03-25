import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSignUp } from "../redux/authSlice";
import {
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../ap i";
const backendURL = import.meta.env.VITE_API_URL;

const LoginSignup = () => {
  const isSignUp = useSelector((state) => state.auth.isSignUp);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("Url", backendURL);

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setrepeat_password] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState("false");

  useEffect(() => {
    setfirst_name("");
    setlast_name("");
    setEmail("");
    setPassword("");
    setrepeat_password("");
    setError("");
  }, [isSignUp]);

  localStorage.setItem("email", email);

  const handleSignUp = async () => {
    if (password !== repeat_password) {
      setError("Passwords do not match!");
      return;
    }
    const userData = {
      first_name,
      last_name,
      email,
      password,
      repeat_password,
    };
    setLoading(true);
    try {
      const response = await api.post(`${backendURL}/auth/register/`, userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/verify");
    } catch (error) {
      setError(
        error.response?.data?.error || "Sign up failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    const userData = { email, password };
    setLoading(true);
    try {
      const response = await api.post(`/auth/login/`, userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.error || "Sign in failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-base-200 rounded-box shadow-xl flex overflow-hidden">
        {/* Form Section */}
        <div
          className={`w-1/2 p-10 transition-all duration-500 ease-in-out ${
            isSignUp ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <h1 className="text-3xl font-semibold text-base-content text-center mb-8">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>

          {/* Social Buttons */}
          <div className="flex justify-center gap-3 mb-6">
            {[FaFacebook, FaGoogle, FaLinkedin].map((Icon, index) => (
              <button
                key={index}
                className="btn btn-circle btn-neutral btn-sm hover:bg-neutral-focus"
              >
                <Icon size={20} className="text-neutral-content" />
              </button>
            ))}
          </div>
          <p className="text-center text-base-content text-sm mb-6 opacity-70">
            or use your {isSignUp ? "email for registration" : "account"}
          </p>

          {/* Form Inputs */}
          <div className="space-y-4">
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={first_name}
                  onChange={(e) => setfirst_name(e.target.value)}
                  className="input w-1/2  bg-base-100 text-base-content placeholder-base-content placeholder-opacity-50 focus:border-primary border border-base-300"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={last_name}
                  onChange={(e) => setlast_name(e.target.value)}
                  className="input w-1/2 bg-base-100 text-base-content placeholder-base-content placeholder-opacity-50 focus:border-primary border border-base-300"
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full bg-base-100 text-base-content placeholder-base-content placeholder-opacity-50 focus:border-primary border border-base-300"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full bg-base-100 text-base-content placeholder-base-content placeholder-opacity-50 focus:border-primary border border-base-300 pr-10"
              />
              <button
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-base-content hover:text-primary"
              >
                {showPassword ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaRegEyeSlash size={18} />
                )}
              </button>
            </div>
            {isSignUp && (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat Password"
                  value={repeat_password}
                  onChange={(e) => setrepeat_password(e.target.value)}
                  className="input w-full bg-base-100 text-base-content placeholder-base-content placeholder-opacity-50 focus:border-primary border border-base-300 pr-10"
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content cursor-pointer hover:text-primary"
                >
                  {showPassword ? (
                    <FaRegEye size={18} />
                  ) : (
                    <FaRegEyeSlash size={18} />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-error text-center text-sm mt-4">{error}</p>
          )}

          {/* Forgot Password */}
          {!isSignUp && (
            <p className="text-center mt-4">
              <a href="#" className="text-info hover:text-info-content text-sm">
                Forgot password?
              </a>
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={isSignUp ? handleSignUp : handleSignIn}
            disabled={loading}
            className="btn btn-primary w-full mt-8 text-primary-content hover:bg-primary-focus disabled:bg-primary disabled:opacity-50"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </div>

        {/* Welcome Section */}
        <div
          className={`w-1/2 bg-accent p-10 flex items-center justify-center text-accent-content transition-all duration-500 ease-in-out ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-4">
              {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
            </h1>
            <p className="text-accent-content text-base mb-6 opacity-90">
              {isSignUp
                ? "Already have an account? Sign in to continue!"
                : "New here? Create an account to get started!"}
            </p>
            <button
              onClick={() => dispatch(toggleSignUp())}
              className="btn btn-outline btn-accent-content hover:bg-accent-content hover:text-accent"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
