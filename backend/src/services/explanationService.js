const axios = require("axios");

const generateExplanations = async (findings) => {

    const response = await axios.post(
        "http://127.0.0.1:8000/explain",
        {
            findings
        }
    );

    return response.data;
};

module.exports = {
    generateExplanations
};