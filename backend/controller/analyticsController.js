const expenseModel = require("../db/expenseModel");
const { success, error } = require("../utils/handler");
const mongoose = require("mongoose");

// 1. category breakdown
const getCategoryBreakdown = async (req, res) => {
  try {
    const { userId, type = "expense" } = req.body;

    const data = await expenseModel.aggregate([
      {
        $match: {
          userId: userId,
          type
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    return res.send(success(200, data));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

// 2. monthly trend
const getMonthlyTrend = async (req, res) => {
  try {
    const { userId } = req.body;

    const data = await expenseModel.aggregate([
      {
        $match: {
          userId: userId
        }
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    return res.send(success(200, data));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

// 3. overview cards
const getOverview = async (req, res) => {
  try {
    const { userId } = req.body;

    const expenses = await expenseModel.aggregate([
      { $match: { userId, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const income = await expenseModel.aggregate([
      { $match: { userId, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalExpense = expenses[0]?.total || 0;
    const totalIncome = income[0]?.total || 0;

    return res.send(
      success(200, {
        totalIncome,
        totalExpense,
        savings: totalIncome - totalExpense
      })
    );
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getSpendingInsights = async (req, res) => {
  try {
    const { userId } = req.body;

    const currentMonth = new Date().getMonth() + 1;
    const prevMonth = currentMonth - 1;

    const current = await expenseModel.aggregate([
      {
        $match: {
          userId,
          type: "expense",
          $expr: { $eq: [{ $month: "$date" }, currentMonth] }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const previous = await expenseModel.aggregate([
      {
        $match: {
          userId,
          type: "expense",
          $expr: { $eq: [{ $month: "$date" }, prevMonth] }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const currentTotal = current[0]?.total || 0;
    const previousTotal = previous[0]?.total || 0;

    let percentageIncrease = 0;
    if (previousTotal > 0) {
      percentageIncrease = (
        ((currentTotal - previousTotal) / previousTotal) *
        100
      ).toFixed(2);
    }

    let message = "Spending is stable";

    if (percentageIncrease > 0) {
      message = `Your spending increased by ${percentageIncrease}% compared to last month`;
    }

    return res.send(
      success(200, {
        currentTotal,
        previousTotal,
        percentageIncrease,
        message
      })
    );
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const predictNextMonthExpense = async (req, res) => {
  try {
    const { userId } = req.body;

    const last3Months = await expenseModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: "expense"
        }
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 3 }
    ]);

    const avg =
      last3Months.reduce((sum, item) => sum + item.total, 0) /
      (last3Months.length || 1);

    return res.send(
      success(200, {
        last3Months,
        predictedNextMonthExpense: Math.round(avg)
      })
    );
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  getCategoryBreakdown,
  getMonthlyTrend,
  getOverview,
  getSpendingInsights,
  predictNextMonthExpense
};