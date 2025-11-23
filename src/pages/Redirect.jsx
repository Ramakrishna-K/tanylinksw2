
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RedirectPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      try {
        const res = await axios.get(`https://tinylink-h97x.onrender.com/api/${code}`);
        // Redirect to the long URL
        window.location.href = res.request.responseURL;
      } catch (err) {
        // Fallback to dashboard if code not found
        navigate("/");
      }
    };
    redirect();
  }, [code, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Redirecting...</h1>
        <p className="text-gray-600 mb-4">
          Please wait while we redirect you to your destination.
        </p>
        <div className="loader border-t-4 border-b-4 border-blue-600 w-12 h-12 rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-gray-500 mt-4">
          If you are not redirected automatically,{" "}
          <a
            href={`http://localhost:5000/${code}`}
            className="text-blue-600 hover:underline"
          >
            click here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
