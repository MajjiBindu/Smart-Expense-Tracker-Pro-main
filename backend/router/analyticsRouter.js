import express from "express";
import {
  getCategoryBreakdown,
  getMonthlyTrend,
  getOverview,
  getSpendingInsights,
  predictNextMonthExpense,
} from "../controller/analyticsController.js";

const router = express.Router();

router.post("/category-breakdown", getCategoryBreakdown);
router.post("/monthly-trend", getMonthlyTrend);
router.post("/overview", getOverview);
router.post("/insights", getSpendingInsights);
router.post("/predict", predictNextMonthExpense);

export default router;
