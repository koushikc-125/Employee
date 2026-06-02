import "../app.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "~/hook/useUser";

export default function AdminDashboard() {
  const user = useUser()
  const [admin, setAdmin] = useState<any>({});
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<any[]>([]);
  const [presentCount, setPresentCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);

  return (
<div className="min-h-screen flex">

  {/* Main Content */}
  <div className="flex-1 p-10">

    <h1 className="text-5xl font-bold text-[#eef7f6] mb-8">
      Welcome, {user?.name || "Admin"}
    </h1>

    {/* Admin Details */}
    <div className="bg-[#182422] border border-[#5f7f7a] rounded-2xl p-8 w-[500px]">

      <h2 className="text-2xl font-bold text-[#eef7f6] mb-6">
        Admin Details
      </h2>

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
          <strong className="text-[#eef7f6]">Department:</strong> {user?.designation || "jjkl"}
        </p>

      </div>

    </div>

    {/* Dashboard Cards */}
    <div className="mt-10 flex gap-6 flex-wrap">

      {/* Total Employees */}
      <div className="bg-[#182422] border border-[#5f7f7a] rounded-2xl p-6 w-60">

        <h3 className="text-[#92beb9]">Total Employees</h3>

        <h1 className="text-4xl font-bold text-[#eef7f6] mt-3">
          {employees.length}
        </h1>

      </div>

      {/* Present Today */}
      <div className="bg-[#182422] border border-[#5f7f7a] rounded-2xl p-6 w-60">

        <h3 className="text-[#92beb9]">Present Today</h3>

        <h1 className="text-4xl font-bold text-[#eef7f6] mt-3">
          {presentCount}
        </h1>

      </div>

      {/* Leave Requests */}
      <div className="bg-[#182422] border border-[#5f7f7a] rounded-2xl p-6 w-60">

        <h3 className="text-[#92beb9]">Pending Leaves</h3>

        <h1 className="text-4xl font-bold text-[#eef7f6] mt-3">
          {leaveCount}
        </h1>

      </div>

    </div>

  </div>

</div> 
)}