import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import useUpdateForm from "../../hooks/useUpdateForm";

import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormHelperText,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    width: "200px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    textAlign: "left",
  },
  selectOption: {
    textAlign: "left",
    whiteSpace: "normal",
  },
  formError: {
    padding: "0 15px",
  },
  formUpdated: {
    padding: "0 10px",
    color: "limegreen",
  },
}));

function ActivityForm() {
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState(userInfo.activity_level);
  const [changeHandler] = useUpdateForm("ACTIVITY", sliderValue);

  const handleChange = (e, updated) => {
    changeHandler();
    setSliderValue(updated);
  };

  const marks = [
    { value: 250, label: "Low" },
    { value: 500, label: "Medium" },
    { value: 750, label: "High" },
    { value: 1000, label: "Extreme" },
  ];

  return (
    <div className="slider-container">
      <p>Average Activity: {sliderValue} cal / day</p>
      <Slider
        value={sliderValue}
        min={250}
        max={1000}
        step={10}
        onChange={handleChange}
        marks={marks}
        className="slider"
      />
    </div>
  );
}

export default ActivityForm;
