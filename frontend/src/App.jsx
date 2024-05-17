import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: 43.65107,
    lon: -79.347015,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `/api/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [coordinates]);

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
