import './App.css';

import React, { useState, useEffect } from "react";
import { getCurrentWeather, getWeatherForecast, getWeatherByCity } from './Services/WeatherServices';

// const API_KEY = "c530bf33b8dca7c2c9139af4f700da2a";
// const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {

  // const [weatherData, setWeatherData] = useState({});

  // const fetchWeatherData = async () => {
  //   const response = await fetch(
  //     `${API_URL}?q=New%20York&units=imperial&appid=${API_KEY}`
  //   );
  //   const data = await response.json();
  //   setWeatherData(data);
  //   console.log(data);
  // };


  // const fetchWeatherData = navigator.geolocation.getCurrentPosition(async (position) => {
  //   const { latitude, longitude } = position.coords;
  //   // const API_KEY = 'your_api_key_here';
  //   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  //   const response = await fetch(url);
  //   const weatherData = await response.json();
  //   setWeatherData(weatherData);
  // });
  // useEffect(() => {
  //   fetchWeatherData();
  // }, [fetchWeatherData]);
  // if (!weatherData) return <div>Loading...</div>;

  // const { name } = "weatherData";
  // const { temp } = "weatherData.main";
  // const { description, icon } = "weatherData.weather[0]";


  const [weather, setWeather] = useState(null);

  const [forecastWeather, setForecastWeather] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await getCurrentWeather(latitude, longitude)
        const weatherData = await response.json();
        // console.log(weatherData);
        // searchByCity(weatherData.name)
        setWeather(weatherData);
      });
    };

    fetchWeather();


    const fetchWeatherForeCast = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        await getWeatherForecast(latitude, longitude).then(res => res.json())
          .then((data) => {
            let forecast = [];
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
            setForecastWeather(arr)
          });
        //  const data = await res.json();
        // // console.log(weatherData);

        // let forecast = [];
        //     forecast = data.list.reduce((acc, obj) => {
        //         const date = new Date(obj.dt * 1000).toLocaleDateString();
        //         // const idNum = obj.item;
        //         if (!acc[date]) {
        //             acc[date] = [obj];
        //         } else {
        //             acc[date].push({ obj });
        //         }
        //         return acc;
        //     }, {});;

        //     const arr = Object.entries(forecast).map(([date, value]) => ({ date, value }));
        //     console.log(arr);
        //     // return arr;
        // console.log(res);
        // setForecastWeather(res);

        // console.log(res);
      });


    }

    fetchWeatherForeCast();

    // navigator.geolocation.getCurrentPosition(async (position) => {
    //   const { latitude, longitude } = position.coords;
    //   // const API_KEY = 'your_api_key_here';
    //   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    //   // const forCast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    //   const response = await fetch(url);
    //   const weatherData = await response.json();
    //   setWeather(weatherData);
    //   // console.log(weatherData.list);

    //   // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
    //   // fetch(forCast)
    //   //   .then(response => response.json())
    //   //   .then((data) => {
    //   //     let forecast = [];
    //   //     // let forecast1 = [];
    //   //     // let forecast2 = [];
    //   //     // let forecast3 = [];
    //   //     // let forecast4 = [];

    //   //     // for (let x = 0; x < data.list.length; x++) {
    //   //     //   const date1 = new Date(data.list[x].dt * 1000).toLocaleDateString();
    //   //     //   const date = new Date(data.list[x].dt * 1000).toLocaleDateString();
    //   //     //   const chdate = "";
    //   //     //   console.log(date1);
    //   //     //   for (let y = 0; y < data.list.length; y++) {
    //   //     //     const date2 = new Date(data.list[y].dt * 1000).toLocaleDateString();
    //   //     //     if (date1 !== date2) {

    //   //     //     }
    //   //     //   }

    //   //     // }

    //   //     forecast = data.list.reduce((acc, obj) => {
    //   //       const date = new Date(obj.dt * 1000).toLocaleDateString();
    //   //       // const idNum = obj.item;
    //   //       if (!acc[date]) {
    //   //         acc[date] = [obj];
    //   //       } else {
    //   //         acc[date].push({ obj });
    //   //       }
    //   //       return acc;
    //   //     }, {});;

    //   //     const arr = Object.entries(forecast).map(([date, value]) => ({ date, value }));
    //   //     console.log(arr);
    //   //     setForecastWeather(arr)
    //   //     // console.log(data.list);
    //   //   });

    // });

    // searchWeather
  }, []);


  const [searched, setsearched] = useState({
    name: "",
    date: "",
    temp: "",
    descript: ""
  });
  const [searchByCity, setsearchByCity] = useState("Soshanguve");

  async function searchWeather() {
    // For searching a city
    try {
      // const city = "soshanguve";
      await getWeatherByCity(searchByCity)
        .then(response => response.json())
        .then(data => {
          console.log(data);

          setsearched({
            name: data.name,
            date: data.date,
            temp: Math.ceil(data.main.temp - 273.15),
            descript: data.weather[0].description

          });
          document.getElementById("searched").style.display = 'block';
          // convert the weather from kelvin to Celsius
        })
        .catch(error => {
          alert(error);
        });
    } catch (error) {
      alert(error);
    }
  }


  if (!weather) return <div>Loading...</div>;

  // const { name } = weather;
  // const { temp } = weather.main;
  // const { description, icon } = weather.weather[0];


  // const { current, daily } = weather;



  // const [weather, setWeather] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     navigator.geolocation.getCurrentPosition(async position => {
  //       const { latitude, longitude } = position.coords;
  //       const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
  //       setWeather(res.data);
  //     });
  //   }

  //   fetchData();
  // }, []);

  // if (!weather) return <div>Loading...</div>;


  return (
    <div className="App">
      <div>
        <h1>{weather.name}</h1>
        <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
        <p>{weather.main.temp}°C</p>
        <p>{weather.weather[0].description}</p>

        <h2>Forecast:</h2>

        {forecastWeather.map((day, index) => (
          <div key={index}>
            <p>Date: {day.date}</p>
            <p>Temperature: {day.value[0].main.temp}°C</p>
            <p>Description: {day.value[0].weather[0].description}</p>
            <br /><br />
          </div>
        ))}

        <br /><br />
        {/* {searched.map((day, index) => ( */}
        {searched === [] ? null : <div id={'searched'}>
          {/* key={index} */}
          <h1>{searched.name}</h1>
          <p>Date: {searched.date}</p>
          <p>Temperature: {searched.temp}°C</p>
          <p>Description: {searched.descript}</p>
          <br /><br />
        </div>}
        {/* )) } */}

        <input type="text" placeholder='enter city' onChange={(event) => setsearchByCity(event.target.value)} />
        <br />
        <button onClick={searchWeather}>
          Search
        </button>

      </div>
      {/* 
      <div>
        <h2>Current weather:</h2>
        <p>Temperature: {weather.current.temp}°C</p>
        <p>Description: {weather.current.weather[0].description}</p>
        <h2>Forecast:</h2>
        {weather.daily.slice(1, 6).map(day => (
          <div key={day.dt}>
            <p>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>Temperature: {day.temp.day}°C</p>
            <p>Description: {day.weather[0].description}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default App;
