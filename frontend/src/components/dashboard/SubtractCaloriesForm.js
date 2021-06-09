import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  FormHelperText,
  Button,
  Grid,
  Box,
  LinearProgress,
  InputLabel,
} from "@material-ui/core";

import { updateUserCall, updateUserUpdateError } from "../../state/userSlice";
import {
  calculateBmr,
  calculateSuggestion,
} from "../../utils/calorieCalculations";
import { updateDayCall } from "../../state/dailySlice";
import { addCalorieEventCall } from "../../state/eventsSlice";
import { Fragment } from "react";

const validationSchema = yup.object().shape({
  note: yup.string(),
  magnitude: yup.number().typeError("Must be a number").required("Required"),
});

const useStyles = makeStyles((theme) => ({
  formError: {
    padding: "0 15px",
  },
  button: {
    height: "50px",
    marginTop: "25px",
  },
  inputField: {
    margin: "15px",
  },
  topInputField: {
    marginBottom: "15px",
  },
  sectionLabel: {
    color: "#757575",
    textAlign: "left",
    margin: "10px",
  },
}));

function WeightForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = useSelector((state) => state.userSlice.userInfo.id);
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const date = useSelector((state) => state.dailySlice.formattedDate);
  const calorie_total = useSelector(
    (state) => state.dailySlice.dailyInfo.calorie_total
  );

  const [fields, setFields] = useState({
    magnitude: "",
    note: "",
    positive: false,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [validationErrorsCheck, setValidationErrorsCheck] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    e.persist();
    yup
      .reach(validationSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setValidationErrors({
          ...validationErrors,
          [e.target.name]: null,
        });
        setValidationErrorsCheck({
          ...validationErrorsCheck,
          [e.target.name]: false,
        });
      })
      .catch((notValid) => {
        setValidationErrors({
          ...validationErrors,
          [e.target.name]: notValid.errors[0],
        });
        setValidationErrorsCheck({
          ...validationErrorsCheck,
          [e.target.name]: true,
        });
      });
    dispatch(updateUserUpdateError(null));
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) {
      setValidationErrors({
        ...validationErrors,
        incomplete: "Please complete all of the required fields to submit!",
      });
    } else {
      setValidationErrors({
        ...validationErrors,
        incomplete: null,
      });
      const newTotal = Number(calorie_total) - Number(fields.magnitude);
      const newDateInfo = {
        calorie_total: newTotal,
      };
      setFields({
        magnitude: "",
        note: "",
        positive: false,
      });
      dispatch(addCalorieEventCall(userId, date, fields));
      dispatch(updateDayCall(userId, date, newDateInfo));
    }
  };

  useEffect(() => {
    validationSchema.isValid(fields).then((isValid) => {
      setIsValid(isValid);
    });
  }, [fields]);

  return (
    <Fragment>
      <Typography className={classes.sectionLabel}>
        Add Extra Calorie Burn (subtract calories)
      </Typography>

      <TextField
        label="Note"
        variant="outlined"
        error={validationErrorsCheck.note}
        size="small"
        fullWidth={true}
        className={classes.topInputField}
        name="note"
        value={fields.note}
        onChange={handleChange}
      />
      <TextField
        label="Calories"
        variant="outlined"
        error={validationErrorsCheck.magnitude}
        helperText={validationErrors.magnitude}
        size="small"
        fullWidth={true}
        name="magnitude"
        value={fields.magnitude}
        onChange={handleChange}
      />
      <Button
        className={classes.button}
        variant="outlined"
        type="button"
        onClick={handleSubmit}
      >
        Add
      </Button>

      {validationErrors.weight ? (
        <FormHelperText className={classes.formError} error>
          {validationErrors.weight}
        </FormHelperText>
      ) : null}
      {validationErrors.incomplete ? (
        <FormHelperText className={classes.formError} error>
          {validationErrors.incomplete}
        </FormHelperText>
      ) : null}
    </Fragment>
  );
}

export default WeightForm;
