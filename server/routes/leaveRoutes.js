const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { leaveValidation } = require("../validators/leaveValidator");
const { validationResult } = require("express-validator");

const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveController");

//validate empty all request
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

//employe access
router.post(
  "/",
  authMiddleware,
  roleMiddleware("employee"),
  leaveValidation,
  validate,
  applyLeave
);

//employe access
router.get(
  "/my-leaves",
  authMiddleware,
  roleMiddleware("employee"),
  getMyLeaves
);

//admin access
router.get(
  "/all",
  authMiddleware,
  roleMiddleware("admin"),
  getAllLeaves
);

//admin access
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateLeaveStatus
);

module.exports = router;
