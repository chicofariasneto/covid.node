/**
 * Express Imports
 */
const express = require('express');
const router = express.Router();

/**
 * Covid Class
 */
const Covid = require('../class/Covid.class');

/**
 * Middleware to validate request
 */
const validation = require('../middleware/Request.middleware');
router.use(validation);

/**
 * This endpoint receive three params in query, and return top ten cities
 * with most percentual case of covid-19 of state received and between that time
 *
 * return {Promise<Object>}
 */
router.get('/', async (request, response) => {
    try {
        const {
            state,
            dateStart,
            dateEnd
        } = request.query;

        const covid = new Covid(state, dateStart, dateEnd);
        const result = await covid.getCities();

        return response.status(200).send(result);
    } catch (err) {
        console.error(err);
    }
});

module.exports = app => app.use('/nuvem', router);