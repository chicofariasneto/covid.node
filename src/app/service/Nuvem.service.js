/**
 * Basic Imports
 */
require('dotenv').config();
const axios = require('axios');

/**
 * Credentials about nuvem api
 */
const nuvem = {
    url: process.env.NUVEM_URL,
    name: process.env.NUVEM_NAME
};

/**
 * This service receives an array with ten cities and
 * sen one by one to nuvem api
 *
 * @param cities
 * @return {Promise<{success: boolean}>}
 */
const sendCitiesNuvem = async (cities) => {
    try {
        for (const city of cities)
            await axios.post(nuvem.url, city, {
                headers: {
                    "MeuNome": nuvem.name
                }
            });

        return {success: true};
    } catch (err) {
        console.error(err);
        return {success: false};
    }
}

module.exports = {sendCitiesNuvem};