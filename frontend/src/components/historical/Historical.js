import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDailyDataCall } from "../../state/dailySlice";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import Nav from "../common/Nav/Nav";
import Graph from "./Graph";
import GraphContainer from "./GraphContainer";

const useStyles = makeStyles((theme) => ({
  graphContainer: {
    margin: "35px 0",
  },
  graphTitle: {
    marginBottom: "20px",
  },
}));

function Historical(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userSlice.userInfo.id);
  const historicalData = useSelector((state) => state.dailySlice.allDailyInfo);

  const [weightData, setWeightData] = useState([
    {
      x: new Date(),
      y: 0,
      type: "Weight (lbs)",
    },
  ]);
  const [calorieTotalData, setCalorieTotalData] = useState([
    {
      x: new Date(),
      y: 0,
      type: "Total Cal",
    },
  ]);
  const [calorieSuggestionData, setCalorieSuggestionData] = useState([
    {
      x: new Date(),
      y: 0,
      type: "Suggested Cal",
    },
  ]);
  const [BMRData, setBMRData] = useState([
    {
      x: new Date(),
      y: 0,
      type: "BMR",
    },
  ]);

  useEffect(() => {
    dispatch(getAllDailyDataCall(userId));
  }, []);

  useEffect(() => {
    const reformat = [];
    historicalData.forEach((day) => {
      const year = Number(day.date.slice(0, 4));
      const month = Number(day.date.slice(4, 6) - 1);
      const date = Number(day.date.slice(6));
      const dateObject = new Date(year, month, date);
      const withDateObject = {
        ...day,
        date: dateObject,
      };
      reformat.push(withDateObject);
    });

    const formatWeight = [];
    reformat.forEach((day) => {
      formatWeight.push({
        y: day.weight,
        x: day.date,
        type: "Weight (lbs)",
      });
    });
    setWeightData(formatWeight);

    const formatCalorieTotal = [];
    reformat.forEach((day) => {
      formatCalorieTotal.push({
        y: day.calorie_total,
        x: day.date,
        type: "Total Cal",
      });
    });
    setCalorieTotalData(formatCalorieTotal);

    const formatCalorieSuggestion = [];
    reformat.forEach((day) => {
      formatCalorieSuggestion.push({
        y: day.calorie_suggestion,
        x: day.date,
        type: "Suggested Cal",
      });
    });
    setCalorieSuggestionData(formatCalorieSuggestion);

    const formatBMR = [];
    reformat.forEach((day) => {
      formatBMR.push({
        y: day.bmr,
        x: day.date,
        type: "BMR",
      });
    });
    setBMRData(formatBMR);
  }, [historicalData]);

  return (
    <div className="historical">
      <h3>Weight</h3>
      <GraphContainer data={weightData} />
      <h3>Calorie Total</h3>
      <GraphContainer data={calorieTotalData} />
      <h3>Calorie Suggestion</h3>
      <GraphContainer data={calorieSuggestionData} />

      <h3>Basal Metabolic Rate</h3>
      <GraphContainer data={BMRData} />
    </div>
  );
}

export default Historical;
