import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import RegisterEmployee from "../components/RegisterEmployee";

function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    const res = await API.get("/leaves/all");
    setLeaves(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/leaves/${id}/status`, { status });
    fetchLeaves();
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (

<>
<Navbar />

    <div className="container mt-4">
      <h4>Admin Dashboard</h4>

      <RegisterEmployee />

      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Dates</th>
            <th>Total Days</th>
            <th>Resone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l._id}>
              <td>{l.employee?.email}</td>
              <td>{l.startDate.slice(0,10)} - {l.endDate.slice(0,10)}</td>
              <td>{l.totalDays}</td>
              <td>{l.reason}</td>
              <td>{l.status}</td>
              <td>
                <button className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(l._id, "Approved")}>
                  Approve
                </button>
                <button className="btn btn-danger btn-sm"
                  onClick={() => updateStatus(l._id, "Rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
}

export default AdminDashboard;
