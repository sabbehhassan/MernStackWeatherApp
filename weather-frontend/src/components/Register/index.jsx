import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      navigate("/auth/login");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-emerald-600 via-green-500 to-blue-500 p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg p-8 md:p-10 border border-white/30 transition-all duration-500">
        <h2 className="text-4xl font-bold text-white text-center mb-6 tracking-tight">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center font-medium shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="text-white text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-white/80 text-black placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-white text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-white/80 text-black placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-white text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-white/80 text-black placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-white text-sm font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="********"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-white/80 text-black placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold tracking-wide text-white transition duration-300 ease-in-out shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 hover:brightness-110"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-semibold text-white hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
