const {
  createExpense,
  deleteExpense,
  getCategoryExpense,
  getAllExpenses,
  getSummary,
  getRecentExpenses,
  getMonthlyExpenses,
  emailSender,
} = require("../controller/expenseController");

const router = require('express').Router();

router.post('/addExpense',createExpense)
router.post('/deleteExpense',deleteExpense)
router.get('/categoryExpense',getCategoryExpense)
router.post('/allExpenses',getAllExpenses)
router.post('/sendEmail',emailSender);
router.post("/summary", getSummary);
router.post("/recent", getRecentExpenses);
router.post("/monthly", getMonthlyExpenses);

module.exports = router;