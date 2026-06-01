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

      {/* Sidebar */}
      <div className="w-64 p-6 bg-[#162E1A] border-r border-green-900">

        <h1 className="text-3xl font-bold text-green-100 mb-10">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-6 text-lg">

          <p className="hover:bg-green-800 cursor-pointer"
            onClick={() => navigate("/admin-dashboard")}
          > 🏠 Dashboard
          </p>

          <p className="hover:bg-green-800 cursor-pointer"
            onClick={() => navigate("/admin-profile")}
          > 👤 Profile
          </p>

          <p className="hover:bg-green-800 cursor-pointer"
            onClick={() => navigate("/admin-attendance")}
          > 🕒 Attendance
          </p>

          <p className="hover:bg-green-800 cursor-pointer"
            onClick={() => navigate("/admin-leaveint")}
          > 📝 Leave Requests
          </p>

          <p className="hover:bg-green-800 cursor-pointer"
            onClick={() => navigate("/admin-empmanage")}
          > 👤 Employee Management
          </p>

          <p className="hover:bg-green-800 cursor-pointer"
            onClick={() => navigate("/admin-report")}
          > 📊 Reports
          </p>

          <p className="hover:bg-green-800 cursor-pointer"
            onClick={() => navigate("/settings")}
          > ⚙ Settings
          </p>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold text-green-100 mb-8">
          Welcome, {user?.name || "Admin"}
        </h1>

        {/* Admin Details */}
        <div className="bg-[#162E1A] border border-green-900 rounded-2xl p-8 w-[500px]">

          <h2 className="text-2xl font-bold text-green-100 mb-6">
            Admin Details
          </h2>

          <div className="space-y-4 text-lg">

            <p>
              <strong>Name:</strong> {user?.name || "Not Available"}
            </p>

            <p>
              <strong>Email:</strong> {user?.email || "Not Available"}
            </p>

            <p>
              <strong>Role:</strong> {user?.role || "Administrator"}
            </p>

            <p>
              <strong>Department:</strong> {user?.department || "Management"}
            </p>

          </div>

        </div>

        {/* Dashboard Cards */}
        <div className="mt-10 flex gap-6 flex-wrap">

          {/* Total Employees */}
          <div className="bg-[#162E1A] border border-green-900 rounded-2xl p-6 w-60">

            <h3>Total Employees</h3>

            <h1 className="text-4xl font-bold text-green-100 mt-3">
              {employees.length}
            </h1>

          </div>

          {/* Present Today */}
          <div className="bg-[#162E1A] border border-green-900 rounded-2xl p-6 w-60">

            <h3>Present Today</h3>

            <h1 className="text-4xl font-bold text-green-100 mt-3">
              {presentCount}
            </h1>

          </div>

          {/* Leave Requests */}
          <div className="bg-[#162E1A] border border-green-900 rounded-2xl p-6 w-60">

            <h3>Pending Leaves</h3>

            <h1 className="text-4xl font-bold text-green-100 mt-3">
              {leaveCount}
            </h1>

          </div>

        </div>

      </div>

    </div>
  );
}