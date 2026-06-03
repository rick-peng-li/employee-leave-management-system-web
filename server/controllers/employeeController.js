const User = require("../models/User");

exports.regiterEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "plz fill employee data" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user Alredy exist" });
    }

    const employee = await User.create({
        name,
        email,
        password,
        role: "employee",
    })

    res.status(200).json({message:"Employee Registed Success", employee});
  } catch {
    res.status(500).json({message:"Server Error"});
  }
};
