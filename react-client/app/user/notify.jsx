import "../app.css"
import React, { useState } from "react";

function NotificationsPage() {
  // Notification Data
  const [notifications, setNotifications] = useState([
    {
     id: 1,
      title: "Leave Request Approved",
      message:
        "Your leave application has been approved by Admin.",
      type: "success",
      time: "10 mins ago",
    },
    {
      id: 2,
      title: "Late Attendance Alert",
      message:
        "You checked in after office timing today.",
      type: "warning",
      time: "30 mins ago",
    },
    {
      id: 3,
      title: "New Holiday Announcement",
      message:
        "Company holiday declared on 15th August.",
      type: "info",
      time: "1 hour ago",
    },
    {
      id: 4,
      title: "Attendance Marked",
      message:
        "Your biometric attendance has been recorded successfully.",
      type: "success",
      time: "2 hours ago",
    },
  ]);

  // Delete Notification
  const handleDelete = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );

    setNotifications(updatedNotifications);
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
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#77a8ed",
            margin: 0,
          }}
        >
          Notifications Center
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#77a8ed",
            marginTop: "10px",
          }}
        >
          Employee Alerts & System Notifications
        </p>
      </div>

      {/* Notifications List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow:
                "0px 4px 10px rgba(0,0,0,0.08)",
              borderLeft: `6px solid ${
                notification.type === "success"
                  ? "#16a34a"
                  : notification.type === "warning"
                  ? "#f59e0b"
                  : "#2563eb"
              }`,
            }}
          >
            {/* Top Section */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#d4dce9",
                }}
              >
                {notification.title}
              </h3>

              <span
                style={{
                  color: "#e5ecf6",
                  fontSize: "14px",
                }}
              >
                {notification.time}
              </span>
            </div>

            {/* Message */}
            <p
              style={{
                color: "#e5ecf6",
                marginTop: "10px",
                marginBottom: "15px",
              }}
            >
              {notification.message}
            </p>

            {/* Buttons */}
            <div>
              <button
                style={viewBtn}
              >
                View
              </button>

              <button
                onClick={() =>
                  handleDelete(notification.id)
                }
                style={deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* No Notifications */}
        {notifications.length === 0 && (
          <div
            style={{
              //background: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              color: "#e5ecf6",
              boxShadow:
                "0px 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            No Notifications Available
          </div>
        )}
      </div>
    </div>
  );
}

// Button Styles
const viewBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "10px",
  fontWeight: "bold",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default NotificationsPage;