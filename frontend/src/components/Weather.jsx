import React from "react";

export default function Weather({ weatherData }) {
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
