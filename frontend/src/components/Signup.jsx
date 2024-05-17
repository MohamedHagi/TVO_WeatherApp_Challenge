import React, { useState } from "react";
import Search from "./Search";

function Signup({ handleSignup }) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    preferredLocation: {
      lat: "",
      lon: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(userData);
  };

  const onSearchChange = (selectedCity) => {
    setUserData((prevData) => ({
      ...prevData,
      preferredLocation: {
        lat: selectedCity.latitude,
        long: selectedCity.longitude,
      },
    }));
  };
  return (
    <div>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
        onSubmit={handleSubmit}
      >
        <label className="font-semibold text-xs" htmlFor="usernameField">
          Username
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
          id="usernameField"
          name="username"
          value={userData.username}
          onChange={handleChange}
          required
        />
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="email"
          id="emailField"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <Search onSearchChange={onSearchChange} />

        <button
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
