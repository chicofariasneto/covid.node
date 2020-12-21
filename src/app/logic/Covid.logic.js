/**
 * This function check if a city has valid info in the used fields
 *
 * @param city
 * @return {boolean}
 */
const validationCity = (city) => {
    return city
        && !!city["city"]
        && !!city["city_ibge_code"]
        && !!city["confirmed"]
        && !!city["estimated_population"]
        && !!city["city"];
}

/**
 * This function receives two arrays with data about cities
 * and return top ten cities with most percent of cases of covid-19
 *
 * @param citiesStart
 * @param citiesEnd
 * @return {{data: any[], success: boolean}}
 */
const getTopTenCities = (citiesStart, citiesEnd) => {
    try {
        let topTenCities = [];

        citiesStart.map((city) => {
            /** This if is just to check and have sure that
             * my code will read a city with all information
             * Also the code make more validation trough the process*/
            if (validationCity(city)) {
                const cityEnd = citiesEnd.find(cityEnd => (validationCity(cityEnd)) && city["city_ibge_code"] === cityEnd["city_ibge_code"]);
                const diffCases = cityEnd && city
                    ? cityEnd["confirmed"] - city["confirmed"]
                    : 0.0;

                const percentCase = cityEnd ? (diffCases / cityEnd["estimated_population"]) * 100 : 0.0;

                /** Id we need to load after sort by percentCase */
                topTenCities.push({
                    id: null,
                    nomeCidade: cityEnd ? cityEnd["city"] : 'Unknown City',
                    percentualDeCasos: percentCase
                });
            }
        });

        /** Sorted and got ten cities */
        topTenCities = topTenCities.sort((cityStart, cityEnd) => {
            return cityEnd.percentualDeCasos - cityStart.percentualDeCasos;
        });
        topTenCities = topTenCities.slice(0, 10);

        /** Put id value */
        let idValue = 0;
        for (let city of topTenCities) {
            city.id = idValue++;
        }

        return {success: true, data: topTenCities};
    } catch (err) {
        console.error(err);
        return {success: false, data: []};
    }
}

module.exports = {getTopTenCities};