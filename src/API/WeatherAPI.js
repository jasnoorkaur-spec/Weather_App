import axios from 'axios'

export async function fetchCoordinates(query)
{
    const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`);
    
    return res.data.results[0] ;
}

export async function fetchWeatherbyCity(query)
{
    const location = await fetchCoordinates(query) ;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=uv_index,temperature_2m,is_day,relative_humidity_2m,visibility,pressure_msl,weather_code,wind_speed_10m&hourly=wind_speed_10m,temperature_2m,weather_code,is_day,relative_humidity_2m,precipitation_probability&daily=uv_index_max,weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto`;
    
    const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.latitude}&longitude=${location.longitude}` + `&current=us_aqi,pm2_5,pm10&timezone=auto`;

    const [weather, air] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(airUrl),
    ]);

    return { ...weather.data, air_quality: air.data.current };
}

export const fetchCityFromCoords = async (lat, lon) => {
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    if (!res.ok) throw new Error("Could not find your city");
    
    const data = await res.json();
    
    const city = data.city || data.locality;
    if (!city) throw new Error("Could not find your city");
    
    return city;
};