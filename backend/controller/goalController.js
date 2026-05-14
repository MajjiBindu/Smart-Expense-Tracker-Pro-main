import goalModel from "../db/goalModel.js";
import { success, error } from "../utils/handler.js";

export const createGoal = async (req, res) => {
  try {
    const goal = await goalModel.create(req.body);
    return res.send(success(201, goal));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

export const getGoals = async (req, res) => {
  try {
    const { userId } = req.body;
    const goals = await goalModel.find({ userId });
    return res.send(success(200, goals));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

export const updateSavings = async (req, res) => {
  try {
    const { goalId, amount } = req.body;

    const goal = await goalModel.findById(goalId);
    goal.savedAmount += amount;
    await goal.save();

    return res.send(success(200, goal));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
