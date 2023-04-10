import React from "react";
import { useRef } from "react";
import { GrLocation } from "react-icons/gr";
import "./searchbar.css";

const Searchbar = ({ setQuery, setSidebarOpen, windowWidth }) => {
  const cityNameRef = useRef();

  const handleSearchClick = (e) => {
    let inputCity = cityNameRef.current.value;

    if (e.key === "Enter") {
      if (inputCity !== "") setQuery({ q: inputCity });
      windowWidth <= 550 ? setSidebarOpen(false) : setSidebarOpen(true);
      cityNameRef.current.value = null;
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
    if (windowWidth <= 550) setSidebarOpen(false);
  };

  return (
    <div className="search-container">
      <input
        className="seachbar"
        type="text"
        placeholder="🔍 Search for a city name"
        ref={cityNameRef}
        onKeyDown={handleSearchClick}
      />
      <GrLocation className="current-location" onClick={handleLocationClick} />
    </div>
  );
};

export default Searchbar;
