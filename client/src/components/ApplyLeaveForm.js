import React, { useState } from "react";
import API from "../services/api";

function ApplyLeaveForm({ refresh }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const submitLeave = async (e) => {
    e.preventDefault();
    try {
      await API.post("/leaves", { startDate, endDate, reason });
      setStartDate("");
      setEndDate("");
      setReason("");
      refresh();
    } catch (error) {
      if (error.response?.data) {
        if (
          error.response.data.errors &&
          error.response.data.errors.length > 0
        ) {
          alert(error.response.data.errors[0].msg);
        } else {
          alert("Failed to submit leave request");
        }
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={submitLeave} className="row g-2 mt-3">
      <div className="col">
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          className="form-control"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="col">
        <button className="btn btn-success w-100">Apply</button>
      </div>
    </form>
  );
}

export default ApplyLeaveForm;
