import "../app.css"
import React, { useState } from "react";
function AdminLeaveManagement() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      employee: "Rahul Sharma",
      leaveType: "Sick Leave",
      from: "2026-05-20",
      to: "2026-05-22",
      reason: "Fever",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Priya Das",
      leaveType: "Casual Leave",
      from: "2026-05-25",
      to: "2026-05-26",
      reason: "Family Function",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );

    setApplications(updatedApplications);
  };

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "var(--default)",
        }}
      >
        Admin Leave Management
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr>
            <th style={tableHead}>ID</th>
            <th style={tableHead}>Employee</th>
            <th style={tableHead}>Leave Type</th>
            <th style={tableHead}>From</th>
            <th style={tableHead}>To</th>
            <th style={tableHead}>Reason</th>
            <th style={tableHead}>Status</th>
            <th style={tableHead}>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td style={tableData}>{app.id}</td>
              <td style={tableData}>{app.employee}</td>
              <td style={tableData}>{app.leaveType}</td>
              <td style={tableData}>{app.from}</td>
              <td style={tableData}>{app.to}</td>
              <td style={tableData}>{app.reason}</td>

              <td
                style={{
                  ...tableData,
                  color:
                    app.status === "Approved"
                      ? "green"
                      : app.status === "Rejected"
                      ? "red"
                      : "orange",
                  fontWeight: "bold",
                }}
              >
                {app.status}
              </td>

              <td style={tableData}>
                <button
                  onClick={() => updateStatus(app.id, "Approved")}
                  style={{
                    background: "green",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    marginRight: "5px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(app.id, "Rejected")}
                  style={{
                    background: "orange",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHead = {
  padding: "14px",
};

const tableData = {
  padding: "12px",
  textAlign: "center",
 
};

export default AdminLeaveManagement;