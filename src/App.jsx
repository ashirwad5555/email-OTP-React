import React, { useState, useCallback } from "react";
import MojoAuth from "mojoauth-web-sdk";

function App() {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);

  const initiateEmailOTP = useCallback(() => {
    try {
      const mojoauth = new MojoAuth("cd21c872-66d1-4b9f-8535-94c3dc4b72f3", {
        language: "en",
        redirect_url: "https://ashirwad-katkamwar.vercel.app/",
        source: [{ type: "email", feature: "otp" }],
      });

      mojoauth
        .signIn()
        .then((response) => {
          console.log("Authentication successful:", response);
          setPayload(response);
          setError(null);
        })
        .catch((err) => {
          console.error("Error during email OTP login:", err);
          setError(err.message || "Authentication failed");
        });
    } catch (err) {
      console.error("Error initializing MojoAuth:", err);
      setError(err.message || "Failed to initialize authentication");
    }
  }, []); // Empty dependency array since we don't use any external values

  return (
    <div className="flex flex-col items-center p-4">
      <button
        onClick={initiateEmailOTP}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Login with Email OTP
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {payload && (
        <div className="w-full max-w-2xl">
          <h2 className="text-lg font-semibold mb-2">
            Authentication Response:
          </h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
