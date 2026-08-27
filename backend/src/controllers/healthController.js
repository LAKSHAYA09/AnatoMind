const Report = require("../models/Report");
const getOverallHealth = require("../utils/getOverallHealth");
const overallStatus = getOverallHealth(Report.organSummary);

const getHealthOverview = async (req, res) => {

    try {

        const report = await Report.findById(req.params.id);

        if (!report) {

            return res.status(404).json({

                success: false,

                message: "Report not found"

            });

        }

        // Security check
        if (
            report.user.toString() !==
            req.user._id.toString()
        ) {

            return res.status(401).json({

                success: false,

                message: "Not authorized"

            });

        }

        res.status(200).json({

            success: true,

            reportId: report._id,

            reportType: report.reportType,

            status: report.status,

            overallStatus: overallStatus,

            organSummary: report.organSummary,

            findings: report.analysis

        });

    }
    catch (error) {

        console.error(
            "Health overview error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message: "Server error"

        });

    }
};

module.exports = {
    getHealthOverview
};