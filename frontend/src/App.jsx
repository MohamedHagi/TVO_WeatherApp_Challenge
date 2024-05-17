import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import Search from "./components/Search";
import Signup from "./components/Signup";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: 43.7001,
    lon: -79.4163,
  }); //using toronto as default, with more time could use geolocationAPI to get users location on first load

  const [userData, setUserData] = useState(null);
  const [showSignup, setShowSignup] = useState(true);

  //fetching the current weather using the lat and lon
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

  //setting new coordinates given by the selected city in the search, triggering a re-render and updating the weather
  const onSearchChange = (selectedCity) => {
    setCoordinates({
      lat: selectedCity.latitude,
      lon: selectedCity.longitude,
    });
  };

  const handleSignup = async (userData) => {
    try {
      const response = await axios.post("/api/signup", userData);
      console.log("User signed up successfully:", response.data);
      setUserData(response.data.user);
      setCoordinates({
        lat: userData.preferredLocation.lat,
        lon: userData.preferredLocation.long,
      });
      setShowSignup(false);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex justify-around">
      <div className="flex items-center justify-center w-80 h-[100] flex-col">
        <h1 className="font-bold text-3xl py-8">Weather App</h1>
        <Search onSearchChange={onSearchChange} />
        <div className="flex items-center justify-center w-80 h-80 bg-slate-200 rounded-md p-6 m-6">
          <Weather weatherData={weatherData} />
        </div>
      </div>
      <div>
        {showSignup ? (
          <Signup handleSignup={handleSignup} />
        ) : (
          <div>
            <h2 className="font-bold text-xl">User Information:</h2>
            {userData && (
              <div className="mt-4">
                <p>
                  <span className="font-semibold">Username:</span>{" "}
                  {userData.username}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {userData.email}
                </p>
                <p>
                  <span className="font-semibold">Preferred Location:</span>{" "}
                  {weatherData.name}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
