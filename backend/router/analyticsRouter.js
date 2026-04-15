const router = require("express").Router();

const {
  getCategoryBreakdown,
  getMonthlyTrend,
  getOverview,
  getSpendingInsights,
  predictNextMonthExpense
} = require("../controller/analyticsController");

router.post("/category-breakdown", getCategoryBreakdown);
router.post("/monthly-trend", getMonthlyTrend);
router.post("/overview", getOverview);
router.post("/insights", getSpendingInsights);
router.post("/predict", predictNextMonthExpense);

module.exports = router;