from fastapi import FastAPI, UploadFile, File
import shutil
import os

from services.ocr_service import extract_text
from services.analysis_service import analyze_report
from services.explanation_service import generate_explanation
from services.llm_service import generate_llm_explanation

app = FastAPI(
    title="AnatoMind OCR Service",
    version="1.0"
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():

    return {
        "success": True,
        "message": "OCR Service Running"
    }


@app.post("/ocr")
async def ocr(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        extracted_text = extract_text(file_path)

        return {
            "success": True,
            "filename": file.filename,
            "text": extracted_text
        }

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)
            
@app.post("/analyze")

async def analyze(data: dict):
    findings = analyze_report(data)

    return {
        "success": True,
        "findings": findings
    }
    
@app.post("/explain")
async def explain(data: dict):

    findings = data.get("findings", [])

    explanations = generate_explanation(findings)

    return {
        "success": True,
        "explanations": explanations
    }
    
@app.post("/ai-explain")
async def ai_explain(data: dict):

    findings = data.get("findings", [])

    explanations = generate_llm_explanation(findings)

    return {
        "success": True,
        "explanations": explanations
    }