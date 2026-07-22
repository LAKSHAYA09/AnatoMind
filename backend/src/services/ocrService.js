const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const OCR_API = "http://127.0.0.1:8000/ocr";

const extractText = async (filePath) => {
    try {

        const formData = new FormData();

        formData.append(
            "file",
            fs.createReadStream(filePath)
        );

        const response = await axios.post(
            OCR_API,
            formData,
            {
                headers: formData.getHeaders()
            }
        );

        return response.data;

    } catch (error) {

        console.error("OCR Service Error");

        throw error;
    }
};

module.exports = {
    extractText
};