const axios = require('axios');

const getCountryFromCoordinates = async (lat, lng) => {
    const apiKey = 'TU_API_KEY';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const country = response.data.results[0].components.country;
        return country;
    } catch (error) {
        console.error('Error al obtener el país:', error);
    }
};