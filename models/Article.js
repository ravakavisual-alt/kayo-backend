const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  preview: { type: String, required: true },
  link: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Article", articleSchema);
