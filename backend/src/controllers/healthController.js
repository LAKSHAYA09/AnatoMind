const Report = require("../models/Report");

const getOverallHealth =
    require("../utils/getOverallHealth");

const ORGAN_METADATA =
    require("../utils/organMetadata");


const getHealthOverview = async (req, res) => {

    try {

        const report =
            await Report.findById(req.params.id);

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

        const overallStatus =
            getOverallHealth(
                report.organSummary
            );

        const organs = {};

        Object.entries(
            report.organSummary || {}
        ).forEach(([organ, data]) => {

            organs[organ] = {

                name:
                    ORGAN_METADATA[organ]?.name ||
                    organ,

                system:
                    ORGAN_METADATA[organ]?.system ||
                    "Unknown System",

                status: data.status,

                severity: data.severity,

                findingsCount:
                    data.findingsCount || 0,

                findings:
                    data.findings || []

            };

        });

        res.status(200).json({

            success: true,

            reportId: report._id,

            reportType: report.reportType,

            reportStatus: report.status,

            overallStatus: overallStatus,

            organs: organs,

            analysis:
                report.analysis || []

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