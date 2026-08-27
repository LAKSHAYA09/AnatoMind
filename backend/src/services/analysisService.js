const axios = require("axios");

const analyzeMedicalData = async (data) => {

    const response = await axios.post(

        "http://127.0.0.1:8000/analyze",

        data

    );

    return response.data;

}

module.exports = {

    analyzeMedicalData

}