import React, { useState, useEffect, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import debounce from "lodash/debounce";

export default function Search({ onSearchChange }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({});

  //memoizing the result since this can be a expensive operation, debouncing also to prevent exceed rate limit per second
  const fetchCities = useMemo(
    () =>
      debounce(async (query) => {
        if (cache[query]) {
          setOptions(cache[query]);
        } else {
          setLoading(true);
          try {
            const response = await axios.get(`api/cities?namePrefix=${query}`);
            const cities = response.data.data;

            //Use a Map to remove duplicates based on city.name and city.country (there is duplicates in this api)
            const cityMap = new Map();
            cities.forEach((city) => {
              const key = `${city.name}-${city.countryCode}`;
              if (!cityMap.has(key)) {
                cityMap.set(key, {
                  ...city,
                  key: `${city.name}-${city.id}`,
                });
              }
            });

            //cities result without duplicates
            const uniqueCities = Array.from(cityMap.values());

            setOptions(uniqueCities);

            //caching cities that have already been searched to reduce requests
            setCache((prevCache) => ({
              ...prevCache,
              [query]: uniqueCities,
            }));
          } catch (error) {
            console.error("Error fetching cities:", error);
          } finally {
            setLoading(false);
          }
        }
      }, 600),
    [cache]
  );

  //fetching from api whenever the inputValue and fetchCities change
  useEffect(() => {
    if (inputValue) {
      fetchCities(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue, fetchCities]);

  //when a city is selected, the inputValue shows the city and the country code, along with passing the city object to the onSearchChange,
  //OnSearchChange will take the city that selected, and send that information to update the Weather

  const handleOnChange = (event, newValue) => {
    if (newValue) {
      setInputValue(`${newValue.name}, ${newValue.countryCode}`);
      onSearchChange(newValue);
    }
  };

  return (
    // using material UI autocomplete component that is using the different cities that are suggested by the prefix given to the api from the user input
    <div className=" px-7 py-2 rounded-md space-x-4 w-80">
      <Autocomplete
        freeSolo
        options={options}
        loading={loading}
        inputValue={inputValue}
        autoHighlight
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={handleOnChange}
        getOptionLabel={(option) => `${option.name}, ${option.countryCode}`}
        renderOption={(props, option) => (
          <li {...props} key={option.key}>
            {option.name}, {option.countryCode}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a city"
            className="bg-white"
            variant="outlined"
            name="preferredLocation"
            InputProps={{
              ...params.InputProps,
              onKeyDown: (e) => {
                if (e.key === "Enter" && options.length < 1) {
                  e.stopPropagation();
                }
              },
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
