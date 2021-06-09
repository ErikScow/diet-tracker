import React from "react";

import Nav from "../common/Nav/Nav";

import { Grid } from "@material-ui/core";

function About(props) {
  return (
    <div className="about">
      <h2>How are Calculations Made?</h2>
      <h3>Calorie Suggestion</h3>
      <p>
        The calorie suggestion is calculated by using a variety of factors.
        Using weight, gender, age, and height, a user's basal metabolic rate is
        calculated. The basal metabolic rate is an estimate of the amount of
        calories that your body burns in a day just to function. Desired weight
        loss is taken from the user in pounds per week and converted to a daily
        calorie deficit in calories per day using the rate of 3500 calories = 1
        lb. Using the basal metabolic rate, activity level (calories burned per
        day), and calorie deficit (in calories per day), a calorie suggestion is
        calculated using the formula: (Suggestion) = (BMR) + (Daily Burned) -
        (Daily Deficit).
      </p>
      <h2>About this Project</h2>
      <h3>Purpose</h3>
      <p>
        This application is intended to be an easy and convenient way to keep
        track of your daily caloric intake and weight.
      </p>
      <h3>Technologies Used</h3>
      <h4>Front End</h4>
      <p>
        The front end of this application serves as an interface to the CRUD
        operations that make up the app. API calls are fired to the backend
        using asynchronous redux. Various API calls and corresponding state
        updates are fired simultaneously throughout use to allow for a seamless
        user experience.
      </p>
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>Material UI</li>
        <li>Victory JS (chart library)</li>
      </ul>

      <h4>Back End</h4>
      <p>
        The back end of this project is a REST like API built using Node and
        Express on top of a PostgreSQL database. There are three relational data
        tables, one for users, one for daily data, one for calorie events.
      </p>
      <ul>
        <li>Node</li>
        <li>Express</li>
        <li>PostgreSQL</li>
      </ul>

      <h2>Future Improvements</h2>
      <h3>Food API</h3>
      <p>
        The biggest improvement I want to make is implementing some kind of
        nutrition API that will serve as a database of foods, such that a user
        doesn't have to manually enter calories eaten and a note saying what
        they ate. Instead, a user would be able to search for a food and
        immediately add it to their day.
      </p>
      <h3>Better Interface</h3>
      <p>
        My role is a web developer, not a designer, so I am unfortunately not
        trained in web design techniques and best practices. While I have
        certainly done my best to make this application look and feel
        professional, one of my biggest areas of improvement for this project
        and as a developer is in design.
      </p>
    </div>
  );
}

export default About;
