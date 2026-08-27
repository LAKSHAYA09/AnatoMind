const Report = require("../models/Report");
const { extractText } = require("../services/ocrService");
const parseOCR=require("../utils/parseOCR");
const { analyzeMedicalData } = require("../services/analysisService");
const { generateExplanations } = require("../services/explanationService");
const buildOrganSummary = require("../utils/buildOrganSummary");
const { generateAIExplanation } = require("../services/aiExplanationService");

// @desc    Upload a new medical report
// @route   POST /api/reports/upload
// @access  Private
const uploadReport = async (req, res) => {

    try{

        if(!req.file){

            return res.status(400).json({
                success:false,
                message:"Please upload a file"
            });

        }

        // Call Python OCR Service
        const ocrResult = await extractText(req.file.path);
        const parsedData=parseOCR(ocrResult.text);
        const analysis = await analyzeMedicalData(parsedData);
        
        let aiExplanation = { explanations: [] };
        if (analysis.findings && analysis.findings.length > 0) {
            aiExplanation = await generateAIExplanation(analysis.findings);
        }
        const organSummary = buildOrganSummary(aiExplanation.explanations);

        // Save report
        const report = await Report.create({

            user:req.user._id,

            fileName:req.file.filename,

            filePath:`/uploads/${req.file.filename}`,

            reportType:"Blood Test",
            
            extractedText:ocrResult.text,
            
            extractedData:parsedData,

            analysis:aiExplanation.explanations,

            organSummary: organSummary,
            
            status:"Completed"

        });

        res.status(201).json({

            success:true,
            message: "Report analysis completed",
            reportId: report._id,
            extractedData: parsedData,
            findings: analysis.findings,
            explanations: aiExplanation.explanations,
            organSummary: organSummary,
            aiMetadata: {
              generated: aiExplanation.explanations.length > 0,
              provider: "AnatoMind AI",
              type: "explanation-only"
            }
        });
    }

    catch(error){

        console.error(error);

        res.status(500).json({success:false,message:"OCR Processing Failed"

        });

    }

};

// @desc    Get all reports for the logged-in user
// @route   GET /api/reports
// @access  Private
const getReports = async (req, res) => {
  try {
    // Find only the reports that belong to the current authenticated user
    const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    console.error("Get reports error:", error.message);
    res.status(500).json({ success: false, message: "Server error fetching reports" });
  }
};

// @desc    Get a single report by ID
// @route   GET /api/reports/:id
// @access  Private
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    // Security Check: Make sure the report belongs to the logged-in user
    if (report.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Not authorized to view this report" });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("Get single report error:", error.message);
    // Handle invalid Mongoose Object ID casting errors cleanly
    if (error.kind === "ObjectId") {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.status(500).json({ success: false, message: "Server error fetching the report" });
  }
};

module.exports = {
  uploadReport,
  getReports,
  getReportById,
};