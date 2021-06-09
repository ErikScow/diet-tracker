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
  const [sliderValue, setSliderValue] = useState(userInfo.desired_loss_rate);
  const [changeHandler] = useUpdateForm("DESIRED_LOSS", sliderValue);

  const handleChange = (e, updated) => {
    changeHandler();
    setSliderValue(updated);
  };

  const marks = [
    { value: 0, label: "0.0" },
    { value: 0.5, label: "0.5" },
    { value: 1.0, label: "1.0" },
    { value: 1.5, label: "1.5" },
    { value: 2.0, label: "2.0" },
  ];

  return (
    <div className="slider-container">
      <p>Desired Loss: {sliderValue} lbs / week</p>

      <Slider
        value={sliderValue}
        min={0}
        max={2.0}
        step={0.1}
        onChange={handleChange}
        marks={marks}
        className="slider"
      />
    </div>
  );
}

export default ActivityForm;
