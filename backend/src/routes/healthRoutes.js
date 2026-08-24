const express = require("express");

const router = express.Router();

const {
    getHealthOverview
} = require("../controllers/healthController");

const {
    protect
} = require("../middleware/authMiddleware");

router.get(
    "/:id",
    protect,
    getHealthOverview
);

module.exports = router;