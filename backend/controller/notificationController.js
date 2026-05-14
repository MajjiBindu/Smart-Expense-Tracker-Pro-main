import Notification from "../db/notificationModel.js";
import { success, error } from "../utils/handler.js";

export const updateSettings = async (req, res) => {
  try {
    const {
      userId,
      reminderEnabled,
      reminderType,
      reminderTime,
      monthlyReportEnabled,
    } = req.body;

    const settings = await Notification.findOneAndUpdate(
      { userId },
      {
        reminderEnabled,
        reminderType,
        reminderTime,
        monthlyReportEnabled,
      },
      { upsert: true, new: true },
    );

    return res.send(success(200, settings));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
