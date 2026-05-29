import "../app.css"
import React, { useEffect, useState } from "react";
import axios from "axios";

function SettingsPage() {
  const [settings, setSettings] = useState({
    profile: {
      name: "",
      email: "",
      phone: "",
    },

    notifications: {
      emailNotifications: false,
      smsNotifications: false,
      attendanceAlerts: false,
    },

    theme: {
      darkMode: false,
    },

    security: {
      twoFactorAuth: false,
      loginAlerts: false,
    },
  });

  // Fetch Settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/settings"
      );

      setSettings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Change
  const handleChange = (section, field, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value,
      },
    });
  };

  // Save Settings
  const handleSave = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/settings",
        settings
      );

      alert("Settings Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: settings.theme.darkMode
          ? "#0f172a"
          : "#f4f7fc",

        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial",
        color: settings.theme.darkMode
          ? "white"
          : "black",
      }}
    >
      {/* Header */}
      <div style={cardStyle(settings)}>
        <h1
          style={{
            textAlign: "center",
            margin: 0,
          }}
        >
          Application Settings
        </h1>
      </div>

      {/* Profile Settings */}
      <div style={cardStyle(settings)}>
        <h2 style={headingStyle}>
          Profile Settings
        </h2>

        <div style={gridStyle}>
          <input
            type="text"
            placeholder="Name"
            value={settings.profile.name}
            onChange={(e) =>
              handleChange(
                "profile",
                "name",
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email"
            value={settings.profile.email}
            onChange={(e) =>
              handleChange(
                "profile",
                "email",
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Phone"
            value={settings.profile.phone}
            onChange={(e) =>
              handleChange(
                "profile",
                "phone",
                e.target.value
              )
            }
            style={inputStyle}
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div style={cardStyle(settings)}>
        <h2 style={headingStyle}>
          Notification Settings
        </h2>

        <div style={toggleRow}>
          <span>Email Notifications</span>

          <input
            type="checkbox"
            checked={
              settings.notifications
                .emailNotifications
            }
            onChange={(e) =>
              handleChange(
                "notifications",
                "emailNotifications",
                e.target.checked
              )
            }
          />
        </div>

        <div style={toggleRow}>
          <span>SMS Notifications</span>

          <input
            type="checkbox"
            checked={
              settings.notifications
                .smsNotifications
            }
            onChange={(e) =>
              handleChange(
                "notifications",
                "smsNotifications",
                e.target.checked
              )
            }
          />
        </div>

        <div style={toggleRow}>
          <span>Attendance Alerts</span>

          <input
            type="checkbox"
            checked={
              settings.notifications
                .attendanceAlerts
            }
            onChange={(e) =>
              handleChange(
                "notifications",
                "attendanceAlerts",
                e.target.checked
              )
            }
          />
        </div>
      </div>

      {/* Theme Settings */}
      <div style={cardStyle(settings)}>
        <h2 style={headingStyle}>
          Theme Settings
        </h2>

        <div style={toggleRow}>
          <span>Dark Mode</span>

          <input
            type="checkbox"
            checked={
              settings.theme.darkMode
            }
            onChange={(e) =>
              handleChange(
                "theme",
                "darkMode",
                e.target.checked
              )
            }
          />
        </div>
      </div>

      {/* Security Settings */}
      <div style={cardStyle(settings)}>
        <h2 style={headingStyle}>
          Security Settings
        </h2>

        <div style={toggleRow}>
          <span>
            Two Factor Authentication
          </span>

          <input
            type="checkbox"
            checked={
              settings.security
                .twoFactorAuth
            }
            onChange={(e) =>
              handleChange(
                "security",
                "twoFactorAuth",
                e.target.checked
              )
            }
          />
        </div>

        <div style={toggleRow}>
          <span>Login Alerts</span>

          <input
            type="checkbox"
            checked={
              settings.security
                .loginAlerts
            }
            onChange={(e) =>
              handleChange(
                "security",
                "loginAlerts",
                e.target.checked
              )
            }
          />
        </div>
      </div>

      {/* Backup & Restore */}
      <div style={cardStyle(settings)}>
        <h2 style={headingStyle}>
          Backup & Restore
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <button style={backupBtn}>
            Backup Data
          </button>

          <button style={restoreBtn}>
            Restore Data
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <button
          onClick={handleSave}
          style={saveBtn}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

// Styles
const cardStyle = (settings) => ({
  background: settings.theme.darkMode
    ? "#1e293b"
    : "white",

  padding: "25px",
  borderRadius: "12px",
  marginBottom: "25px",
  boxShadow:
    "0px 4px 12px rgba(0,0,0,0.1)",
});

const headingStyle = {
  color: "#2563eb",
  marginBottom: "20px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",

  gap: "15px",
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const toggleRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "15px",
  alignItems: "center",
};

const saveBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "14px 28px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const backupBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};

const restoreBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default SettingsPage;