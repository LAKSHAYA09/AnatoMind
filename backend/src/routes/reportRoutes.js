const express = require("express");
const router = express.Router();
const { 
  uploadReport, 
  getReports, 
  getReportById 
} = require("../controllers/reportController");

// Import the middlewares you built in Step 4 and Step 5
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Route for uploading a report
// 'file' is the field name that the frontend or Thunder Client must use in form-data
router.post("/upload", protect, upload.single("file"), uploadReport);

// Route for getting all reports for the logged-in user
router.get("/", protect, getReports);

// Route for getting a single report by its database ID
router.get("/:id", protect, getReportById);

module.exports = router;