//Declarations
const API_KEY = "c530bf33b8dca7c2c9139af4f700da2a";
// const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
// const forCast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;


//get current location weather
export const getCurrentWeather = async (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    return response;

}

export const getWeatherForecast = async (latitude, longitude) => {
    const forCast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    const results = await fetch(forCast)
    return results;
}

export const getWeatherByCity = async (city) => {
    const searchCity = city.toLowerCase()
    const cityRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}`);
    return cityRes;

} 
