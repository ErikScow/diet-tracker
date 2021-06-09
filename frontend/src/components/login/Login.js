import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormHelperText,
  Button,
  Grid,
  Box,
  LinearProgress,
} from "@material-ui/core";

import { loginCall, updateApiLoginError } from "../../state/userSlice";

import Nav from "../common/Nav/Nav";

const validationSchema = yup.object().shape({
  email: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const useStyles = makeStyles((theme) => ({
  formError: {
    padding: "0 15px",
  },
}));

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const apiLoginError = useSelector((state) => state.userSlice.apiLoginError);
  const loginLoading = useSelector((state) => state.userSlice.loginLoading);

  const [fields, setFields] = useState({
    email: "",
    password: "",
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
    dispatch(updateApiLoginError(null));
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
      dispatch(
        loginCall(fields, (token) => {
          localStorage.setItem("token", token);
          history.push("/dashboard");
        })
      );
    }
  };

  useEffect(() => {
    validationSchema.isValid(fields).then((isValid) => {
      setIsValid(isValid);
    });
  }, [fields]);

  return (
    <div className="form-container">
      <h2>Log In</h2>
      <TextField
        label="Email"
        variant="outlined"
        error={validationErrorsCheck.email}
        helperText={validationErrors.email}
        size="small"
        fullWidth={true}
        name="email"
        value={fields.email}
        onChange={handleChange}
        className="input"
      />
      <TextField
        label="Password"
        variant="outlined"
        error={validationErrorsCheck.password}
        helperText={validationErrors.password}
        size="small"
        fullWidth={true}
        type="password"
        name="password"
        value={fields.password}
        onChange={handleChange}
        className="input"
      />
      {validationErrors.incomplete ? (
        <FormHelperText className={classes.formError} error>
          {validationErrors.incomplete}
        </FormHelperText>
      ) : null}
      {apiLoginError ? (
        <FormHelperText className={classes.formError} error>
          {apiLoginError}
        </FormHelperText>
      ) : null}
      {loginLoading ? <LinearProgress /> : null}
      <Button variant="outlined" type="button" onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );
}

export default Login;
