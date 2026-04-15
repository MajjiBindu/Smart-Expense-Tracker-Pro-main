const express = require('express');
const cors = require('cors');
require("dotenv").config();
const connectDb = require('../backend/db/db');
const userRouter = require('./router/userRouter');
const expenseRouter = require('./router/expenseRouter');
const budgetRouter = require("./router/budgetRouter");
const goalRouter = require("./router/goalRouter");
const analyticsRouter = require("./router/analyticsRouter");
const notificationRouter = require("./router/notificationRouter");
const app = express();
const {
  smartReminderScheduler,
  monthlyAnalysisScheduler,
  recurringTransactionScheduler
} = require("./utils/scheduler");


app.use(cors());
app.use(express.json());
app.use('/auth',userRouter)
app.use('/analytics', analyticsRouter);
app.use('/budgets', budgetRouter);
app.use('/expenses',expenseRouter);
app.use("/goals", goalRouter);
app.use("/notifications", notificationRouter);
connectDb();

smartReminderScheduler();
monthlyAnalysisScheduler();
recurringTransactionScheduler();

const port = 4000 || process.env.PORT_NO ;
app.listen(port , ()=>{
        console.log(`Server on :- ${port}`);
})
