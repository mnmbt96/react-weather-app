import React from "react";
import { formatToLocalTime } from "../../weatherData/weatherData";
import "./sidebarItem.css";

const SidebarItem = ({ wt, index, setQuery, setSidebarOpen, windowWidth }) => {
  const weather = wt.data;

  const handleClick = () => {
    setQuery({ q: weather.name });

    if (windowWidth <= 550) setSidebarOpen(false);
  };
  return (
    <div className="sidebar-item" key={index} onClick={handleClick}>
      <div className="locations-time-weather">
        <h6 className="location">{weather.name}</h6>
        <p className="localtime">
          {formatToLocalTime(weather.dt, weather.timezone, "hh:mm a")}
        </p>
        <p className="currect-weather">{weather.details}</p>
      </div>
      <div className="temperature">
        <h3 className="currect-temp">{weather.temp.toFixed()}º</h3>
        <p className="temp-high-low">
          H:{weather.temp_max.toFixed()}º L:{weather.temp_min.toFixed()}º
        </p>
      </div>
    </div>
  );
};

export default SidebarItem;
