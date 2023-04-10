import React from "react";
import "./dailyForecast.css";
import { iconUrlFromCode } from "../../weatherData/weatherData";

const DailyForecast = ({ daily }) => {
  return (
    <div className="daily-container">
      <p className="title">5-day forecast</p>
      <div className="daily-forecast">
        {daily.map((item, index) => (
          <div key={index} className="daily">
            <p className="day">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              className="weather-condition"
            />
            <p className="temp-high-low">
              H:{item.temp_max.toFixed()}º L:{item.temp_min.toFixed()}º
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
