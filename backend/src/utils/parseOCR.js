const parseOCR = (text) => {
  const result = {};

  // 1. Clean ligature encoding issues like (cid:415) -> "ti"
  const cleanText = text.replace(/\(cid:\d+\)/g, "ti");

  const lines = cleanText.split("\n");

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("=") || trimmed.startsWith("-")) return;

    // 2. Parse colon-separated metadata (e.g., Reference ID: ANATO-9823489)
    if (trimmed.includes(":")) {
      const parts = trimmed.split(":");
      const key = parts[0].trim();
      const value = parts.slice(1).join(":").trim();
      if (key && value) {
        result[key] = value;
      }
    } 
    // 3. Parse lab test metrics (e.g., Total Cholesterol 210 mg/dL (< 200) *HIGH*)
    else {
      // Regex matches: Metric Name | Value | Unit + Reference Range
      const metricMatch = trimmed.match(/^([A-Za-z\s()]+)\s+([\d.]+.*)$/);
      if (metricMatch) {
        const metricName = metricMatch[1].trim();
        const metricValue = metricMatch[2].trim();
        if (metricName && metricValue && metricName !== "TEST METRIC") {
          result[metricName] = metricValue;
        }
      }
    }
  });

  return result;
};

module.exports = parseOCR;