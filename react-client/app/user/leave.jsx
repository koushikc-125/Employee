import "../app.css"
import React, { useState } from "react";

function LeaveApplication() {
  const [leaveData, setLeaveData] = useState({
    name: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setLeaveData({
      ...leaveData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Leave Application Submitted Successfully");

    setLeaveData({
      name: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        // background: "#eaf6ec",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "450px",
         // background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#17181a",
          }}
        >
          Leave Application Form
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={leaveData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="leaveType"
            value={leaveData.leaveType}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Emergency Leave">Emergency Leave</option>
          </select>

          <label>From Date</label>

          <input
            type="date"
            name="fromDate"
            value={leaveData.fromDate}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>To Date</label>

          <input
            type="date"
            name="toDate"
            value={leaveData.toDate}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="reason"
            placeholder="Reason for Leave"
            value={leaveData.reason}
            onChange={handleChange}
            required
            style={{
              ...inputStyle,
              height: "100px",
              resize: "none",
            }}
          ></textarea>

          <button
            type="submit"
            style={{
              background: "#0f5a3a",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  marginBottom: "15px",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "14px",
};

export default LeaveApplication;