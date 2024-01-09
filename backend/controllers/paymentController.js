import { instance } from "../index.js";
import dotenv from "dotenv";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";

dotenv.config();

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: "INR",
      // receipt: "order_rcptid_11"
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(Buffer.from(body))
      .digest("hex");

      const isAuthentic = expectedSignature === razorpay_signature;
      
      console.log(
        "\nisAuthentic : ",
        isAuthentic,
        "\nexpectedSignature : ",
        expectedSignature,
        "\nrazorpaySignature : ",
        razorpay_signature
      );

    if (isAuthentic) {
      // Database operation comes here
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `https://travel-world-drab.vercel.app//thank-you?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
        error: "Invalid Signature",
      });
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const getKey = (req, res) => {
  try {
    res.status(200).json({
      key: process.env.RAZORPAY_API_KEY,
    });
  } catch (error) {
    console.error("Error getting Razorpay key:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
