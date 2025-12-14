const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const sweetRoutes = require("./routes/sweetRoutes");
const authRoutes = require("./routes/authRoutes");
dotenv.config();

const app = express();

// ✅ allow frontend to access backend
app.use(cors());

//middleware
app.use(express.json());

// connect to MongoDB
connectDB();


// routes
app.use("/api/sweets", sweetRoutes);

app.use("/api/auth", authRoutes);

// default route
app.get("/", (req, res) => {
  res.send("Sweet Shop API is running");
});

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
