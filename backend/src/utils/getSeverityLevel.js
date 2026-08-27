const getSeverityLevel = (severity) => {

    switch (severity) {

        case "High":
        case "high":
            return 3;

        case "Low":
        case "low":
            return 1;

        default:
            return 0;

    }

};

module.exports = getSeverityLevel;