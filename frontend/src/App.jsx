import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import Search from "./components/Search";

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

  const onSearchChange = (selectedCity) => {
    setCoordinates({
      lat: selectedCity.latitude,
      lon: selectedCity.longitude,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-start w-full bg-slate-200 h-[100vh] flex-col">
        <h1 className="font-bold text-3xl py-8">Weather App</h1>
        <Search onSearchChange={onSearchChange} />
        <div className="flex items-center justify-center w-80 h-80 bg-slate-200 rounded-md p-6 m-6">
          <Weather weatherData={weatherData} />
        </div>
      </div>
    </div>
  );
}

export default App;
