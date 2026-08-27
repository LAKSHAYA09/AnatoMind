const ORGAN_LIST = [
    "heart",
    "lungs",
    "kidney",
    "liver",
    "pancreas",
    "brain",
    "bones",
    "blood"
];

const buildOrganSummary = (findings = []) => {

    const organs = {};

    // Create default state for every supported organ
    ORGAN_LIST.forEach((organ) => {

        organs[organ] = {
            status: "normal",
            severity: "normal",
            findingsCount: 0,
            findings: []
        };

    });

    findings.forEach((finding) => {

        const organ = finding.organ?.toLowerCase();

        if (!organ || !organs[organ]) {
            return;
        }

        organs[organ].findingsCount += 1;

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