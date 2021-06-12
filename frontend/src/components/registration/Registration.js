import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Nav from "../common/Nav/Nav";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";

import { formatDateFromForm, formattedDate } from "../../utils/dateFormatting";
import { registerCall, updateApiRegisterError } from "../../state/userSlice";

const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Required"),
  password: yup
    .string()
    .required("Required")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Password should be 6-16 characters, at least one a-z, one A-Z, one 0-9, and one special characer."
    ),
  activity_level: yup.number("Required").required("Required"),
  desired_loss_rate: yup.number().required("Required"),
  manual_mode: yup.bool().required("Required"),
  weight: yup.number().typeError("Must be a number").required("Required"),
  height: yup.number().typeError("Must be a number").required("Required"),
  gender: yup.string().required("Required"),
  birth_date: yup.string().required("Required"),
});

function Registration() {
  const history = useHistory();
  const dispatch = useDispatch();

  const apiRegisterError = useSelector(
    (state) => state.userSlice.apiRegisterError
  );
  const registerLoading = useSelector(
    (state) => state.userSlice.registerLoading
  );

  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    activity_level: 250,
    desired_loss_rate: 1,
    manual_mode: false,
    birth_date: "2000-01-01",
    weight: "",
    height: "",
    gender: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [validationErrorsCheck, setValidationErrorsCheck] = useState({});
  const [isValid, setIsValid] = useState(false);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleActivityChange = (e, newValue) => {
    setFields((prevState) => {
      return { ...prevState, activity_level: newValue };
    });
  };

  const handleDesiredLossChange = (e, newValue) => {
    setFields((prevState) => {
      return { ...prevState, desired_loss_rate: newValue };
    });
  };

  const handleChange = (e) => {
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
    dispatch(updateApiRegisterError(null));
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedBirthDate = formatDateFromForm(fields.birth_date);
    const dataToSubmit = { ...fields, birth_date: formattedBirthDate };

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
        registerCall(
          dataToSubmit,
          { email: fields.email, password: fields.password },
          (token) => {
            localStorage.setItem("token", token);
            history.push("/dashboard");
          }
        )
      );
    }
    setValidationErrors({
      ...validationErrors,
      invalidDesired: null,
    });
  };

  useEffect(() => {
    validationSchema.isValid(fields).then((isValid) => {
      setIsValid(isValid);
    });
  }, [fields]);

  if (registerLoading) {
    return <div>Loading</div>;
  } else {
    switch (step) {
      case 1:
        return (
          <div>
            <FormOne
              fields={fields}
              nextStep={nextStep}
              handleChange={handleChange}
              validationErrors={validationErrors}
              validationErrorsCheck={validationErrorsCheck}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <FormTwo
              fields={fields}
              prevStep={prevStep}
              handleChange={handleChange}
              handleActivityChange={handleActivityChange}
              handleDesiredLossChange={handleDesiredLossChange}
              validationErrors={validationErrors}
              validationErrorsCheck={validationErrorsCheck}
              isValid={isValid}
              handleSubmit={handleSubmit}
              apiErrorMessage={apiRegisterError}
              registerLoading={registerLoading}
            />
          </div>
        );
    }
  }
}

export default Registration;
