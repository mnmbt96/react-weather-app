import { DateTime } from "luxon";
import WEATHER_API_KEY from "../../apikey";

const BASE_URL = "https://api.openweathermap.org/data";
const VERSION_25 = "2.5"; // pram(weather)
const VERSION_30 = "3.0"; // pram(onecall)

const getWeatherData = (version, infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${version}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: WEATHER_API_KEY });
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });
};

const formatCurrentWeather = (data) => {
  const {
    clouds: { all },
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    name,
    dt,
    sys: { country, sunrise, sunset },
    visibility,
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    all,
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    pressure,
    name,
    dt,
    country,
    sunrise,
    sunset,
    visibility,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp_min: d.temp.min,
      temp_max: d.temp.max,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    VERSION_25,
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData(VERSION_30, "onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
