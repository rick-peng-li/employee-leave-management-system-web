const User = require("../models/User");
const connectDB = require("../config/db");
require("dotenv").config();

connectDB();

(async () => {
    try {
        await User.create({
            name: "Employee3",
            email: "employee3@gmail.com",
            password: "employee3123",
            role: "employee"
        });

        console.log("Employee user created");
        process.exit(0);
    } catch (error) {
        console.error("Error creating Employee user:", error);
        process.exit(1);
    }
})();