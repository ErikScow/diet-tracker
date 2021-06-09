import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  updateUserCall,
  updateUserInfo,
  updateUserUpdateError,
} from "../state/userSlice";
import { updateDailyInfo, updateDayCall } from "../state/dailySlice";
import {
  calculateBmr,
  calculateSuggestion,
} from "../utils/calorieCalculations";

const useUpdateForm = (type, currentVal) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userSlice.userInfo.id);
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const date = useSelector((state) => state.dailySlice.formattedDate);

  let bmr;
  let calorieSuggestion;
  let newDayInfo;
  let updatedField;
  const changeHandler = () => {
    if (type === "WEIGHT") {
      updatedField = { weight: currentVal };
      bmr = calculateBmr(
        userInfo.gender,
        currentVal,
        userInfo.height,
        userInfo.age
      );
      calorieSuggestion = calculateSuggestion(
        bmr,
        userInfo.activity_level,
        userInfo.desired_loss_rate
      );
      newDayInfo = {
        weight: Number(currentVal),
        bmr: bmr,
        calorie_suggestion: calorieSuggestion,
      };
    }
    if (type === "ACTIVITY") {
      updatedField = { activity_level: currentVal };
      bmr = calculateBmr(
        userInfo.gender,
        userInfo.weight,
        userInfo.height,
        userInfo.age
      );
      calorieSuggestion = calculateSuggestion(
        bmr,
        currentVal,
        userInfo.desired_loss_rate
      );
      newDayInfo = {
        activity_level: currentVal,
        bmr: bmr,
        calorie_suggestion: calorieSuggestion,
      };
    }
    if (type === "DESIRED_LOSS") {
      updatedField = { desired_loss_rate: currentVal };
      bmr = calculateBmr(
        userInfo.gender,
        userInfo.weight,
        userInfo.height,
        userInfo.age
      );
      calorieSuggestion = calculateSuggestion(
        bmr,
        userInfo.activity_level,
        currentVal
      );
      newDayInfo = {
        desired_loss_rate: currentVal,
        bmr: bmr,
        calorie_suggestion: calorieSuggestion,
      };
    }
    dispatch(updateUserInfo(updatedField));
    dispatch(updateDailyInfo(newDayInfo));
  };

  useEffect(() => {
    const timer = setTimeout(
      () => {
        dispatch(updateUserCall(userId, updatedField));
        dispatch(updateDayCall(userId, date, newDayInfo));
      },

      500
    );
    return () => {
      clearTimeout(timer);
    };
  }, [currentVal]);

  return [changeHandler];
};

export default useUpdateForm;
