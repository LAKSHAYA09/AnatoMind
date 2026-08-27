def generate_llm_explanation(findings):

    explanations = []

    for finding in findings:

        parameter = finding.get("parameter")
        value = finding.get("value")
        condition = finding.get("condition")
        organ = finding.get("organ")
        severity = finding.get("severity")

        explanation = (
            f"Your {parameter} value is {value}, which is "
            f"outside the configured reference range. "
            f"This finding is associated with the {organ} "
            f"and is classified as {severity.lower()} severity."
        )

        explanations.append({

            "parameter": parameter,

            "value": value,

            "organ": organ,

            "condition": condition,

            "severity": severity,

            "explanation": explanation,

            "source": "AnatoMind analysis engine"

        })

    return explanations