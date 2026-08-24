EXPLANATIONS = {

    "High Cholesterol": {
        "explanation": (
            "Your total cholesterol is above the reference range. "
            "Elevated cholesterol can be associated with cardiovascular risk "
            "and should be discussed with a healthcare professional."
        ),
        "advice": [
            "Maintain regular physical activity.",
            "Follow a balanced diet with appropriate amounts of saturated fat.",
            "Discuss your complete lipid profile with a healthcare professional."
        ]
    },

    "High Triglycerides": {
        "explanation": (
            "Your triglyceride level is above the reference range. "
            "Elevated triglycerides can be associated with cardiovascular and "
            "metabolic health risks."
        ),
        "advice": [
            "Maintain regular physical activity.",
            "Limit excessive intake of added sugars and refined carbohydrates.",
            "Discuss persistent elevation with a healthcare professional."
        ]
    },

    "High LDL": {
        "explanation": (
            "Your LDL cholesterol is above the reference range. "
            "LDL is commonly referred to as a type of cholesterol associated "
            "with plaque buildup in arteries when levels remain elevated."
        ),
        "advice": [
            "Maintain regular physical activity.",
            "Follow a heart-healthy eating pattern.",
            "Discuss your LDL level and overall cardiovascular risk with a healthcare professional."
        ]
    },

    "High Blood Sugar": {
        "explanation": (
            "Your blood glucose value is above the configured reference range. "
            "Blood glucose should be interpreted using the test type, timing, "
            "and clinical context."
        ),
        "advice": [
            "Maintain regular physical activity when appropriate.",
            "Follow a balanced eating pattern.",
            "Discuss abnormal or persistent results with a healthcare professional."
        ]
    },

    "Low Hemoglobin": {
        "explanation": (
            "Your hemoglobin value is below the configured reference range. "
            "Low hemoglobin can have several possible causes and requires "
            "clinical context for interpretation."
        ),
        "advice": [
            "Discuss the result with a healthcare professional.",
            "Do not start supplements solely based on this result.",
            "Further testing may be recommended depending on clinical context."
        ]
    }
}


def generate_explanation(findings):

    results = []

    for finding in findings:

        condition = finding["condition"]

        explanation = EXPLANATIONS.get(
            condition,
            {
                "explanation": (
                    "This result is outside the configured reference range "
                    "and should be interpreted in its clinical context."
                ),
                "advice": [
                    "Discuss the result with a healthcare professional."
                ]
            }
        )

        results.append({

            "parameter": finding["parameter"],

            "value": finding["value"],

            "organ": finding["organ"],

            "condition": condition,

            "severity": finding["severity"],

            "confidence": finding["confidence"],

            "explanation": explanation["explanation"],

            "advice": explanation["advice"]

        })

    return results