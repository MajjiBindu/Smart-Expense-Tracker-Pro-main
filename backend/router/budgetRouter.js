const router = require("express").Router();
const {
  createBudget,
  getBudgets,
  getBudgetStatus,
} = require("../controller/budgetController");

router.post("/create", createBudget);
router.post("/all", getBudgets);
router.post("/status", getBudgetStatus);

module.exports = router;