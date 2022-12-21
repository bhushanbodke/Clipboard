import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FolderIcon from "@mui/icons-material/Folder";
import CommentIcon from "@mui/icons-material/Comment";
import LoginContext from "../context/context";
import "./navigation.css";
import { useEffect } from "react";
import { useState } from "react";

const Navigation = ({ setshowPaper, showPaper, page }) => {
  let { logout } = useContext(LoginContext);
  let [is_pressed, setpressed] = useState(false);
  let [darkTheme, setdarkTheme] = useState(
    localStorage.getItem("darktheme")
      ? JSON.parse(localStorage.getItem("darktheme"))
      : false
  );
  console.log(document.querySelector("body").scrollTop);
  useEffect(() => {
    let r = document.querySelector(":root");
    if (page == "clipboard") {
      document.getElementById(page).style.color = "#feda6a";
      r.style.setProperty("--primary", "#feda6a");
      r.style.setProperty("--secon", "#393f4d");
    } else {
      document.getElementById(page).style.color = "aqua";
      r.style.setProperty("--primary", "#3fb0ac");
      r.style.setProperty("--secon", "#00a59f");
    }
  }, []);
  useEffect(() => {
    let r = document.querySelector(":root");
    // if Dark theme
    if (darkTheme) {
      r.style.setProperty("--card-background", "black");
      r.style.setProperty("--text-color", "white");
      r.style.setProperty("--background", "#393f4d");
    } else {
      r.style.setProperty("--card-background", "white");
      r.style.setProperty("--text-color", "black");
      r.style.setProperty("--background", "#c7bfab");
    }
    localStorage.setItem("darktheme", darkTheme);
  }, [darkTheme]);

  let navigate = useNavigate();
  return (
    <div className="nav" style={{ zIndex: 1 }}>
      <div
        className="item"
        onClick={() => {
          setshowPaper(!showPaper);
          setpressed(!is_pressed);
        }}
      >
        <div className="icon">
          <AddCircleOutlineIcon />
          <span className="label">Add</span>
        </div>
      </div>
      <div className="item" id="Files" onClick={() => navigate("/files")}>
        <div className="icon">
          <FolderIcon />
          <span className="label">Files</span>
        </div>
      </div>
      <div className="item" id="clipboard" onClick={() => navigate("/")}>
        <div className="icon">
          <CommentIcon />

          <span className="label">Clipboard</span>
        </div>
      </div>
      <div className="item" onClick={() => setdarkTheme(!darkTheme)}>
        <div className="icon">
          {darkTheme ? <LightModeIcon /> : <DarkModeIcon />}
          <span className="label">{darkTheme ? "LightMode" : "DarkTheme"}</span>
        </div>
      </div>
      <div className="item" onClick={() => logout()}>
        <div className="icon">
          <LogoutIcon />
          <span className="label">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
