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
  const [preferredLocation, setPreferredLocation] = useState(null);

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

  useEffect(() => {
    const fetchPreferredLocation = async (preferredCity) => {
      try {
        const response = await axios.get(
          `/api/weather?lat=${preferredCity.lat}&lon=${preferredCity.long}`
        );
        setPreferredLocation(response.data.name);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (userData) {
      fetchPreferredLocation(userData.preferredLocation);
    }
  }, [userData]);

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
    <div className="flex flex-col-reverse md:flex-row items-center md:justify-around">
      <div className="flex flex-col justify-center items-center w-[80%] md:w-80 h-[100] md:h-auto md:flex-shrink-0">
        <h1 className="font-bold text-3xl py-8">Weather App</h1>
        <Search onSearchChange={onSearchChange} />
        <div className="flex justify-center items-center w-full h-80 md:h-auto bg-slate-200 rounded-md p-6 m-6">
          <Weather weatherData={weatherData} />
        </div>
      </div>
      <div className="w-[70%] md:w-80">
        {!userData ? (
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
        ) : (
          <div className="bg-slate-200 mt-4 overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Profile
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Username
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.username}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Preferred Location:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {preferredLocation}
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
