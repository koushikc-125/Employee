import "../app.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function UserProfile() {

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

          <p
            className="cursor-pointer"
            onClick={() => navigate("/user-dashboard")}
          >
            🏠 Dashboard
          </p>

          <p className="cursor-pointer"
            onClick={() => navigate("/user-profile")}
          >
            👤 Profile </p>

          <p  className="cursor-pointer"
            onClick={() => navigate("/checkinout")}
            > 🕒 Attendance </p>

          <p className="cursor-pointer"
            onClick={() => navigate("/leave")}
          >
            📝 Leave
          </p>
          <p className="cursor-pointer"
            onClick={() => navigate("/notify")}
          >
            🔔 Notifications
          </p>

          <p className="cursor-pointer"
            onClick={() => navigate("/settings")}
          >
            ⚙️ Settings
          </p>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold text-green-100 mb-8">
          User Profile
        </h1>

        <div className="bg-[#162E1A] border border-green-900 rounded-2xl p-8 w-[500px]">

          {/* Profile Image */}
          <div className="flex justify-center mb-6">

            <img
              src={
                user.image ||
                "https://i.pravatar.cc/150"
              }
              alt="User"
              className="w-32 h-32 rounded-full border-4 border-green-900"
            />

          </div>

          {/* User Details */}
          <div className="space-y-4 text-lg">

            <p>
              <strong>Name:</strong> {user.name || "Not Available"}
            </p>

            <p>
              <strong>Email:</strong> {user.email || "Not Available"}
            </p>

            <p>
              <strong>Employee ID:</strong> {user.employeeId || "Not Available"}
            </p>

            <p>
              <strong>Department:</strong> {user.department || "Not Available"}
            </p>

            <p>
              <strong>Phone:</strong> {user.phone || "Not Available"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}