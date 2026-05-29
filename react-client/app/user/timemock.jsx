import "../app.css"
import React, { useState, useEffect } from "react";

function AttendanceSystem() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock Punch
  const handlePunch = () => {
    const employee = {
      id: attendance.length + 1,
      name: "Employee " + (attendance.length + 1),
      punchTime: currentTime.toLocaleTimeString(),
      status:
        currentTime.getHours() < 10 ? "On Time" : "Late Attendance",
    };

    setAttendance([...attendance, employee]);
  };

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
    },
    clock: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      marginBottom: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
  };

  return (
    <div style={styles.container} >
      <h1>Biometric Attendance System</h1>

      <h2>Current Time</h2>
      <div style={styles.clock}>
        {currentTime.toLocaleTimeString()}
      </div>

      <button style={styles.button} onClick={handlePunch}>
        Scan Fingerprint
      </button>

      <h2>Attendance Records</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Punch Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.punchTime}</td>
              <td>{emp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default AttendanceSystem;