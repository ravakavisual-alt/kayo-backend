const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  roomType: String,
  date: String,
  amount: Number,
  paymentStatus: { type: String, default: "pending" }
});

module.exports = mongoose.model("Booking", BookingSchema);
