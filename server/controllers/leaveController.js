const Leave = require("../models/Leave");
const AuditLog = require("../models/AuditLog");

exports.applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        message: "End date cannot be before start date",
      });
    }

    const totalDays =
      (new Date(endDate) - new Date(startDate)) /
        (1000 * 60 * 60 * 24) +
      1;

    const leave = await Leave.create({
      employee: req.user.id,
      startDate,
      endDate,
      reason,
      totalDays,
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.user.id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employee", "email");
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = status;
    await leave.save();

    await AuditLog.create({
      admin: req.user.id,
      leave: leave._id,
      action: `Leave ${status}`,
    });

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
