import "../app.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"; 

export default function AdminAttendance() {

  const [attendance, setAttendance] = useState<any[]>([]);
 const navigate = useNavigate();
  useEffect(() => {

    const storedAttendance = localStorage.getItem("attendance");

    if (storedAttendance) {
      setAttendance(JSON.parse(storedAttendance));
    }

  }, []);

return (
  <div className="min-h-screen flex">

    {/* Main Content */}
    <div className="flex-1 p-10">

      <h1 className="text-5xl font-bold text-[#eef7f6] mb-8">
        Employee Attendance
      </h1>

      {/* Attendance Table */}
      <div className="bg-[#182422] border border-[#5f7f7a] rounded-2xl p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b border-[#5f7f7a] text-left text-[#eef7f6]">

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
                className="border-b border-[#5f7f7a] text-[#92beb9]"
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

                <td className="text-[#eef7f6]">
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