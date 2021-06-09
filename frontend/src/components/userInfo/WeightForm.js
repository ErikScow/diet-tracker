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
  const [sliderValue, setSliderValue] = useState(userInfo.weight);
  const [changeHandler] = useUpdateForm("WEIGHT", sliderValue);

  const handleChange = (e, updated) => {
    changeHandler();
    setSliderValue(updated);
  };

  const marks = [
    { value: 0, label: "0 lbs" },
    { value: 100, label: "100 lbs" },
    { value: 200, label: "200 lbs" },
    { value: 300, label: "300 lbs" },
    { value: 400, label: "400 lbs" },
  ];

  return (
    <div className="slider-container">
      <Typography align="left">Weight: {sliderValue} pounds</Typography>

      <Slider
        value={sliderValue}
        min={0}
        max={400}
        step={1}
        onChange={handleChange}
        marks={marks}
      />
    </div>
  );
}

export default ActivityForm;
