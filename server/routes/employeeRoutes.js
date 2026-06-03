const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { regiterEmployee } = require("../controllers/employeeController");
const router = express.Router();

router.post(
    "/register",
    authMiddleware,
    roleMiddleware("admin"),
    regiterEmployee
)

module.exports = router;