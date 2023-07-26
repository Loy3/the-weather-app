import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





// import React, { useState, useEffect } from "react";

// function WeatherApp() {
//   const [weatherData, setWeatherData] = useState(null);
//   const [city, setCity] = useState("");

//   const API_KEY = "YOUR_API_KEY_HERE";
//   const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((data) => setWeatherData(data));
//   }, [API_URL]);

//   return (
//     <div>
//       <input
//         type="text"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />
//       {weatherData ? (
//         <div>
//           <h2>{weatherData.name}</h2>
//           <p>{weatherData.main.temp} °C</p>
//           <p>{weatherData.weather[0].description}</p>
//         </div>
//       ) : (
//         <p>Enter a city to get weather data</p>
//       )}
//     </div>
//   );
// }

// export default WeatherApp;