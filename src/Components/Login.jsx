import React, { useState } from "react";
import MojoAuth from "mojoauth-web-sdk";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    const mojoauth = new MojoAuth("cd21c872-66d1-4b9f-8535-94c3dc4b72f3");
    try {
      const response = await mojoauth.signIn({ email });
      setOtpSent(true);
      setTransactionId(response.transactionID);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    const mojoauth = new MojoAuth("cd21c872-66d1-4b9f-8535-94c3dc4b72f3");
    try {
      const response = await mojoauth.verifyOTP({
        transactionID: transactionId,
        otp,
      });
      if (response.authenticated) {
        navigate("/home");
      } else {
        alert("Invalid OTP, please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Email OTP Verification</h2>
      {!otpSent ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
          />
          <br />
          <button onClick={handleSendOTP} style={{ padding: "10px 20px" }}>
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
          />
          <br />
          <button onClick={handleVerifyOTP} style={{ padding: "10px 20px" }}>
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
