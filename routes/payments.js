const express = require("express");
const midtransClient = require("midtrans-client");
const router = express.Router();

// Create Midtrans Snap API instance
const snap = new midtransClient.Snap({
  isProduction: false, // false untuk sandbox
  serverKey: process.env.MIDTRANS_SERVER_KEY
});

// POST /api/payments/create-transaction
router.post("/create-transaction", async (req, res) => {
  const { name, email, amount, bookingId } = req.body;

  try {
    const parameter = {
      transaction_details: {
        order_id: "ORDER-" + Date.now(), // ID unik
        gross_amount: amount
      },
      customer_details: {
        first_name: name,
        email: email
      },
      item_details: [
        {
          id: bookingId,
          price: amount,
          quantity: 1,
          name: "Booking Homestay"
        }
      ]
    };

    const transaction = await snap.createTransaction(parameter);

    res.json({ token: transaction.token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
