import { url } from "inspector";
import { useEffect, useState } from "react"


export const useWeather = () => {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState({ location: "", temp: "", weatherDescription: "" });
    const [weatherDataForecast, setWeatherDataForecast] = useState({ tempMax: [], tempMin: [], sunrise: [], sunset: [], time: [], weathercode: [], windspeed: [] });
    const [starWarsPlanet, setStarWarsPlanet] = useState("default");
    const API_KEY = "79a9ad1cd477e4c6265d4b1882c856b0";
    const BASE_WEATHER_ENCODING_URL = "https://api.openweathermap.org";
    const GEO_ENCODING_RELATIVE_URL = "/geo/1.0/direct";

    const BASE_WEATHER_URL = "https://api.open-meteo.com";
    const WEATHER_DATA_FORECAST_RELATIVE_URL = "v1/forecast";

    const weatherCodeMap = initializeWeatherCodeMap();


    function fetchCoordinates() {
        const url = new URL(GEO_ENCODING_RELATIVE_URL, BASE_WEATHER_ENCODING_URL);
        url.searchParams.append('q', location);
        url.searchParams.append('limit', '1')
        url.searchParams.append('appid', API_KEY);

        fetch(url.toString())
            .then(response => response.json())
            .then((obj) => {
                console.log(obj);
                if (obj[0].hasOwnProperty('local_names') && obj[0].local_names.hasOwnProperty('de')) {
                    fetchWeather(obj[0].lat, obj[0].lon, obj[0].local_names.de);
                } else {
                    fetchWeather(obj[0].lat, obj[0].lon, location);
                }
            })
            .catch((err) => {
                console.log(err);
                setStarWarsPlanet("noPlanet")
            })
    }

    function fetchWeather(lat: string, lon: string, locationName: string) {
        console.log(lat);
        console.log(lon);
        const url = new URL(WEATHER_DATA_FORECAST_RELATIVE_URL, BASE_WEATHER_URL);
        url.searchParams.append("latitude", lat);
        url.searchParams.append("longitude", lon);
        url.searchParams.append("current_weather", "true");
        url.searchParams.append("daily", "apparent_temperature_min");
        url.searchParams.append("daily", "apparent_temperature_max");
        url.searchParams.append("daily", "weathercode");
        url.searchParams.append("daily", "sunrise");
        url.searchParams.append("daily", "sunset");
        url.searchParams.append("daily", "windspeed_10m_max");
        url.searchParams.append("timezone", "auto");

        fetch(url.toString())
            .then(response => response.json())
            .then((obj) => {
                console.log(obj);
                const weatherDataObj = { location: locationName, temp: obj.current_weather.temperature + "°C", weatherDescription: "" + weatherCodeMap.get(obj.current_weather.weathercode) };
                console.log(weatherDataObj)
                decideStarWarsPlanet(parseInt(weatherDataObj.temp));
                setWeatherData(weatherDataObj);
                buildForecastObject(obj.daily);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function decideStarWarsPlanet(temp: number) {
        if (temp <= 0) {
            setStarWarsPlanet("Hoth");
        } else if (temp <= 7) {
            setStarWarsPlanet("Dagobah");
        } else if (temp <= 14) {
            setStarWarsPlanet("Naboo");
        } else if (temp <= 21) {
            setStarWarsPlanet("Yavin4");
        } else if (temp <= 28) {
            setStarWarsPlanet("Bespin");
        } else if (temp <= 35) {
            setStarWarsPlanet("Tatooine");
        } else if (temp > 35) {
            setStarWarsPlanet("Mustafa");
        }
    }

    function buildForecastObject(dailyForecast: any) {
        console.log(dailyForecast.weathercode);
        const weatherDescriptions = dailyForecast.weathercode.map((code: number) => weatherCodeMap.get(code));
        const dateEU = dailyForecast.time.map((date: string) => {
            const dateArr = date.split("-");
            return dateArr[2]+ "." + dateArr[1]+ "." + dateArr[0];
        })

        console.log(weatherDescriptions);
        const weatherDataObjForecast = { tempMax: dailyForecast.apparent_temperature_max, tempMin: dailyForecast.apparent_temperature_min, sunrise: dailyForecast.sunrise, sunset: dailyForecast.sunset, time: dateEU, weathercode: weatherDescriptions, windspeed: dailyForecast.windspeed_10m_max };
        setWeatherDataForecast(weatherDataObjForecast);
    }

    function initializeWeatherCodeMap() {
        const weatherCodeMap = new Map();
        const CLEAR_SKY = 'klarer Himmel';
        const CLEAR = 'meist klar';
        const CLOUDY = 'teilweise bewölkt';
        const OVERCAST = 'bedeckt';
        const FOG = 'Nebel';
        const RAIN_LOW = 'leichter Regen';
        const RAIN_MID = 'mäßiger Regen';
        const RAIN_HARD = 'starker Regen';
        const SNOW_LOW = 'leichter Schneefall';
        const SNOW_MID = 'mäßiger Schneefall';
        const SNOW_HARD = 'starker Schneefall';
        const RAIN_LOW_SHOWER = 'leichter Regenschauer';
        const RAIN_HARD_SHOWER = 'starker Regenschauer';
        const SNOW_LOW_SHOWER = 'leichter Schneeschauer';
        const SNOW_HARD_SHOWER = 'starker Schneeschauer';
        const STORM = 'Gewitter';
        const STORM_HAIL = 'Gewitter mit Hagel';

        weatherCodeMap.set(0, CLEAR_SKY);
        weatherCodeMap.set(1, CLEAR);
        weatherCodeMap.set(2, CLOUDY);
        weatherCodeMap.set(3, OVERCAST);
        weatherCodeMap.set(45, FOG);
        weatherCodeMap.set(48, FOG);
        weatherCodeMap.set(51, RAIN_LOW);
        weatherCodeMap.set(53, RAIN_MID);
        weatherCodeMap.set(55, RAIN_HARD);
        weatherCodeMap.set(56, RAIN_LOW);
        weatherCodeMap.set(57, RAIN_MID);
        weatherCodeMap.set(61, RAIN_LOW);
        weatherCodeMap.set(63, RAIN_MID);
        weatherCodeMap.set(65, RAIN_HARD);
        weatherCodeMap.set(66, RAIN_LOW);
        weatherCodeMap.set(67, RAIN_MID);
        weatherCodeMap.set(71, SNOW_LOW);
        weatherCodeMap.set(73, SNOW_MID);
        weatherCodeMap.set(75, SNOW_HARD);
        weatherCodeMap.set(77, SNOW_LOW);
        weatherCodeMap.set(80, RAIN_LOW_SHOWER);
        weatherCodeMap.set(81, RAIN_HARD_SHOWER);
        weatherCodeMap.set(82, RAIN_HARD_SHOWER);
        weatherCodeMap.set(85, SNOW_LOW_SHOWER);
        weatherCodeMap.set(86, SNOW_HARD_SHOWER);
        weatherCodeMap.set(95, STORM);
        weatherCodeMap.set(96, STORM_HAIL);
        weatherCodeMap.set(99, STORM_HAIL);

        return weatherCodeMap;
    }

    return {
        location,
        setLocation,
        fetchCoordinates,
        weatherData,
        starWarsPlanet,
        weatherDataForecast
    }

}