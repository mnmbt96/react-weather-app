import { useEffect, useState } from "react";
import Forecast from "./components/forecast/Forecast";
import Sidebar from "./components/sidebar/Sidebar";
import getFormattedWeatherData from "./weatherData/weatherData";
import { getFormattedWeatherDataForSidebar } from "./weatherData/weatherData";
import "./App.css";

function App() {
  const [query, setQuery] = useState({ q: "Vancouver" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarWeather, setSidebarWeather] = useState([]);
  const [cities, setCities] = useState([
    { q: "Tokyo" },
    { q: "Mexico City" },
    { q: "Honolulu" },
    { q: "Gold Coast" },
    { q: "Istanbul" },
  ]);

  useEffect(() => {
    const fetchWeatherSidebar = async (city) => {
      const data = await getFormattedWeatherDataForSidebar({
        ...city,
        units,
      });
      setSidebarWeather((prevData) => [...prevData, { data }]);
      setError(null);
    };

    cities.map((city) => fetchWeatherSidebar(city));
  }, [cities]);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
      setError(null);
    };
    fetchWeather();
  }, [query, units]);

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 550) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [windowWidth]);

  return (
    <div className="main">
      {sidebarOpen ? (
        <Sidebar
          sidebarWeather={sidebarWeather}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          windowWidth={windowWidth}
          setQuery={setQuery}
        />
      ) : (
        ""
      )}
      {weather && (
        <Forecast
          weather={weather}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          windowWidth={windowWidth}
          handleUnitsChange={handleUnitsChange}
        />
      )}
    </div>
  );
}

export default App;
