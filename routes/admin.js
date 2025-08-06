const express = require("express");
const router = express.Router();

// Login sederhana (cek username/password di .env)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ success: true, message: "Login berhasil" });
  }
  res.status(401).json({ success: false, message: "Username/password salah" });
});

module.exports = router;
