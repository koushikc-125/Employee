import "../app.css"
import React, { useState } from "react";

function EmployeeManagement() {
  // Employee State
  const [employees, setEmployees] = useState([
    {
      id: 101,
      name: "Rahul Sharma",
      department: "IT",
      designation: "Software Engineer",
    },
    {
      id: 102,
      name: "Priya Das",
      department: "HR",
      designation: "HR Manager",
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    department: "",
    designation: "",
  });

  // Edit State
  const [editIndex, setEditIndex] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Employee
  const handleAddEmployee = () => {
    if (
      !formData.id ||
      !formData.name ||
      !formData.department ||
      !formData.designation
    ) {
      alert("Please fill all fields");
      return;
    }

    setEmployees([...employees, formData]);

    setFormData({
      id: "",
      name: "",
      department: "",
      designation: "",
    });
  };

  // Delete Employee
  const handleDelete = (index) => {
    const updatedEmployees = employees.filter(
      (_, i) => i !== index
    );

    setEmployees(updatedEmployees);
  };

  // Edit Employee
  const handleEdit = (index) => {
    setFormData(employees[index]);
    setEditIndex(index);
  };

  // Update Employee
  const handleUpdate = () => {
    const updatedEmployees = [...employees];

    updatedEmployees[editIndex] = formData;

    setEmployees(updatedEmployees);

    setEditIndex(null);

    setFormData({
      id: "",
      name: "",
      department: "",
      designation: "",
    });
  };

  return (
    <div
      style={{
       // background: "#f4f7fc",
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
        <h2
          style={{
          textAlign: "center",
          color: "#b9c8e2",
          margin: 0,
          }}
        >
          Employee Management System
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#b7d2f9",
            marginTop: "10px",
          }}
        >
          <h3> Add, Edit, Delete and Manage Employees</h3>
        </p>
      </div>

      {/* Form Section */}
      <div
        style={{
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#2563eb",
          }}
        >
          {editIndex !== null
            ? "Update Employee"
            : "Add Employee"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "15px",
          }}
        >
          <input
            type="number"
            name="id"
            placeholder="Employee ID"
            value={formData.id}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Buttons */}
        <div
          style={{
            marginTop: "20px",
          }}
        >
          {editIndex !== null ? (
            <button
              onClick={handleUpdate}
              style={updateBtn}
            >
              Update Employee
            </button>
          ) : (
            <button
              onClick={handleAddEmployee}
              style={addBtn}
            >
              Add Employee
            </button>
          )}
        </div>
      </div>

      {/* Employee Table */}
      <div
        style={{
          
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
            
                color: "white",
              }}
            >
              <th style={tableHead}>Employee ID</th>
              <th style={tableHead}>Name</th>
              <th style={tableHead}>Department</th>
              <th style={tableHead}>Designation</th>
              <th style={tableHead}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td style={tableData}>{emp.id}</td>

                <td style={tableData}>{emp.name}</td>

                <td style={tableData}>{emp.department}</td>

                <td style={tableData}>{emp.designation}</td>

                <td style={tableData}>
                  <button
                    onClick={() => handleEdit(index)}
                    style={editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#64748b",
                  }}
                >
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Input Style
const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

// Table Styles
const tableHead = {
  padding: "16px",
};

const tableData = {
  padding: "14px",
  textAlign: "center",
};

// Button Styles
const addBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const updateBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const editBtn = {
  background: "#f59e0b",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "8px",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default EmployeeManagement;