import React from "react";
import SidebarItem from "../sidebarItem/SidebarItem";
import Searchbar from "../searchbar/Searchbar";
import { BiSidebar } from "react-icons/bi";
import "./sidebar.css";

const Sidebar = ({
  sidebarWeather,
  sidebarOpen,
  setSidebarOpen,
  windowWidth,
  setQuery,
}) => {
  let sidebarWidth, boxShadow;
  if (sidebarOpen && windowWidth > 550) {
    sidebarWidth = "30vw";
  } else if (sidebarOpen && windowWidth <= 550) {
    sidebarWidth = "70vw";
    boxShadow = "0.5px 0 5px black";
  } else if (!sidebarOpen) {
    sidebarWidth = "0";
  }

  return (
    <div
      className={`sidebar-container ${sidebarOpen ? "" : "closed"}`}
      style={{
        width: sidebarWidth,
        position: windowWidth <= 550 ? "absolute" : "fixed",
        boxShadow: boxShadow,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="sidebar-icons">
        <BiSidebar
          className="sidebar-open"
          onClick={() => setSidebarOpen(false)}
        />
      </div>
      <h1 className="weather-title">Weather</h1>
      <Searchbar
        setQuery={setQuery}
        setSidebarOpen={setSidebarOpen}
        windowWidth={windowWidth}
      />
      {sidebarWeather.map((wt, index) => (
        <SidebarItem
          wt={wt}
          key={index}
          setQuery={setQuery}
          setSidebarOpen={setSidebarOpen}
          windowWidth={windowWidth}
        />
      ))}
    </div>
  );
};
export default Sidebar;
