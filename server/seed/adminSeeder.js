const User = require("../models/User");
const connectDB = require("../config/db");
require("dotenv").config();

connectDB();

(async () => {
    try {
        await User.create({
            name: "Admin",
            email: "admin@gmail.com",
            password: "admin123",
            role: "admin"
        });

        console.log("Admin user created");
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin user:", error);
        process.exit(1);
    }
})();