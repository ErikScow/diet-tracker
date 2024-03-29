import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Box,
  InputLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Slider,
} from "@material-ui/core";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
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
}));

function FormTwo({
  fields,
  handleChange,
  handleActivityChange,
  handleDesiredLossChange,
  validationErrors,
  validationErrorsCheck,
  prevStep,
  isValid,
  handleSubmit,
  apiErrorMessage,
  registerLoading,
}) {
  const classes = useStyles();

  return (
    <div className="form-container">
      <h2>Register</h2>
      <div className="slider-container input">
        <p>Average Activity: {fields.activity_level} cal / day</p>
        <Slider
          className="slider"
          value={fields.activity_level}
          min={250}
          max={1000}
          step={10}
          onChange={handleActivityChange}
          marks={[
            { value: 250, label: "Low" },
            { value: 500, label: "Medium" },
            { value: 750, label: "High" },
            { value: 1000, label: "Extreme" },
          ]}
        />
      </div>

      <div className="slider-container input">
        <p>Desired Loss: {fields.desired_loss_rate} lbs / week</p>
        <Slider
          className="slider"
          value={fields.desired_loss_rate}
          min={0}
          max={2.0}
          step={0.1}
          onChange={handleDesiredLossChange}
          marks={[
            { value: 0, label: "0.0 lbs" },
            { value: 0.5, label: "0.5 lbs" },
            { value: 1.0, label: "1.0 lbs" },
            { value: 1.5, label: "1.5 lbs" },
            { value: 2.0, label: "2.0 lbs" },
          ]}
        />
      </div>

      <div className="radio input">
        <p>Gender</p>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={fields.gender}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="female"
            control={<Radio color="primary" />}
            label="Female"
          />
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label="Male"
          />
        </RadioGroup>
      </div>

      <TextField
        label="Weight (lbs)"
        variant="outlined"
        error={validationErrorsCheck.weight}
        helperText={validationErrors.weight}
        size="small"
        fullWidth={true}
        name="weight"
        value={fields.weight}
        onChange={handleChange}
        className="input"
      />

      <TextField
        label="Height (inches)"
        variant="outlined"
        error={validationErrorsCheck.height}
        helperText={validationErrors.height}
        size="small"
        fullWidth={true}
        name="height"
        value={fields.height}
        onChange={handleChange}
        className="input"
      />

      <TextField
        label="Birthday"
        variant="outlined"
        error={validationErrorsCheck.birth_date}
        helperText={validationErrors.birth_date}
        size="small"
        fullWidth={true}
        InputLabelProps={{
          shrink: true,
        }}
        type="date"
        name="birth_date"
        value={fields.birth_date}
        onChange={handleChange}
        className="input"
      />

      {validationErrors.incomplete ? (
        <FormHelperText className={classes.formError} error>
          {validationErrors.incomplete}
        </FormHelperText>
      ) : null}
      {apiErrorMessage ? (
        <FormHelperText className={classes.formError} error>
          {apiErrorMessage}
        </FormHelperText>
      ) : null}
      {registerLoading ? <LinearProgress /> : null}

      <div className="button-row">
        <Button variant="outlined" type="button" onClick={prevStep}>
          Back
        </Button>
        <Button
          disabled={!isValid}
          variant="outlined"
          type="button"
          onClick={handleSubmit}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

export default FormTwo;
