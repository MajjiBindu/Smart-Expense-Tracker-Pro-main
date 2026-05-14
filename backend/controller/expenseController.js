import mongoose from "mongoose";
import expenseModel from "../db/expenseModel.js";
import sendEmailWithAttachment from "../utils/emailSend.js";
import { error, success } from "../utils/handler.js";

export const createExpense = async (req, res) => {
  try {
    let { amount, category, date, userId, title, type, paymentMethod, note } =
      req.body;

    const finalUserId = userId;

    if (!amount || !category || !date || !finalUserId) {
      return res.send(error(400, "Required fields missing"));
    }

    const newExpense = await expenseModel.create({
      amount,
      category,
      date,
      userId: finalUserId,
      title: title || category,
      type: type || "expense",
      paymentMethod: paymentMethod || "UPI",
      note: note || "",
    });

    return res.send(success(201, newExpense));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.body;

    await expenseModel.findByIdAndDelete(expenseId);

    return res.send(success(200, "Expense deleted"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.send(error(400, "UserId is required"));
    }

    const expenses = await expenseModel.find({ userId }).sort({ date: -1 });

    return res.send(success(200, expenses));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

export const getSummary = async (req, res) => {
  try {
    const { userId } = req.body;

    const expenses = await expenseModel.find({ userId });

    let totalIncome = 0;
    let totalExpense = 0;

    expenses.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount;
      } else {
        totalExpense += item.amount;
      }
    });

    return res.send(
      success(200, {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        totalTransactions: expenses.length,
      }),
    );
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

export const getRecentExpenses = async (req, res) => {
  try {
    const { userId } = req.body;

    const recent = await expenseModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.send(success(200, recent));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

/*const getCategoryExpense = async (req,res)=>{
    try {
        
    } catch (e) {
        return res.send(error(401,e.message))
    }
}*/

export const getCategoryExpense = async (req, res) => {
  try {
    const { userId } = req.body;

    const categoryData = await expenseModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    return res.send(success(200, categoryData));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

export const getMonthlyExpenses = async (req, res) => {
  try {
    const { userId } = req.body;

    const monthlyData = await expenseModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: "expense",
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return res.send(success(200, monthlyData));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

export const emailSender = (req, res) => {
  try {
    const { recipient, body } = req.body;
    sendEmailWithAttachment(recipient, body);
    return res.send(success(201, "Email Sent"));
  } catch (err) {
    return res.send(error(401, "Email Is Wrong"));
  }
};
