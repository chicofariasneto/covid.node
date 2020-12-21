/**
 * Code imports
 */
const {getCities} = require('../service/Brasilio.service');
const {sendCitiesNuvem} = require('../service/Nuvem.service');
const {getTopTenCities} = require('../logic/Covid.logic');

/**
 * This function receive milliseconds number
 * and force code to wait for this time
 *
 * @param ms
 * @return {Promise<>}
 */
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = class Covid {
    /**
     * Constructor of class Covid
     *
     * @param state
     * @param startDate
     * @param endDate
     */
    constructor(state, startDate, endDate) {
        this.state = state;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    /**
     * This function is the most important of the code, it process the both date and get the data
     * after this, get top ten and send to nuvem and return an object with status of each process
     *
     * @return {Promise<{data: [], success: boolean}|{data: ({data: *[], success: boolean}|*[]), success: boolean}>}
     */
    async getCities() {
        try {
            const citiesStart = await getCities(this.state, this.startDate);

            /** I put this sleep because Brasil.io was blocking two consecutive request, so I
             * thought more appropriate wait some second before make another request */
            await sleep(5000);

            const citiesEnd = await getCities(this.state, this.endDate);

            /** Getting top ten */
            const tenCities = citiesStart.success && citiesEnd.success
                ? getTopTenCities(citiesStart.data, citiesEnd.data) : [];

            /** Sending to nuvem */
            const resultNuvem = tenCities.success
                ? await sendCitiesNuvem(tenCities.data) : {success: false};

            return {
                success: true,
                sentNuvem: resultNuvem.success,
                data: tenCities.data,
            };
        } catch (err) {
            console.error(err);
            return {success: false, data: []};
        }
    }
}