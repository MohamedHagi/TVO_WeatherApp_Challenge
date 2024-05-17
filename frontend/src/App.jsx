import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";

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
      <Weather weatherData={weatherData} />
    </div>
  );
}

export default App;
