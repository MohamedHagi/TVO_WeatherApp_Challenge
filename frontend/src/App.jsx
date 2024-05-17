import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import Search from "./components/Search";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: 43.7001,
    lon: -79.4163,
  }); //using toronto as default, with more time could use geolocationAPI to get users location on first load

  const [userData, setUserData] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

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

  const handleSignin = async (email) => {
    try {
      const response = await axios.post("/api/signin", { email });
      const userDataFromResponse = response.data.user;
      setUserData(userDataFromResponse);
      setCoordinates((prevCoordinates) => ({
        lat: userDataFromResponse.preferredLocation.lat,
        lon: userDataFromResponse.preferredLocation.long,
      }));
    } catch (error) {
      throw error;
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
        {!userData && (
          <div>
            {!showSignup ? (
              <Signin
                handleSignin={handleSignin}
                setShowSignup={setShowSignup}
              />
            ) : (
              <Signup
                handleSignup={handleSignup}
                setShowSignup={setShowSignup}
              />
            )}
          </div>
        )}

        {userData && (
          <div class="bg-slate-200 mt-4 overflow-hidden shadow rounded-lg border">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                User Profile
              </h3>
            </div>
            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Username</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.username}
                  </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Preferred Location
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {weatherData.name}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
