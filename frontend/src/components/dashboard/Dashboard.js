import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Divider, Grid, Button } from "@material-ui/core";
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
import { toggleUnderRecommended, updateUserCall } from "../../state/userSlice";
import AddCaloriesForm from "./AddCaloriesForm";
import SubtractCaloriesForm from "./SubtractCaloriesForm";
import UpdateForm from "../userInfo/updateForm";
import { Fragment } from "react";

function Dashboard(props) {
  const dispatch = useDispatch();

  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);

  const userId = useSelector((state) => state.userSlice.userInfo.id);
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const calorie_suggestion = useSelector(
    (state) => state.dailySlice.dailyInfo.calorie_suggestion
  );
  const underRecommended = useSelector((state) => {
    console.log(state);
    return state.userSlice.underRecommended;
  });
  const gender = useSelector((state) => state.userSlice.userInfo.gender);

  const date = formattedDate();

  useEffect(() => {
    const defaultDay = createDayObject(date);
    dispatch(updateFormattedDate(date));
    //the default day object is passed to redux to be used in case no day has yet been created
    dispatch(getTodayCall(userId, date, defaultDay));
    if (gender === "male" && calorie_suggestion < 1500 && !underRecommended) {
      dispatch(toggleUnderRecommended());
    }
    if (gender === "female" && calorie_suggestion < 1200 && !underRecommended) {
      dispatch(toggleUnderRecommended());
    }
    if (gender === "male" && calorie_suggestion >= 1500 && underRecommended) {
      dispatch(toggleUnderRecommended());
    }
    if (gender === "female" && calorie_suggestion >= 1200 && underRecommended) {
      dispatch(toggleUnderRecommended());
    }
  }, [calorie_suggestion]);

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

  console.log(underRecommended, gender, userId, userInfo);

  return (
    <div className="dashboard">
      {underRecommended && (
        <div className="warning">
          Your current selections for Average Activity and Desired Loss result
          in a calorie suggestion below the recommended
          {gender === "male" ? " 1500" : " 1200"} for typical
          {gender === "male" ? " men" : " women"} at your weight. To fix this,
          please either decrease your Desired Loss, or increase your Average
          Activity.
        </div>
      )}

      <div className="top">
        <div className="section calorie-meter">
          <CalorieMeter />
        </div>

        <div className="section update-form-container">
          {displayUpdateForm ? (
            <div className="update-and-button-container">
              <div className="div-button-container">
                <div className="div-button" onClick={toggleUpdateForm}>
                  <span>CLOSE</span>
                  <ArrowDropUpIcon />
                </div>
              </div>

              <UpdateForm />
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
      </div>
      <div className="bottom">
        <div className="section events-form-container">
          <AddCaloriesForm />
          <SubtractCaloriesForm />
        </div>
        <div className="section event-list-container">
          <EventsList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
