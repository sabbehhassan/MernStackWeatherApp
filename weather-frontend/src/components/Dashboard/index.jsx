import React from "react";
import { useNavigate } from "react-router-dom";  // <-- add this line
import Cloud from "./cloud";
import Rain from "./rain";
import Lightning from "./Lightning";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth/login");
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-blue-400 to-blue-700 overflow-hidden flex flex-col items-center justify-end pb-20">
      {/* Sun */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-yellow-400 rounded-full opacity-40 filter blur-2xl z-10 animate-pulse"></div>
      <div className="absolute top-24 left-24 w-72 h-72 bg-yellow-300 rounded-full opacity-70 z-10"></div>

      {/* Primary Clouds */}
      <Cloud size={280} top="30%" left="10%" anim="cloud-move-1" />
      <Cloud size={320} top="35%" left="40%" anim="cloud-move-2" />
      <Cloud size={300} top="32%" left="70%" anim="cloud-move-3" />

      {/* Extra Random Clouds */}
      <Cloud size={240} top="10%" left="5%" anim="cloud-move-4" />
      <Cloud size={260} top="60%" left="80%" anim="cloud-move-5" />
      <Cloud size={220} top="75%" left="20%" anim="cloud-move-6" />

      {/* Rain */}
      <Rain />

      {/* Lightning SVG Bolt */}
      <Lightning />

      {/* Lightning Flash (background) */}
      <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none lightning-flash"></div>

      {/* Get Started Button */}
      <div className="flex items-center justify-center">
        <button
          onClick={handleGetStarted}
          className="px-8 py-4 bg-white text-blue-900 font-bold rounded-lg shadow-lg hover:bg-blue-100 transition"
        >
          Get Started
        </button>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes cloud-move-1 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, -5px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes cloud-move-2 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-10px, 8px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes cloud-move-3 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(15px, -10px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes cloud-move-4 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(5px, -8px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes cloud-move-5 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-12px, 6px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes cloud-move-6 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(8px, -4px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes rain-fall {
          0% { transform: translateY(-20px); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes flash {
          0%, 100% { opacity: 0; }
          5% { opacity: 0.6; }
          6% { opacity: 0; }
          30% { opacity: 0; }
          32% { opacity: 0.4; }
          33% { opacity: 0; }
        }
        .lightning-flash {
          background: white;
          opacity: 0;
          animation: flash 7s infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
