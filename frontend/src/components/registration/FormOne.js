import React, { useState } from "react";

import {
  Container,
  FormGroup,
  InputLabel,
  TextField,
  FormHelperText,
  Button,
  Grid,
  Box,
} from "@material-ui/core";
import { Fragment } from "react";

function FormOne({
  fields,
  handleChange,
  validationErrors,
  validationErrorsCheck,
  nextStep,
}) {
  return (
    <Fragment>
      <TextField
        label="Name"
        variant="outlined"
        error={validationErrorsCheck.name}
        helperText={validationErrors.name}
        size="small"
        fullWidth={true}
        name="name"
        value={fields.name}
        onChange={handleChange}
      />

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
      />

      <Button variant="outlined" type="button" onClick={nextStep}>
        Next
      </Button>
    </Fragment>
  );
}

export default FormOne;
