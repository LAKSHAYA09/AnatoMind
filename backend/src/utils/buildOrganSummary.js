const buildOrganSummary = (findings) => {

    const organs = {};

    findings.forEach((finding) => {

        const organ = finding.organ;

        if (!organs[organ]) {

            organs[organ] = {
                status: "normal",
                severity: "normal",
                findings: []
            };

        }

        organs[organ].findings.push({
            parameter: finding.parameter,
            condition: finding.condition,
            value: finding.value
        });

        if (finding.severity === "High") {
            organs[organ].severity = "high";
            organs[organ].status = "attention";
        }
        else if (
            finding.severity === "Low" &&
            organs[organ].severity !== "high"
        ) {
            organs[organ].severity = "low";
            organs[organ].status = "attention";
        }

    });

    return organs;
};

module.exports = buildOrganSummary;