import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Search({ onSearchChange }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const handleOnChange = (event, newValue) => {
    if (newValue) {
      setInputValue(`${newValue.name}, ${newValue.countryCode}`);
      onSearchChange(newValue);
    }
  };

  return (
    <div>
      <Autocomplete
        freeSolo
        options={options}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={handleOnChange}
        renderInput={(params) => (
          <TextField {...params} label="Search for a city" variant="outlined" />
        )}
      />
    </div>
  );
}
