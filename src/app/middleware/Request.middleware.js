/**
 * Moment.JS import
 */
const moment = require('moment');

/**
 * Valid states
 */
const states = ["AC", "AL", "AP", "AM", "BA", "CE", "DF",
    "ES", "GO", "MA", "MT", "MS", "MG", "PA",
    "PB", "PR", "PE", "PI", "RJ", "RN", "RS",
    "RO", "RR", "SC", "SP", "SE", "TO"];

/**
 * This middleware checks if state tag are valid, datStart has correct format
 * and dateEnd has correct format too. If this conditions are true move for endpoint
 *
 * @param request
 * @param response
 * @param next
 *
 * @return {Next()}
 */
module.exports = (request, response, next) => {
    try {
        const {
            state,
            dateStart,
            dateEnd
        } = request.query;

        if (!states.includes(state))
            return response.status(401).send({
                success: false,
                message: `State is not valid, please info a valid Brazil's state tag`
            });

        if (!moment(dateStart, moment.ISO_8601, true).isValid())
            return response.status(401).send({
                success: false,
                message: `DateStart are not a valid date, please review your dateStart`
            });

        if (!moment(dateEnd, moment.ISO_8601, true).isValid())
            return response.status(401).send({
                success: false,
                message: `DateEnd are not a valid date, please review your dateEnd`
            });

        return next();
    } catch (err) {
        console.error(err);
        return response.status(401).send({success: false, message: `Something went wrong on validation query`});
    }
}