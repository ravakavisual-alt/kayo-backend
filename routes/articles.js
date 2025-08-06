const express = require("express");
const multer = require("multer");
const path = require("path");
const Article = require("../models/Article");

const router = express.Router();

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// CREATE article
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, preview, link } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newArticle = new Article({
      title,
      preview,
      link,
      image: imagePath
    });

    await newArticle.save();
    res.json(newArticle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
