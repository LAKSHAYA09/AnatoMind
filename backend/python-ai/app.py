from fastapi import FastAPI, UploadFile, File
import shutil
import os

from services.ocr_service import extract_text

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