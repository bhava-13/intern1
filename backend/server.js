const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

let appointments = [];
let appointmentId = 1;

let users = [];

let currentUserEmail = null;

//profile
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  currentUserEmail = email;
  //email chnge motherfu kerrrrrrrrrr
  return res.json({
    message: "Login successful",
    user: { name: user.name, email: user.email },
  });
});

app.get("/api/user/profile", (req, res) => {
  if (!currentUserEmail) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const user = users.find((u) => u.email === currentUserEmail);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
  });
});

app.put("/api/user/profile", (req, res) => {
  if (!currentUserEmail) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const user = users.find((u) => u.email === currentUserEmail);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email, phone } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone || "";

  res.json({
    message: "Profile updated",
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);

    console.log("Users:", users);

    return res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//book appointment
app.post("/api/appointments/book", (req, res) => {
  const { doctorId, doctorName, date, slot } = req.body;
  if (!date || !slot) {
    return res.status(400).json({ message: "Date and slot are required" });
  }

  const newAppointment = {
    id: appointmentId++,
    doctorId,
    doctorName: doctorName || "General",
    date,
    slot,
  };

  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

app.get("/api/appointments/user", (req, res) => {
  res.json(appointments);
});

app.put("/api/appointments/cancel/:id", (req, res) => {
  const id = parseInt(req.params.id);
  appointments = appointments.filter((a) => a.id !== id);
  res.json({ message: "Appointment cancelled" });
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
