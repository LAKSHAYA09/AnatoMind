const getOverallHealth = (organSummary = {}) => {
    if (!organSummary || typeof organSummary !== "object") {
        return "normal";
    }
    const organs = Object.values(organSummary);

    const high = organs.filter(
        organ => organ?.severity === "high"
    );

    const low = organs.filter(
        organ => organ?.severity === "low"
    );

    if (high.length > 0) {
        return "attention";
    }

    if (low.length > 0) {
        return "monitor";
    }

    return "normal";
};

module.exports = getOverallHealth;