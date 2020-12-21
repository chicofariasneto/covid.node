/**
 * Basic Imports
 */
require("dotenv").config();
const axios = require('axios');

/**
 * Credentials about brasil.io api
 */
const brasilIo = {
    url: process.env.BRASILIO_URL,
    apiKey: process.env.BRASILIO_APIKEY
};

/**
 * This service get all data about each city in a state in the day of search
 *
 * @param state
 * @param date
 * @return {Promise<{data: [], success: boolean}|{data: *, success: boolean}>}
 */
const getCities = async (state, date) => {
    try {
        const {data} = await axios.get(`${brasilIo.url}state=${state}&date=${date}`, {
            headers: {
                Authorization: `Token ${brasilIo.apiKey}`
            }
        });

        return {success: true, data: data["results"]};
    } catch (err) {
        console.error(err);
        return {success: false, data: []};
    }
};

module.exports = {getCities};