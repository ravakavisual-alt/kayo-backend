require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Public folder untuk gambar upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
    origin: "http://localhost:3000", // React dev server
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  }));
// Koneksi MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/articles", require("./routes/articles"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/payments", require("./routes/payments"));

// Jalankan server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
