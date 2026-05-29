import "../app.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function UserDashboard() {

  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <div className="w-64 p-6 bg-[#162E1A] border-r border-green-900">

        <h1 className="text-3xl font-bold text-green-100 mb-10">
          Employee App
        </h1>

        <div className="flex flex-col gap-6 text-lg">

          {/* Dashboard */}
          <p
            className="cursor-pointer hover:text-green-300"
            onClick={() => navigate("/user-dashboard")}
          >
            🏠 Dashboard
          </p>

          {/* Profile */}
          <p
            className="cursor-pointer hover:text-green-300"
            onClick={() => navigate("/user-profile")}
          >
            👤 Profile
          </p>

          {/* Attendance */}
          <p
            className="cursor-pointer hover:text-green-300"
            onClick={() => navigate("/user-attendance")}
          >
            🕒 Attendance
          </p>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold text-green-100 mb-8">
          Welcome, {user.name || "Employee"}
        </h1>

        {/* User Details */}
        <div className="bg-[#162E1A] border border-green-900 rounded-2xl p-8 w-[500px]">

          <h2 className="text-2xl font-bold text-green-100 mb-6">
            Employee Details
          </h2>

          <div className="space-y-4 text-lg">

            <p>
              <strong>Name:</strong> {user.name || "Not Available"}
            </p>

            <p>
              <strong>Email:</strong> {user.email || "Not Available"}
            </p>

            <p>
              <strong>Department:</strong> {user.department || "Not Available"}
            </p>

            <p>
              <strong>Employee ID:</strong> {user.employeeId || "Not Available"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}