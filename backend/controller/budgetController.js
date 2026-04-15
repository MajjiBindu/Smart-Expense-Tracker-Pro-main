const budgetModel = require("../db/budgetModel");
const expenseModel = require("../db/expenseModel");
const { success, error } = require("../utils/handler");

const createBudget = async (req, res) => {
  try {
    const budget = await budgetModel.create(req.body);
    return res.send(success(201, budget));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const getBudgets = async (req, res) => {
  try {
    const { userId } = req.body;
    const budgets = await budgetModel.find({ userId });
    return res.send(success(200, budgets));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const getBudgetStatus = async (req, res) => {
  try {
    const { userId, category } = req.body;

    const budget = await budgetModel.findOne({ userId, category });

    const spent = await expenseModel.aggregate([
      {
        $match: {
          userId: new require("mongoose").Types.ObjectId(userId),
          category,
          type: "expense",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalSpent = spent[0]?.total || 0;

    return res.send(
      success(200, {
        limit: budget?.limit || 0,
        spent: totalSpent,
        remaining: (budget?.limit || 0) - totalSpent,
      })
    );
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

module.exports = {
  createBudget,
  getBudgets,
  getBudgetStatus,
};