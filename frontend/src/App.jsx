import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`/api/weather?city=Toronto`);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{Math.round(weatherData.main.temp)} °C</p>
          <p>{weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
