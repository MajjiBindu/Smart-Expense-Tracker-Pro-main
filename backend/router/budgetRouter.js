import express from "express";
import {
  createBudget,
  getBudgets,
  getBudgetStatus,
} from "../controller/budgetController.js";

const router = express.Router();

router.post("/create", createBudget);
router.post("/all", getBudgets);
router.post("/status", getBudgetStatus);

export default router;
