import React, { useState, useEffect } from "react";
import { getCurrentWeather } from '../Services/WeatherServices';
import SideNavBar from "./SideNavBar";
import moment from 'moment';
import CurrentDate from "./CurrentDate";


import forecast from "../Assets/Icons/forecast.png"
import search from "../Assets/Icons/search.png"

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
import nightT from "../Assets/Icons/night.png";

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



export default function Weather() {
    const [weather, setWeather] = useState(null);
    const [time, setTime] = useState(moment().format('hh:mm'));
    const [backgroundColor, setbackgroundColor] = useState("");
    const [weatherD, setweatherD] = useState(clearSky);
    

    useEffect(() => {
        const fetchWeather = async () => {
            let weatherDescription = "";
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const response = await getCurrentWeather(latitude, longitude)
                const weatherData = await response.json();
                console.log(weatherData);
                setWeather(weatherData);

                weatherDescription = weatherData.weather[0].description;

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
        };

        fetchWeather();
        const interval = setInterval(() => {
            setTime(moment().format('hh:mm'));

            const nightStart = new Date();
            nightStart.setHours(18, 0, 0); // 6pm
            const nightEnd = new Date();
            nightEnd.setHours(6, 0, 0); // 6am

            // Compare the current time to the night time range
            if (moment() >= nightStart || moment() < nightEnd) {
                setbackgroundColor(defaultWe);
                setweatherD(nightT);
            }
        }, 1000);
        return () => clearInterval(interval);

    }, [time]); 

    function capitalizeString(str) {
        let words = str.split(' ');
        for (let w = 0; w < words.length; w++) {
            words[w] = words[w].charAt(0).toUpperCase() + words[w].slice(1);
        }
        return words.join(' ');
    }

    if (!weather) return <div>Loading...</div>;

    return (
        <div className="background" style={{backgroundImage: `url(${backgroundColor})`}}>
            <div className="weather">
                <SideNavBar />
                <div className="weather-container" >
                    <div className="wrap">
                        <div className="date-time">
                            <div>
                                <h1>{time}</h1>
                                <CurrentDate />
                                <div className="buttons">
                                    <button>
                                        <table><tbody><tr>
                                            <td>
                                                <img src={forecast} alt="Forecast" width={30} />
                                            </td>
                                            <td>
                                                <span>Forecast</span>
                                            </td>
                                        </tr></tbody></table>
                                    </button>
                                    <button>
                                        <table><tbody><tr>
                                            <td>
                                                <img src={search} alt="Forecast" width={30} />
                                            </td>
                                            <td>
                                                <span>Search</span>
                                            </td>
                                        </tr></tbody></table>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="place">
                            <div className="card">
                                <div className="card-top">
                                    <h1>{weather.name} | {weather.sys.country.toLowerCase()}</h1>
                                </div>
                                <div className="card-content">

                                    <img src={weatherD} alt={weather.weather[0].description} />
                                    <h1>{Math.ceil(weather.main.temp)}°C</h1>
                                    <p>{capitalizeString(weather.weather[0].description)}</p>
                                    <p>Humidity: {weather.main.humidity}%</p>

                                    <p>
                                        Max: {Math.ceil(weather.main.temp_max)}°C /
                                         Min: {Math.ceil(weather.main.temp_min)}°C
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}