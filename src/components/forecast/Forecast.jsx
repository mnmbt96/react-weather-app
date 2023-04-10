import React, { useState, useEffect } from "react";
import DailyForecast from "../dailyForecast/DailyForecast";
import HourlyForecast from "../hourlyForecast/HourlyForecast";
import OtherWeatherInfo from "../otherWeatherInfo/OtherWeatherInfo";
import { BiSidebar } from "react-icons/bi";
import "./forecast.css";

const Forecast = ({
  weather,
  sidebarOpen,
  setSidebarOpen,
  windowWidth,
  handleUnitsChange,
}) => {
  let margin;
  let filter;
  if (windowWidth > 550 && sidebarOpen) {
    margin = "0 0 0 30vw";
  } else if (windowWidth <= 550 && !sidebarOpen) {
    margin = "0";
  } else if (windowWidth <= 550 && sidebarOpen) {
    filter = "blur(1.5px)";
  }

  return (
    <div
      className="forecast-container"
      style={{ margin: margin, filter: sidebarOpen ? filter : "" }}
    >
      {sidebarOpen ? (
        <div className="units">
          <a className="unit" name="metric" onClick={handleUnitsChange}>
            ℃
          </a>
          <span>|</span>
          <a className="unit" name="imperial" onClick={handleUnitsChange}>
            ℉
          </a>
        </div>
      ) : null}
      <div className="current-info">
        {sidebarOpen ? null : (
          <div className="icons">
            <BiSidebar
              className="sidebar-open"
              onClick={() => setSidebarOpen(true)}
            />
            <div className="units">
              <a className="unit" name="metric" onClick={handleUnitsChange}>
                ℃
              </a>
              <span>|</span>
              <a className="unit" name="imperial" onClick={handleUnitsChange}>
                ℉
              </a>
            </div>
          </div>
        )}
        <h2 className="city-name">{weather.name}</h2>
        <h2 className="current-temp">{weather.temp.toFixed()}º</h2>
        <p className="current-condition">{weather.details}</p>
        <p className="temp-high-low">
          H:{weather.temp_max.toFixed()} L:{weather.temp_min.toFixed()}
        </p>
      </div>
      <HourlyForecast hourly={weather.hourly} />
      <div className="weekly-otherInfo-container">
        <DailyForecast daily={weather.daily} />
        <OtherWeatherInfo weather={weather} />
      </div>
    </div>
  );
};

export default Forecast;
