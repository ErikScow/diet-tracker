import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Slider,
  TextField,
  FormHelperText,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClearIcon from "@material-ui/icons/Clear";
import * as yup from "yup";

import Event from "../dashboard/Event";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import {
  calculateBmr,
  calculateSuggestion,
} from "../../utils/calorieCalculations";
import { Fragment } from "react";

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
  red: {
    color: "red",
  },
  button: {
    padding: "0",
  },
  redText: {
    color: "red",
  },
  container: {
    marginBottom: "20px;",
  },
}));

const validationSchemaAdd = yup.object().shape({
  note: yup.string(),
  magnitude: yup.number().typeError("Must be a number").required("Required"),
});

const validationSchemaSub = yup.object().shape({
  note: yup.string(),
  magnitude: yup.number().typeError("Must be a number").required("Required"),
});

function Welcome(props) {
  const classes = useStyles();
  //push to dashboard if logged in
  const history = useHistory();
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const token = localStorage.getItem("token");
      if (token) {
        history.push("/dashboard");
      }
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  //handler functions
  const toggleUpdateForm = () => {
    setDisplayUpdateForm((prevState) => !prevState);
  };

  const handleWeightChange = (e, newVal) => {
    setState((prevState) => {
      {
        return { ...prevState, weight: newVal };
      }
    });
  };
  const handleActivityChange = (e, newVal) => {
    setState((prevState) => {
      {
        return { ...prevState, activity: newVal };
      }
    });
  };
  const handleDesiredChange = (e, newVal) => {
    setState((prevState) => {
      {
        return { ...prevState, desiredLoss: newVal };
      }
    });
  };

  const handleChangeAdd = (e) => {
    yup
      .reach(validationSchemaAdd, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setValidationErrorsAdd({
          ...validationErrorsAdd,
          [e.target.name]: null,
        });
        setValidationErrorsCheckAdd({
          ...validationErrorsCheckAdd,
          [e.target.name]: false,
        });
      })
      .catch((notValid) => {
        setValidationErrorsAdd({
          ...validationErrorsAdd,
          [e.target.name]: notValid.errors[0],
        });
        setValidationErrorsCheckAdd({
          ...validationErrorsCheckAdd,
          [e.target.name]: true,
        });
      });
    setAddForm({
      ...addForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitAdd = (e) => {
    e.preventDefault();

    if (!isValidAdd) {
      setValidationErrorsAdd({
        ...validationErrorsAdd,
        incomplete: "Please complete all of the required fields to submit!",
      });
    } else {
      setValidationErrorsAdd({
        ...validationErrorsAdd,
        incomplete: null,
      });
      setState((prevState) => {
        {
          return {
            ...prevState,
            calorieTotal:
              Number(prevState.calorieTotal) + Number(addForm.magnitude),
            eventList: [
              ...prevState.eventList,
              {
                id: new Date(),
                note: addForm.note,
                magnitude: addForm.magnitude,
                positive: true,
              },
            ],
          };
        }
      });
      setAddForm({
        magnitude: "",
        note: "",
        positive: true,
      });
    }
  };

  const handleChangeSub = (e) => {
    yup
      .reach(validationSchemaSub, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setValidationErrorsSub({
          ...validationErrorsSub,
          [e.target.name]: null,
        });
        setValidationErrorsCheckSub({
          ...validationErrorsCheckSub,
          [e.target.name]: false,
        });
      })
      .catch((notValid) => {
        setValidationErrorsSub({
          ...validationErrorsSub,
          [e.target.name]: notValid.errors[0],
        });
        setValidationErrorsCheckSub({
          ...validationErrorsCheckSub,
          [e.target.name]: true,
        });
      });
    setSubForm({
      ...subForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitSub = (e) => {
    e.preventDefault();

    if (!isValidSub) {
      setValidationErrorsSub({
        ...validationErrorsSub,
        incomplete: "Please complete all of the required fields to submit!",
      });
    } else {
      setValidationErrorsAdd({
        ...validationErrorsSub,
        incomplete: null,
      });
      setState((prevState) => {
        {
          return {
            ...prevState,
            calorieTotal:
              Number(prevState.calorieTotal) - Number(subForm.magnitude),
            eventList: [
              ...prevState.eventList,
              {
                id: new Date(),
                note: subForm.note,
                magnitude: subForm.magnitude,
                positive: false,
              },
            ],
          };
        }
      });
      setSubForm({
        magnitude: "",
        note: "",
        positive: false,
      });
    }
  };

  //isolated state for demo application

  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
  const [state, setState] = useState({
    calorieTotal: 0,
    calorieSuggestion: 0,

    weight: 200,

    activity: 250,
    desiredLoss: 1.5,

    underRecommended: false,

    eventList: [],
  });
  const [addForm, setAddForm] = useState({
    note: "",
    magnitude: "",
    positive: true,
  });
  const [subForm, setSubForm] = useState({
    magnitude: "",
    note: "",
    positive: false,
  });
  const [validationErrorsAdd, setValidationErrorsAdd] = useState({});
  const [validationErrorsCheckAdd, setValidationErrorsCheckAdd] = useState({});
  const [isValidAdd, setIsValidAdd] = useState(false);
  const [validationErrorsSub, setValidationErrorsSub] = useState({});
  const [validationErrorsCheckSub, setValidationErrorsCheckSub] = useState({});
  const [isValidSub, setIsValidSub] = useState(false);

  useEffect(() => {
    const bmr = calculateBmr("male", state.weight, 70, 25);
    const suggestion = calculateSuggestion(
      bmr,
      state.activity,
      state.desiredLoss
    );
    let under = false;
    if (suggestion < 1500) {
      under = true;
    }
    const updateData = {
      bmr: bmr,
      calorieSuggestion: suggestion,
      underRecommended: under,
    };
    setState((prevState) => {
      return { ...prevState, ...updateData };
    });
  }, [state.weight, state.activity, state.desiredLoss]);

  useEffect(() => {
    validationSchemaAdd.isValid(addForm).then((isValid) => {
      setIsValidAdd(isValid);
    });
  }, [addForm]);

  useEffect(() => {
    validationSchemaSub.isValid(subForm).then((isValid) => {
      setIsValidSub(isValid);
    });
  }, [subForm]);

  return (
    <Fragment>
      <h2 className="demo-header">Demo for a 5'10" Male</h2>
      <div className="demo-container">
        {state.underRecommended && (
          <div className="warning">
            Your current selections for Average Activity and Desired Loss result
            in a calorie suggestion below the recommended 1500 for typical
            please either decrease your Desired Loss, or increase your Average
            Activity.
          </div>
        )}
        <div className="demo-meter-container">
          <CircularProgressbarWithChildren
            value={state.calorieTotal}
            maxValue={state.calorieSuggestion}
            strokeWidth={5}
            styles={buildStyles({
              strokeLinecap: "butt",
              pathColor: "#3f51b5",
            })}
          >
            <div className="calorie-meter-container">
              <p>{state.calorieTotal}</p>
              <hr className="divide" />
              <p className={state.underRecommended ? "not-good" : ""}>
                {state.calorieSuggestion}
              </p>
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div className="demo-user-info-container">
          {displayUpdateForm ? (
            <div className="update-and-button-container">
              <div className="div-button-container">
                <div className="div-button" onClick={toggleUpdateForm}>
                  <span>CLOSE</span>
                  <ArrowDropUpIcon />
                </div>
              </div>
              <div className="slider-container">
                <p>Weight: {state.weight} lbs</p>

                <Slider
                  value={state.weight}
                  min={0}
                  max={400}
                  step={1}
                  onChange={handleWeightChange}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 100, label: "100" },
                    { value: 200, label: "200" },
                    { value: 300, label: "300" },
                    { value: 400, label: "400" },
                  ]}
                  className="slider input"
                />
              </div>
              <div className="slider-container">
                <p>Average Activity: {state.activity} cal / day</p>
                <Slider
                  value={state.activity}
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
                  className="slider"
                />
              </div>
              <div className="slider-container">
                <p>Desired Loss: {state.desiredLoss} lbs / week</p>

                <Slider
                  value={state.desiredLoss}
                  min={0}
                  max={2.0}
                  step={0.1}
                  onChange={handleDesiredChange}
                  marks={[
                    { value: 0, label: "0.0" },
                    { value: 0.5, label: "0.5" },
                    { value: 1.0, label: "1.0" },
                    { value: 1.5, label: "1.5" },
                    { value: 2.0, label: "2.0" },
                  ]}
                  className="slider"
                />
              </div>
            </div>
          ) : (
            <div className="div-button-container">
              <div className="div-button" onClick={toggleUpdateForm}>
                <span>USER SETTINGS</span>
                <ArrowDropDownIcon />
              </div>
            </div>
          )}
        </div>
        <div className="demo-calorie-event-form">
          <p className="event-form-label">Add Calories</p>
          <TextField
            label="Description"
            variant="outlined"
            error={validationErrorsCheckAdd.note}
            size="small"
            fullWidth={true}
            className={classes.topInputField}
            name="note"
            value={addForm.note}
            onChange={handleChangeAdd}
          />
          <TextField
            label="Calories"
            variant="outlined"
            error={validationErrorsCheckAdd.magnitude}
            helperText={validationErrorsAdd.magnitude}
            size="small"
            fullWidth={true}
            name="magnitude"
            value={addForm.magnitude}
            onChange={handleChangeAdd}
          />
          {validationErrorsAdd.incomplete ? (
            <FormHelperText className={classes.formError} error>
              {validationErrorsAdd.incomplete}
            </FormHelperText>
          ) : null}
          <div className="event-form-button-container">
            <Button variant="outlined" type="button" onClick={handleSubmitAdd}>
              Add
            </Button>
          </div>
          <p className="event-form-label">Add Exercise</p>

          <TextField
            label="Description"
            variant="outlined"
            error={validationErrorsCheckSub.note}
            size="small"
            fullWidth={true}
            className={classes.topInputField}
            name="note"
            value={subForm.note}
            onChange={handleChangeSub}
          />
          <TextField
            label="Burned Calories"
            variant="outlined"
            error={validationErrorsCheckSub.magnitude}
            helperText={validationErrorsSub.magnitude}
            size="small"
            fullWidth={true}
            name="magnitude"
            value={subForm.magnitude}
            onChange={handleChangeSub}
          />
          {validationErrorsSub.incomplete ? (
            <FormHelperText className={classes.formError} error>
              {validationErrorsSub.incomplete}
            </FormHelperText>
          ) : null}
          <div className="event-form-button-container">
            <Button variant="outlined" type="button" onClick={handleSubmitSub}>
              Add
            </Button>
          </div>
        </div>
        <div className="demo-calorie-event-list">
          {state.eventList.map((eventObject) => {
            return (
              <div className="event">
                <div className="amount">
                  {eventObject.positive ? (
                    <Typography type="p" className={classes.redText}>
                      + {eventObject.magnitude} Cal
                    </Typography>
                  ) : (
                    <Typography type="p" className={classes.redText}>
                      - {eventObject.magnitude} Cal
                    </Typography>
                  )}
                </div>

                <div className="description">
                  {" "}
                  <Typography type="p" className={classes.redText}>
                    {eventObject.note}
                  </Typography>
                </div>

                <div className="delete">
                  <IconButton
                    onClick={() => {
                      let newCalorieTotal;

                      if (eventObject.positive) {
                        newCalorieTotal =
                          Number(state.calorieTotal) -
                          Number(eventObject.magnitude);
                      } else {
                        newCalorieTotal =
                          Number(state.calorieTotal) +
                          Number(eventObject.magnitude);
                      }

                      let newEventList = [...state.eventList];

                      newEventList.pop(eventObject.id);

                      setState((prevState) => {
                        let newEventList = [...prevState.eventList];

                        newEventList.pop(eventObject.id);
                        return {
                          ...prevState,
                          calorieTotal: newCalorieTotal,
                          eventList: newEventList,
                        };
                      });
                    }}
                    className={classes.button}
                  >
                    <ClearIcon className={classes.red} />
                  </IconButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default Welcome;
