const ORGAN_LIST = [
    "heart",
    "lungs",
    "kidney",
    "liver",
    "pancreas",
    "blood",
    "brain",
    "bones"
];

const buildOrganSummary = (findings = []) => {

    const organs = {};

    // Initialize all supported organs
    ORGAN_LIST.forEach((organ) => {

        organs[organ] = {
            status: "normal",
            severity: "normal",
            findings: []
        };

    });

    // Add abnormal findings
    findings.forEach((finding) => {

        const organ = finding.organ?.toLowerCase();

        if (!organs[organ]) {
            return;
        }

        organs[organ].findings.push({

            parameter: finding.parameter,

            value: finding.value,

            condition: finding.condition,

            severity: finding.severity,

            confidence: finding.confidence

        });

        if (finding.severity === "High") {

            organs[organ].status = "attention";
            organs[organ].severity = "high";

        }
        else if (
            finding.severity === "Low" &&
            organs[organ].severity !== "high"
        ) {

            organs[organ].status = "attention";
            organs[organ].severity = "low";

        }

    });

    return organs;
};

module.exports = buildOrganSummary;