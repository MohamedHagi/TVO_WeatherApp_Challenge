import React from "react";

export default function Weather({ weatherData }) {
  return (
    <>
      {weatherData && (
        <div className="flex flex-col items-center  rounded-md w-full  text-gray-800">
          <div className="text-center mb-4">
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
            className="mb-2"
          />
          <div className="mb-2 text-3xl font-semibold">
            {Math.round(weatherData.main.temp)}°C
          </div>
          <p className="capitalize mb-4">
            {weatherData.weather[0].description}
          </p>
          <div className="flex justify-between w-full mt-4">
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold">Feels Like</p>
              <p className="text-sm">
                {" "}
                {Math.round(weatherData.main.feels_like)}°C
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold">Wind</p>
              <p className="text-sm">{weatherData.wind.speed} m/s</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold">Humidity</p>
              <p className="text-sm">{weatherData.main.humidity}%</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
