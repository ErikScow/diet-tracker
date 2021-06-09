import React from "react";

import WeightForm from "./WeightForm";
import ActivityForm from "./ActivityForm";
import DesiredLossForm from "./DesiredLossForm";
import { Grid } from "@material-ui/core";

function updateForm(props) {
  return (
    <div className="update-container">
      <WeightForm />
      <ActivityForm />
      <DesiredLossForm />
    </div>
  );
}

export default updateForm;
