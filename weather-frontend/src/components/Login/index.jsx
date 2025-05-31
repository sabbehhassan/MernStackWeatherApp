import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { WiDaySunny } from "react-icons/wi";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/welcome");
      }
    } catch (error) {
      alert(
        error?.response?.data?.message || "An error occurred while logging in."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 px-4 py-12">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl transform transition-all hover:scale-[1.02]">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-full shadow-lg">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center text-5xl text-yellow-500">
            <WiDaySunny />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-white mt-12">
          Welcome Back
        </h2>
        <p className="text-center text-indigo-100 mb-6">Log in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-indigo-100 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-indigo-100 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition transform duration-300"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-indigo-100">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-white font-medium hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
