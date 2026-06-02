import "../app.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "~/hook/useUser";

export default function UserDashboard() {
  const user = useUser()
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold text-green-100 mb-8">
          Welcome, {user?.name || "Employee"}
        </h1>

        {/* User Details */}
        <div className="bg-[#182422] border border-[#5f7f7a] rounded-2xl p-8 w-[500px]">

  <h2 className="text-2xl font-bold text-[#eef7f6] mb-6">
    Employee Details
  </h2>

  <div className="space-y-4 text-lg text-[#92beb9]">

    <p>
      <strong className="text-[#eef7f6]">Name:</strong> {user?.name || "Not Available"}
    </p>

    <p>
      <strong className="text-[#eef7f6]">Email:</strong> {user?.email || "Not Available"}
    </p>

    <p>
      <strong className="text-[#eef7f6]">Department:</strong> {user?.designation || "Not Available"}
    </p>

    <p>
      <strong className="text-[#eef7f6]">Employee ID:</strong> {user?._id || "Not Available"}
    </p>

  </div>

</div>

      </div>

    </div>
  );
}