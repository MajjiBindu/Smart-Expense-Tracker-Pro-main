import express from "express";
import { updateSettings } from "../controller/notificationController.js";

const router = express.Router();

router.post("/settings", updateSettings);

export default router;
