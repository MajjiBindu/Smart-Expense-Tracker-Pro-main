const router = require("express").Router();
const {
  createGoal,
  getGoals,
  updateSavings
} = require("../controller/goalController");

router.post("/create", createGoal);
router.post("/all", getGoals);
router.post("/save", updateSavings);

module.exports = router;