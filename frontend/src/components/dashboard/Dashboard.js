import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Divider, Grid } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { formattedDate } from "../../utils/dateFormatting";
import {
  calculateBmr,
  calculateSuggestion,
} from "../../utils/calorieCalculations";

import Nav from "../common/Nav/Nav";
import CalorieMeter from "./CalorieMeter";
import EventsForm from "./EventsForm";
import EventsList from "./EventsList";
import {
  getTodayCall,
  updateDayCall,
  updateFormattedDate,
} from "../../state/dailySlice";
import { getCalorieEventsCall } from "../../state/eventsSlice";
import { updateUserCall } from "../../state/userSlice";
import AddCaloriesForm from "./AddCaloriesForm";
import SubtractCaloriesForm from "./SubtractCaloriesForm";
import UpdateForm from "../userInfo/updateForm";
import { Fragment } from "react";

function Dashboard(props) {
  const dispatch = useDispatch();

  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);

  const userId = useSelector((state) => state.userSlice.userInfo.id);
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const dailyData = useSelector((state) => state.dailySlice.dailyInfo);
  const currentDate = useSelector((state) => state.dailySlice.formattedDate);

  const date = formattedDate();

  useEffect(() => {
    const defaultDay = createDayObject(date);
    dispatch(updateFormattedDate(date));
    //the default day object is passed to redux to be used in case no day has yet been created
    dispatch(getTodayCall(userId, date, defaultDay));
  }, []);

  const toggleUpdateForm = () => {
    setDisplayUpdateForm((prevState) => !prevState);
  };

  const createDayObject = (date) => {
    const bmr = calculateBmr(
      userInfo.gender,
      userInfo.weight,
      userInfo.height,
      userInfo.age
    );
    const calorieSuggestion = calculateSuggestion(
      bmr,
      userInfo.activity_level,
      userInfo.desired_loss_rate
    );
    return {
      date: date,
      user_id: userId,
      calorie_total: 0,
      bmr: bmr,
      calorie_suggestion: calorieSuggestion,
      weight: userInfo.weight,
    };
  };

  return (
    <div>
      <CalorieMeter />
      {displayUpdateForm ? (
        <div className="update-and-button-container">
          <div className="div-button-container">
            <div className="div-button" onClick={toggleUpdateForm}>
              <span>Close</span>
              <ArrowDropUpIcon />
            </div>
          </div>

          <UpdateForm />
        </div>
      ) : (
        <div className="div-button-container">
          <div className="div-button" onClick={toggleUpdateForm}>
            <span>User Settings</span>
            <ArrowDropDownIcon />
          </div>
        </div>
      )}
      <AddCaloriesForm />
      <SubtractCaloriesForm />
      <EventsList />
    </div>
  );
}

export default Dashboard;
