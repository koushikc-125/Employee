import "../app.css";
import { useEffect, useState } from "react";

export default function AdminProfile() {

  const [admin, setAdmin] = useState<any>({});

  useEffect(() => {

    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }

  }, []);

  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <div className="w-64 p-6 bg-[#162E1A] border-r border-green-900">

        <h1 className="text-3xl font-bold text-green-100 mb-10">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-6 text-lg">

          <p>🏠 Dashboard</p>

          <p>👤 Profile</p>

          <p>👥 Employees</p>

          <p>🕒 Attendance</p>

          <p>⚙ Settings</p>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold text-green-100 mb-8">
          Admin Profile
        </h1>

        <div className="bg-[#162E1A] border border-green-900 rounded-2xl p-8 w-[500px]">

          {/* Profile Image */}
          <div className="flex justify-center mb-6">

            <img
              src={
                admin.image ||
                "https://i.pravatar.cc/150"
              }
              alt="Admin"
              className="w-32 h-32 rounded-full border-4 border-green-900"
            />

          </div>

          {/* Admin Details */}
          <div className="space-y-4 text-lg">

            <p>
              <strong>Name:</strong> {admin.name || "Not Available"}
            </p>

            <p>
              <strong>Email:</strong> {admin.email || "Not Available"}
            </p>

            <p>
              <strong>Role:</strong> {admin.role || "Administrator"}
            </p>

            <p>
              <strong>Department:</strong> {admin.department || "Management"}
            </p>

            <p>
              <strong>Phone:</strong> {admin.phone || "Not Available"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}