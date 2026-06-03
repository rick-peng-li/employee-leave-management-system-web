const { body } = require("express-validator");

exports.leaveValidation = [
  body("startDate")
    .notEmpty()
    .withMessage("Start date is required"),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required"),

  body("reason")
    .notEmpty()
    .withMessage("Reason is required"),
];