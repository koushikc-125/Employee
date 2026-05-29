import "../app.css";
import { useEffect, useState } from "react";

export default function AdminAttendance() {

  const [attendance, setAttendance] = useState<any[]>([]);

  useEffect(() => {

    const storedAttendance = localStorage.getItem("attendance");

    if (storedAttendance) {
      setAttendance(JSON.parse(storedAttendance));
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

          <p>🕒 Attendance</p>

          <p>👥 Employees</p>

          <p>⚙ Settings</p>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold text-green-100 mb-8">
          Employee Attendance
        </h1>

        {/* Attendance Table */}
        <div className="bg-[#162E1A] border border-green-900 rounded-2xl p-6">

          <table className="w-full">

            <thead>

              <tr className="border-b border-green-900 text-left">

                <th className="pb-4">Employee Name</th>

                <th className="pb-4">Employee ID</th>

                <th className="pb-4">Date</th>

                <th className="pb-4">Status</th>

              </tr>

            </thead>

            <tbody>

              {attendance.map((item, index) => (

                <tr
                  key={index}
                  className="border-b border-green-900"
                >

                  <td className="py-4">
                    {item.name}
                  </td>

                  <td>
                    {item.employeeId}
                  </td>

                  <td>
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