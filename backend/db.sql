-- RUN THIS FIRST TO CREATE DATABASE

CREATE DATABASE diet_tracker;

-- AFTERWARDS CONNECT TO THE DATABASE AND RUN THIS TO CREATE THE TABLES

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(1200) NOT NULL,
    activity_level FLOAT,
    desired_loss_rate FLOAT,
    manual_mode BOOLEAN NOT NULL,
    birth_date VARCHAR(8) NOT NULL,
    weight FLOAT NOT NULL,
    height FLOAT NOT NULL,
    gender VARCHAR(6) NOT NULL
);

CREATE TABLE daily_data(
    id SERIAL PRIMARY KEY,
    date VARCHAR(8),
    calorie_total FLOAT,
    weight FLOAT,
    bmr FLOAT,
    calorie_suggestion FLOAT,
    positive BOOLEAN,
    user_id INTEGER REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE calorie_events(
    id SERIAL PRIMARY KEY,
    note VARCHAR(255),
    magnitude FLOAT,
    positive BOOLEAN,
    day_id INTEGER REFERENCES daily_data(id)
        ON DELETE CASCADE
);