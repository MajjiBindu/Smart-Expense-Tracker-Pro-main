import express from "express";
import {
  createGoal,
  getGoals,
  updateSavings,
} from "../controller/goalController.js";

const router = express.Router();

router.post("/create", createGoal);
router.post("/all", getGoals);
router.post("/save", updateSavings);

export default router;
