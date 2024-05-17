import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import Search from "./components/Search";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: 43.7001,
    lon: -79.4163,
  });

  //fetching the current weather using the lat and lon
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `/api/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`
        );
        setWeatherData(response.data);
        updateBackground(response.data.weather[0].icon);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [coordinates]);

  //setting new coordinates given by the selected city in the search, triggering a re-render and updating the weather
  const onSearchChange = (selectedCity) => {
    setCoordinates({
      lat: selectedCity.latitude,
      lon: selectedCity.longitude,
    });
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center w-80 h-[100vh] flex-col">
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
