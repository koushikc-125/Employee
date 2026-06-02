import "../app.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "~/hook/useUser";

export default function AdminProfile() {
  const user = useUser()
  const navigate = useNavigate();

  return (
  <div className="min-h-screen flex">

  {/* Main Content */}
  <div className="flex-1 p-10">

    <h1 className="text-5xl font-bold text-[#eef7f6] mb-8">
      Admin Profile
    </h1>

    <div className="bg-[#182422] border border-[#5f7f7a] rounded-2xl p-8 w-[500px]">

      {/* Profile Image */}
      <div className="flex justify-center mb-6">

        <img
          src={
            user?.image ||
            "https://i.pravatar.cc/150"
          }
          alt="Admin"
          className="w-32 h-32 rounded-full border-4 border-[#5f7f7a]"
        />

      </div>

      {/* Admin Details */}
      <div className="space-y-4 text-lg text-[#92beb9]">

        <p>
          <strong className="text-[#eef7f6]">Name:</strong> {user?.name || "Not Available"}
        </p>

        <p>
          <strong className="text-[#eef7f6]">Email:</strong> {user?.email || "Not Available"}
        </p>

        <p>
          <strong className="text-[#eef7f6]">Role:</strong> {user?.role || "Administrator"}
        </p>

        <p>
          <strong className="text-[#eef7f6]">Department:</strong> {user?.designation || "Management"}
        </p>

      </div>

    </div>

  </div>
</div>
)}