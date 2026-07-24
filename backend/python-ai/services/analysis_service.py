import re
from services.medical_ranges import MEDICAL_RANGES
from services.organ_mapper import ORGAN_MAPPING


def analyze_report(report_data):

    findings = []

    for key, value in report_data.items():

        if key not in MEDICAL_RANGES:
            continue
        
        match = re.search(r"\d+(\.\d+)?", value)
        if not match:
            continue

        value = float(match.group())

        minimum=MEDICAL_RANGES[key]["min"]

        maximum=MEDICAL_RANGES[key]["max"]

        if value < minimum:

            findings.append({

                "parameter": key,

                "value": value,

                "severity": "Low",

                "organ": ORGAN_MAPPING[key]["organ"],

                "condition": ORGAN_MAPPING[key]["condition"],

                "confidence": 92

            })

        elif value > maximum:

            findings.append({

                "parameter": key,

                "value": value,

                "severity": "High",

                "organ": ORGAN_MAPPING[key]["organ"],

                "condition": ORGAN_MAPPING[key]["condition"],

                "confidence": 95

            })

    return findings