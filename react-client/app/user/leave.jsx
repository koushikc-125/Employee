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
      minHeight: "100vh",
      background: "#101918",
    }}
  >
    <div
      style={{
        width: "450px",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
        background: "#182422",
        border: "1px solid #5f7f7a",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#eef7f6",
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

        <label style={{ color: "#92beb9" }}>From Date</label>

        <input
          type="date"
          name="fromDate"
          value={leaveData.fromDate}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={{ color: "#92beb9" }}>To Date</label>

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
            background: "#182422",
            color: "#eef7f6",
            border: "1px solid #5f7f7a",
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