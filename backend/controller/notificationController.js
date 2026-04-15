const Notification = require("../db/notificationModel");
exports.updateSettings = async (req, res) => {
  try {
    const { userId, reminderEnabled, reminderType, reminderTime, monthlyReportEnabled } = req.body;

    const settings = await Notification.findOneAndUpdate(
      { userId },
      {
        reminderEnabled,
        reminderType,
        reminderTime,
        monthlyReportEnabled
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      status: "success",
      message: settings
    });

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};