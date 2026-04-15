const router = require("express").Router();
const { updateSettings } = require("../controller/notificationController");

router.post("/settings", updateSettings);

module.exports = router;