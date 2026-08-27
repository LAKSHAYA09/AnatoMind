import os
import pdfplumber
import easyocr

# Initialize EasyOCR only once
reader = easyocr.Reader(['en'], gpu=False)


def extract_text(file_path):
    """
    Detect file type and extract text.
    """

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":
        return extract_pdf(file_path)

    elif extension in [".png", ".jpg", ".jpeg"]:
        return extract_image(file_path)

    else:
        raise Exception("Unsupported file type")


def extract_pdf(file_path):
    """
    Extract text from PDF
    """

    text = ""

    with pdfplumber.open(file_path) as pdf:

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:

                text += page_text + "\n"

    return text


def extract_image(file_path):
    """
    Extract text from image using EasyOCR
    """

    result = reader.readtext(file_path, detail=0)

    return "\n".join(result)