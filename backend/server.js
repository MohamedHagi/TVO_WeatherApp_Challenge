const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connecting to MongoDB

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

// Defining the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  preferredLocation: {
    lat: { type: String, required: true },
    long: { type: String, required: true },
  },
});

//  Creating a user model
const User = mongoose.model("User", userSchema);

//Adding lat and long as parameters for the API request
app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

//Added route to fetch cities from external API
app.get("/api/cities", async (req, res) => {
  const { namePrefix } = req.query;
  try {
    const options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      params: {
        minPopulation: "100000",
        namePrefix: namePrefix,
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    const cities = response.data;

    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Error fetching cities" });
  }
});

//Endpoint to accept users name, email, latitude, and longitude
app.post("/api/signup", async (req, res) => {
  const { username, email, preferredLocation } = req.body;

  if (
    !username ||
    !email ||
    !preferredLocation.lat ||
    !preferredLocation.long
  ) {
    return res
      .status(400)
      .json({ error: "Name, email, latitude, and longitude are required" });
  }

  try {
    const newUser = new User({
      username,
      email,
      preferredLocation,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User data saved successfully", user: newUser });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error for unique fields
      res.status(409).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Error saving user data" });
    }
  }
});

app.get("/api/users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Error retrieving users" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
