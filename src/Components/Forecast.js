
import React, { useState, useEffect  } from "react";
import { getWeatherForecast } from '../Services/WeatherServices';
import SideNavBar from "./SideNavBar";

import brokenCloud from "../Assets/Icons/brokencloud.png";
import fewClouds from "../Assets/Icons/fewClouds.png";
import overcastW from "../Assets/Icons/overcast.png";
import rainW from "../Assets/Icons/rain.png";
import scatteredCl from "../Assets/Icons/scatteredclouds.png";
import showerRain from "../Assets/Icons/showerrain.png";
import snowy from "../Assets/Icons/snowy.png";
import clearSky from "../Assets/Icons/sunny.png";
import thunderstormW from "../Assets/Icons/thunderstorm.png";
import mist from "../Assets/Icons/mist2.png";
// import nightT from "../Assets/Icons/night.png";

import csW from "../Assets/Images/clearsky.jpg";
import fcW from "../Assets/Images/fewclouds.jpg";
import msW from "../Assets/Images/mist.jpg";
import ocW from "../Assets/Images/overcastclouds2.jpg";
import rnW from "../Assets/Images/rainy.jpg";
import scW from "../Assets/Images/scatteredclouds.jpg";
import bcW from "../Assets/Images/scatteredclouds.jpg";
import swW from "../Assets/Images/snow.jpg";
import srW from "../Assets/Images/showerrain.jpg";
import thW from "../Assets/Images/thunderstorm.jpg";
// import csW from "../Assets/Images/clearsky.jpg";
import defaultWe from "../Assets/Images/default.jpg";

export default function Forecast() {
    const [forecastWeather, setForecastWeather] = useState([]);
    // const [city, setCity] = useState("");
    const [title, setTitle] = useState("");
    const [backgroundColor, setbackgroundColor] = useState("");
    const [weather, setWeather] = useState([]);
    const [weatherD, setweatherD] = useState(clearSky);

    

    useEffect(() => {
        const fetchWeatherForeCast = async () => {
            let  weatherDescription  = "";
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                await getWeatherForecast(latitude, longitude).then(res => res.json())
                    .then((data) => {
                        let forecast = [];
                        // console.log(data);
                        // setCity(data.city.name);
                        setTitle(`${data.city.name} | ${data.city.country.toLowerCase()}`)
                        forecast = data.list.reduce((acc, obj) => {
                            const date = new Date(obj.dt * 1000).toLocaleDateString();
                            // const idNum = obj.item;
                            if (!acc[date]) {
                                acc[date] = [obj];
                            } else {
                                acc[date].push({ obj });
                            }
                            return acc;
                        }, {});

                        const arr = Object.entries(forecast).map(([date, value]) => ({ date, value }));
                        console.log(arr);
                        setWeather(arr.slice(0, 1))
                        setForecastWeather(arr.slice(1))
                        weatherDescription = arr[0].value[0].weather[0].description;

                        switch (weatherDescription) {
                            case 'clear sky':
                                setbackgroundColor(csW);
                                setweatherD(clearSky);
                                break;
                            case 'few clouds':
                                setbackgroundColor(fcW);
                                setweatherD(fewClouds);
                                break;
                            case 'scattered clouds':
                                setbackgroundColor(scW);
                                setweatherD(scatteredCl);
                                break;
                            case 'broken clouds':
                                setbackgroundColor(bcW);
                                setweatherD(brokenCloud);
                                break;
                            case 'overcast clouds':
                                setbackgroundColor(ocW);
                                setweatherD(overcastW);
                                break;
                            case 'shower rain':
                                setbackgroundColor(srW);
                                setweatherD(showerRain);
                                break;
                            case 'rain':
                                setbackgroundColor(rnW);
                                setweatherD(rainW);
                                break;
                            case 'thunderstorm':
                                setbackgroundColor(thW);
                                setweatherD(thunderstormW);
                                break;
                            case 'snow':
                                setbackgroundColor(swW);
                                setweatherD(snowy);
                                break;
                            case 'mist':
                                setbackgroundColor(msW);
                                setweatherD(mist);
                                break;
                            default:
                                setbackgroundColor(defaultWe);
                                setweatherD(clearSky);
                        }
                    });
            });


            // set background color based on weather description
            // let backgroundColor;

        }

        fetchWeatherForeCast();

    }, []);



    function convertToDays(value) { 
        //         const date = new Date(value);
        //         const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
        // return weekday;
        // console.log(weekday);

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const today = new Date(value);
        const dayOfWeek = daysOfWeek[today.getDay()];
        const dayOfMonth = today.getDate();
        const monthOfYear = monthsOfYear[today.getMonth()];
        const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthOfYear}`;

        return formattedDate;

    }

    function capitalizeString(str) {
        let words = str.split(' ');
        for (let w = 0; w < words.length; w++) {
            words[w] = words[w].charAt(0).toUpperCase() + words[w].slice(1);
        }
        return words.join(' ');
    }

    if (!forecastWeather) return <div>Loading...</div>;




    return (
        <div className="background" style={{ backgroundImage: `url(${backgroundColor})` }}>
            <div className="forecast">
                <SideNavBar />
                <div className="forecast-content" >
                    <h1>Forecast: {title}</h1>
                    <div className="wrapper">
                        {weather.map((day, index) => (
                            <div className="today" key={index}>
                                <h3>{convertToDays(day.date)}</h3>
                                <img src={weatherD} alt="Weather" width={100} />
                                {/* <p>Date: {convertToDays(day.date)}</p>
                                    <p>Temperature: {day.value[0].main.temp}°C</p>
                                    <p>Description: {capitalizeString(day.value[0].weather[0].description)}</p>
                                    <br /><br /> */}

                                <h2>{Math.ceil(day.value[0].main.temp)}°C</h2>

                                <h3>Max: {Math.ceil(day.value[0].main.temp_max)}°C /
                                    Min: {Math.ceil(day.value[0].main.temp_min)}°C
                                </h3>
                                <p>{capitalizeString(day.value[0].weather[0].description)}</p>
                                {/* <p>Humidity: {day.value[0].main.humidity}%</p> */}




                            </div>
                        ))}
                    </div>

                    <div className="row" id={"cardCont"}>
                        {forecastWeather.map((day, index) => (
                            <div className="column" key={index}>
                                <div className="card">
                                    <h3 className="date">{convertToDays(day.date)}</h3>
                                    {/* Set Image */}
                                    {day.value[0].weather[0].description === "clear sky" ? <img src={clearSky} alt="Weather" width={70} /> : null}
                                    {day.value[0].weather[0].description === "few clouds" ? <img src={fewClouds} alt="Weather" width={70} /> : null}
                                    {day.value[0].weather[0].description === "scattered clouds" ? <img src={scatteredCl} alt="Weather" width={70} /> : null}
                                    {day.value[0].weather[0].description === "broken clouds" ? <img src={brokenCloud} alt="Weather" width={70} /> : null}
                                    {day.value[0].weather[0].description === "overcast clouds" ? <img src={overcastW} alt="Weather" width={70} /> : null}
                                    {day.value[0].weather[0].description === "shower rain" ? <img src={showerRain} alt="Weather" width={70} /> : null}
                                    {day.value[0].weather[0].description === "rain" ? <img src={rainW} alt="Weather" width={70} /> : null}
                                    {day.value[0].weather[0].description === "thunderstorm" ? <img src={thunderstormW} alt="Weather" width={70} /> : null}
                                    {day.value[0].weather[0].description === "snow" ? <img src={snowy} alt="Weather" width={70} /> : null}
                                    {day.value[0].weather[0].description === "mist" ? <img src={mist} alt="Weather" width={70} /> : null}
                                    {/* Set Image */}


                                    <h3>{!day.value[4]?.obj.main.temp ? `Min: ${Math.ceil(day.value[1]?.obj.main.temp)}°C` : `Max: ${Math.ceil(day.value[4]?.obj.main.temp)}°C / Min: ${Math.ceil(day.value[1]?.obj.main.temp)}°C`} </h3>
                                    <p>{capitalizeString(day.value[0].weather[0].description)}</p>
                                    <br /><br />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )

}