import React, { useEffect, useState } from "react";
import API from "../services/api";
import ApplyLeaveForm from "../components/ApplyLeaveForm";
import Navbar from "../components/Navbar";

function EmployeeDashboard() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leaves/my-leaves");
      setLeaves(res.data);
    } catch {
      alert("No Leave Found");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h4>Employee Dashboard</h4>

        <ApplyLeaveForm refresh={fetchLeaves} />

        <table className="table mt-4">
          <thead>
            <tr>
              <th>Start</th>
              <th>End</th>
              <th>Total Days</th>
              <th>Resone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.startDate.slice(0, 10)}</td>
                <td>{leave.endDate.slice(0, 10)}</td>
                <td>{leave.totalDays}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployeeDashboard;
