import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import "./app.css";

export default function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/log-in");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <section className="max-w-2xl w-full text-center fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-8 scale-in">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            E
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 fade-in-up">
          Welcome to
          <span className="block bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Employee Portal
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-slate-600 mb-8 fade-in-up" style={{ animationDelay: "0.1s" }}>
          Manage attendance, leaves, and track your workplace activities
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="text-4xl mb-3">🕒</div>
            <h3 className="font-semibold text-slate-900">Attendance</h3>
            <p className="text-sm text-slate-500 mt-2">Track check-ins and attendance records</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-semibold text-slate-900">Leave Management</h3>
            <p className="text-sm text-slate-500 mt-2">Request and manage your leaves easily</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-slate-900">Analytics</h3>
            <p className="text-sm text-slate-500 mt-2">View performance and statistics</p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="scale-in" style={{ animationDelay: "0.3s" }}>
          <p className="text-slate-600 mb-6">Ready to get started?</p>

          {/* Animated Arrow Button */}
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover-scale mx-auto mb-4 group"
            title="Click to go to login"
          >
            <svg
              className="w-8 h-8 bounce-arrow group-hover:bounce-arrow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {/* Text below arrow */}
          <p className="text-sm text-slate-500">
            Click the arrow or&nbsp;
            <Link to={"/log-in"}
              onClick={handleGetStarted}
              className="text-blue-600 hover:text-blue-700 font-semibold underline transition"
            >
              Click here
            </Link>
            &nbsp;to login
          </p>
        </div>

        {/* Bottom Info */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            💼 Professional Attendance Management System
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Version 1.0 | © 2024 All Rights Reserved
          </p>
        </div>
      </section>
    </main>
  );
}