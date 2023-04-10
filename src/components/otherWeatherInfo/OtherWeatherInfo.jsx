import React from "react";
import "./otherWeatherInfo.css";
import { formatToLocalTime } from "../../weatherData/weatherData";
import { BiWind } from "react-icons/bi";
import { TbSunrise, TbSunset } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { RiTempHotLine, RiTyphoonFill } from "react-icons/ri";

const otherWeatherInfo = ({ weather }) => {
  return (
    <div className="otherInfo-container">
      <div className="weather-info">
        <p className="title">Feels Like</p>
        <div className="icon-data">
          <RiTempHotLine className="icon" />
          <p className="data">{weather.feels_like.toFixed()}º</p>
        </div>
      </div>
      <div className="weather-info">
        <p className="title">Humidity</p>
        <div className="icon-data">
          <WiHumidity className="icon" />
          <p className="data">{weather.humidity}%</p>
        </div>
      </div>
      <div className="weather-info">
        <p className="title">Sunrise</p>
        <div className="icon-data">
          <TbSunrise className="icon" />
          <p className="data">
            {formatToLocalTime(weather.sunrise, weather.timezone, "hh:mm a")}
          </p>
        </div>
      </div>
      <div className="weather-info">
        <p className="title">Sunset</p>
        <div className="icon-data">
          <TbSunset className="icon" />
          <p className="data">
            {formatToLocalTime(weather.sunset, weather.timezone, "hh:mm a")}
          </p>
        </div>
      </div>
      <div className="weather-info">
        <p className="title">Wind speed</p>
        <div className="icon-data">
          <BiWind className="icon" />
          <p className="data">{weather.speed.toFixed()}km/h</p>
        </div>
      </div>
      <div className="weather-info">
        <p className="title">Air Pressure</p>
        <div className="icon-data">
          <RiTyphoonFill className="icon" />
          <p className="data">{weather.pressure}hPa</p>
        </div>
      </div>
    </div>
  );
};

export default otherWeatherInfo;
