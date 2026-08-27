const axios = require("axios");

const generateAIExplanation = async (findings) => {

    try {

        const response = await axios.post(
            "http://127.0.0.1:8000/ai-explain",
            {
                findings
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "AI explanation service error:",
            error.message
        );

        throw new Error(
            "AI explanation service unavailable"
        );
    }
};

module.exports = {
    generateAIExplanation
};