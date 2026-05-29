import "../app.css"
import React, { useState, useEffect } from "react";

function BiometricAttendance() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Attendance State
  const [attendance, setAttendance] = useState([]);

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock Employee Data
  const employees = [
    { id: 101, name: "Rahul Sharma" },
    { id: 102, name: "Priya Das" },
    { id: 103, name: "Amit Kumar" },
    { id: 104, name: "Sneha Roy" },
    { id: 105, name: "Arjun Singh" },
  ];

  // Fingerprint Check In
  const handleCheckIn = () => {
    const randomEmployee =
      employees[Math.floor(Math.random() * employees.length)];

    // Prevent double check-in
    const alreadyCheckedIn = attendance.find(
      (emp) =>
        emp.id === randomEmployee.id &&
        emp.checkOutTime === "-"
    );

    if (alreadyCheckedIn) {
      alert("Employee already checked in!");
      return;
    }

    const newAttendance = {
      id: randomEmployee.id,
      name: randomEmployee.name,
      checkInTime: currentTime.toLocaleTimeString(),
      checkOutTime: "-",
      status:
        currentTime.getHours() < 10
          ? "On Time"
          : "Late Check In",
    };

    setAttendance([...attendance, newAttendance]);
  };

  // Fingerprint Check Out
  const handleCheckOut = () => {
    const activeEmployees = attendance.filter(
      (emp) => emp.checkOutTime === "-"
    );

    if (activeEmployees.length === 0) {
      alert("No employee available for check out!");
      return;
    }

    const randomEmployee =
      activeEmployees[
        Math.floor(Math.random() * activeEmployees.length)
      ];

    const updatedAttendance = attendance.map((emp) =>
      emp.id === randomEmployee.id &&
      emp.checkOutTime === "-"
        ? {
            ...emp,
            checkOutTime: currentTime.toLocaleTimeString(),
            status: "Checked Out",
          }
        : emp
    );

    setAttendance(updatedAttendance);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            textAlign: "center",
            color: "#1e293b",
          }}
        >
          Employee Biometric Attendance System
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginTop: "10px",
          }}
        >
          Fingerprint Based Employee Attendance Monitoring
        </p>
      </div>

      {/* Live Clock */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            color: "#08580a",
            margin: 0,
          }}
        >
          {currentTime.toLocaleTimeString()}
        </h2>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        {/* Check In */}
        <button
          onClick={handleCheckIn}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "14px 28px",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(22,163,74,0.3)",
          }}
        >
          Fingerprint Check In
        </button>

        {/* Check Out */}
        <button
          onClick={handleCheckOut}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "14px 28px",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(220,38,38,0.3)",
          }}
        >
          Fingerprint Check Out
        </button>
      </div>

      {/* Attendance Table */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#2563eb",
                color: "white",
              }}
            >
              <th style={tableHead}>Employee ID</th>
              <th style={tableHead}>Employee Name</th>
              <th style={tableHead}>Check In Time</th>
              <th style={tableHead}>Check Out Time</th>
              <th style={tableHead}>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance.length > 0 ? (
              attendance.map((emp, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <td style={tableData}>{emp.id}</td>

                  <td style={tableData}>{emp.name}</td>

                  <td style={tableData}>
                    {emp.checkInTime}
                  </td>

                  <td style={tableData}>
                    {emp.checkOutTime}
                  </td>

                  <td
                    style={{
                      ...tableData,
                      color:
                        emp.status === "On Time"
                          ? "green"
                          : emp.status === "Late Check In"
                          ? "orange"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {emp.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Table Header Style
const tableHead = {
  padding: "16px",
  textAlign: "center",
  fontSize: "15px",
};

// Table Data Style
const tableData = {
  padding: "14px",
  textAlign: "center",
};

export default BiometricAttendance; 