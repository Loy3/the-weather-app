import React, {  useState } from "react";
import { getWeatherByCity } from '../Services/WeatherServices';
// import { getArticlesByCity } from '../Services/ArticleService';

import search from "../Assets/Icons/transparency.png"

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
// import thenews from "../Assets/Images/news.jpg";
import SideNavBar from "./SideNavBar";

export default function Search() {

    const [searched, setsearched] = useState({
        name: "",
        temp: "",
        descript: "",
        max: "",
        min: "",
        humidity: ""
    });
    const [searchByCity, setsearchByCity] = useState("Pretoria");
    const [searchStatus, setSearchStatus] = useState(false);
    // const [articles, setArticles] = useState([]);
    const [backgroundColor, setbackgroundColor] = useState("");
    const [weatherD, setweatherD] = useState(clearSky)
    


    async function searchWeather() {
        // For searching a city
        let weatherDescription = "";
        try {
            // const city = "soshanguve";
            await getWeatherByCity(searchByCity)
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    setsearched({
                        name: data.name,
                        temp: Math.ceil(data.main.temp - 273.15),
                        descript: data.weather[0].description,
                        max: data.main.temp_max,
                        min: data.main.temp_min,
                        humidity: data.main.humidity


                    });
                    // document.getElementById("searched").style.display = 'block';
                    // convert the weather from kelvin to Celsius
                    // getArticles(data.name);
                    setSearchStatus(true);
                    weatherDescription = data.weather[0].description;

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
                })
                .catch(error => {
                    alert(error);
                });
        } catch (error) {
            alert(error);
        }
    }
    // async function getArticles(city) {
    //     // let city = "Soshanguve";

    //     await getArticlesByCity(city).then(myRes => myRes.json())
    //         .then((data) => {
    //             console.log(data);

    //             setArticles(data.articles);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    function capitalizeString(str) {
        let words = str.split(' ');
        for (let w = 0; w < words.length; w++) {
            words[w] = words[w].charAt(0).toUpperCase() + words[w].slice(1);
        }
        return words.join(' ');
    }

    function getDate() {
        //         const date = new Date(value);
        //         const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
        // return weekday;
        // console.log(weekday);

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const today = new Date();
        const dayOfWeek = daysOfWeek[today.getDay()];
        const dayOfMonth = today.getDate();
        const monthOfYear = monthsOfYear[today.getMonth()];
        const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthOfYear}`;

        return formattedDate;

    }

    if (!searchStatus) return (
        <div className="background" style={{ backgroundImage: `url(${defaultWe})` }}>
            <SideNavBar />
            <div className="search">

                <div className="searchBar">
                    <div>
                        <h1>Search</h1>
                        <p>Search the weather for a city.</p>

                        <div className="container">
                            <div className="bar">
                                <table><tbody><tr>
                                    <td>
                                        <img src={search} alt="Forecast" width={30} />
                                    </td>
                                    <td>
                                        <input type="text" placeholder='Enter a city' onChange={(event) => setsearchByCity(event.target.value)} />
                                    </td>
                                </tr></tbody></table>
                            </div>
                            <button onClick={searchWeather}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="background" style={{ backgroundImage: `url(${backgroundColor})` }}>
            <SideNavBar />
            <div className="mySearch">
                {searched === [] ? null : <div className="wrap">
                    {/* key={index} */}
                    <h1>City: {searched.name}</h1>

                    <h3>{getDate()}</h3>
                    <img src={weatherD} alt="weather" width={80} />
                    {/* <p>Date: {searched.date}</p>
                    <p>Temperature: {searched.temp}°C</p>
                    <p>Description: {searched.descript}</p>
                    <br /><br /> */}

                    <h1>{Math.ceil(searched.temp)}°C</h1>
                    <p>{capitalizeString(searched.descript)}</p>
                    <p>Humidity: {searched.humidity}%</p>

                    <p>
                        Max: {Math.ceil(searched.max)}°C /
                        Min: {Math.ceil(searched.min)}°C
                    </p>
                </div>}
                <div className="articles">
                    <h1>{searched.name} Articles</h1>
                    <p>Article from the searched city.</p>
                    <br/><br/>
                    {/* <div className="row">
                        {articles.map((article, index) => (
                            <div className="column" key={index}>
                                <div className="row" id={"card"}>
                                    <div className="column">
                                        <img src={article.urlToImage} alt='urlToImage'
                                            onError={(e) => {
                                                e.target.src = thenews;
                                            }}
                                            width={250} />

                                    </div>
                                    <div className="column">
                                        <h4>Source: <span>{article.source.name}</span></h4>
                                        <p>{article.title}</p>
                                        {/* <p>{article.description}</p> *}
                                        <a href={article.url} target="_blank" rel="noreferrer noopener">read about it</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>

            </div>
        </div>
    )
}