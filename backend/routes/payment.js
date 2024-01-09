import express from "express";
import { checkout,getKey,paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/paymentverification", paymentVerification);
router.get("/getkey",getKey);
export default router;
