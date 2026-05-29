import "../app.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function UserAttendance() {

  const [user, setUser] = useState<any>({});
  const [attendance, setAttendance] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedAttendance = localStorage.getItem("attendance");

    if (storedAttendance) {
      setAttendance(JSON.parse(storedAttendance));
    }

  }, []);

  const markAttendance = () => {

    const today = new Date().toLocaleDateString();

    const newAttendance = {
      name: user.name,
      employeeId: user.employeeId,
      date: today,
      status: "Present",
    };

    const updatedAttendance = [...attendance, newAttendance];

    setAttendance(updatedAttendance);

    localStorage.setItem(
      "attendance",
      JSON.stringify(updatedAttendance)
    );
  };

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

          <p
            className="cursor-pointer"
            onClick={() => navigate("/user-profile")}
          >
            👤 Profile
          </p>

          <p
            className="cursor-pointer"
            onClick={() => navigate("/user-attendance")}
          >
            🕒 Attendance
          </p>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold text-green-100 mb-8">
          Attendance
        </h1>

        <button
          onClick={markAttendance}
          className="bg-green-200 text-black px-6 py-3 rounded-xl font-semibold"
        >
          Mark Attendance
        </button>

        <div className="mt-10 bg-[#162E1A] border border-green-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-green-100 mb-6">
            Attendance History
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b border-green-900 text-left">

                <th className="pb-4">Date</th>

                <th className="pb-4">Status</th>

              </tr>

            </thead>

            <tbody>

              {attendance
                .filter(
                  (item) =>
                    item.employeeId === user.employeeId
                )
                .map((item, index) => (

                  <tr
                    key={index}
                    className="border-b border-green-900"
                  >

                    <td className="py-4">
                      {item.date}
                    </td>

                    <td className="text-green-300">
                      {item.status}
                    </td>

                  </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}