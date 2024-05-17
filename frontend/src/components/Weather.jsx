import React from "react";

export default function Weather({ weatherData }) {
  return (
    <>
      {weatherData && (
        <div className="flex flex-col items-center p-8 rounded-md w-80 sm:px-12 text-gray-800">
          <div className="text-center">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold">{weatherData.name}</h2>
              <img
                src={`https://flagcdn.com/w20/${weatherData.sys.country.toLowerCase()}.png`}
                alt={`${weatherData.sys.country} flag`}
              />
            </div>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <div className="mb-2 text-3xl font-semibold">
            {Math.round(weatherData.main.temp)}°C
          </div>
          <p className="dark:text-gray-600 capitalize">
            {weatherData.weather[0].description}
          </p>
        </div>
      )}
    </>
  );
}
