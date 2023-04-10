import React from "react";
import { iconUrlFromCode } from "../../weatherData/weatherData";
import "./hourlyForecast.css";

const HourlyForecast = ({ hourly }) => {
  return (
    <div className="hourly-container">
      <p className="title">Hourly Forecast</p>
      <div className="hourly-forecast">
        {hourly.map((item, index) => (
          <div key={index} className="hourly-component">
            <p className="hour">{item.title}</p>
            <img src={iconUrlFromCode(item.icon)} className="weather" />
            <p className="temperature">{item.temp.toFixed()}º</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
