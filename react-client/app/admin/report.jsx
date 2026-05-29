import React, { useEffect, useState } from "react";
import axios from "axios";

function ReportsPage() {
  const [reports, setReports] = useState([]);

  // Fetch Reports Data
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/reports"
      );

      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
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
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow:
            "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: 0,
            color: "#1e293b",
          }}
        >
          Attendance Reports
        </h1>

        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "#64748b",
          }}
        >
          Employee Attendance & Work Reports
        </p>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {/* Total Employees */}
        <div style={cardStyle}>
          <h3>Total Employees</h3>

          <h1>{reports.length}</h1>
        </div>

        {/* Present Employees */}
        <div style={cardStyle}>
          <h3>Present Today</h3>

          <h1>
            {
              reports.filter(
                (item) =>
                  item.status === "Present"
              ).length
            }
          </h1>
        </div>

        {/* Late Employees */}
        <div style={cardStyle}>
          <h3>Late Check In</h3>

          <h1>
            {
              reports.filter(
                (item) =>
                  item.status ===
                  "Late Check In"
              ).length
            }
          </h1>
        </div>

        {/* Checked Out */}
        <div style={cardStyle}>
          <h3>Checked Out</h3>

          <h1>
            {
              reports.filter(
                (item) =>
                  item.status ===
                  "Checked Out"
              ).length
            }
          </h1>
        </div>
      </div>

      {/* Reports Table */}
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow:
            "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={tableHead}>
                Employee ID
              </th>

              <th style={tableHead}>
                Employee Name
              </th>

              <th style={tableHead}>
                Check In
              </th>

              <th style={tableHead}>
                Check Out
              </th>

              <th style={tableHead}>
                Working Hours
              </th>

              <th style={tableHead}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report, index) => (
              <tr
                key={index}
                style={{
                  borderBottom:
                   "1px solid #ddd",
                }}
              >
                <td style={tableData}>
                  {report.employeeId}
                </td>

                <td style={tableData}>
                  {report.employeeName}
                </td>

                <td style={tableData}>
                  {report.checkInTime}
                </td>

                <td style={tableData}>
                  {report.checkOutTime}
                </td>

                <td style={tableData}>
                  {report.workingHours}
                </td>

                <td
                  style={{
                    ...tableData,
                    fontWeight: "bold",
                    color:
                      report.status ===
                      "Present"
                        ? "green"
                        : report.status ===
                          "Late Check In"
                        ? "orange"
                        : "red",
                  }}
                >
                  {report.status}
                </td>
              </tr>
            ))}

            {reports.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#64748b",
                  }}
                >
                  No Reports Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Styles
const cardStyle = {
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow:
    "0px 4px 12px rgba(0,0,0,0.1)",
};

const tableHead = {
  padding: "16px",
};

const tableData = {
  padding: "14px",
  textAlign: "center",
};

export default ReportsPage;