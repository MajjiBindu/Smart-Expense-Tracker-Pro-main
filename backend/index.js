import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDb from "../backend/db/db.js";
import userRouter from "./router/userRouter.js";
import expenseRouter from "./router/expenseRouter.js";
import budgetRouter from "./router/budgetRouter.js";
import goalRouter from "./router/goalRouter.js";
import analyticsRouter from "./router/analyticsRouter.js";
import notificationRouter from "./router/notificationRouter.js";
import {
  smartReminderScheduler,
  monthlyAnalysisScheduler,
  recurringTransactionScheduler,
} from "./utils/scheduler.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/auth", userRouter);
app.use("/analytics", analyticsRouter);
app.use("/budgets", budgetRouter);
app.use("/expenses", expenseRouter);
app.use("/goals", goalRouter);
app.use("/notifications", notificationRouter);

connectDb();

smartReminderScheduler();
monthlyAnalysisScheduler();
recurringTransactionScheduler();

const port = process.env.PORT_NO || 4000;

app.listen(port, () => {
  console.log(`Server on :- ${port}`);
});
