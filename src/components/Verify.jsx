import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Make sure the path matches your project structure

const Verify = () => {
  const backendURL = import.meta.env.VITE_API_URL;
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get email from localStorage
  const email = localStorage.getItem("email");

  const handleVerification = async () => {
    if (!verificationCode) {
      setError("Please enter the verification code");
      return;
    }

    setLoading(true);
    try {
      const verificationData = {
        email,
        verification_code: verificationCode,
      };

      const response = await api.post(
        `${backendURL}/auth/verify/`,
        verificationData
      );

      if (response.data.success) {
        localStorage.setItem("verified", "true");
        navigate("/loginsignup");
      } else {
        setError("Invalid verification code");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-base-200 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Verification Code</h2>
          <p>We have sent a verification code to your email address</p>
          <input
            type="text"
            placeholder="Enter the 6 digit code"
            value={verificationCode}
            maxLength={6}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="input w-full mt-6"
          />
          {error && <p className="text-error text-sm mt-2">{error}</p>}
          <button
            onClick={handleVerification}
            className="btn btn-primary w-full mt-6"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Verify;
