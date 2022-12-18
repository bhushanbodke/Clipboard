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
    JSON.parse(localStorage.getItem("theme"))
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
    if (!darkTheme) {
      r.style.setProperty("--card-background", "white");
      r.style.setProperty("--text-color", "black");
    } else {
      r.style.setProperty("--card-background", "black");
      r.style.setProperty("--text-color", "white");
    }
    localStorage.setItem("theme", darkTheme);
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
        </div>
        <div className="label">Add</div>
      </div>
      <div className="item" id="Files" onClick={() => navigate("/files")}>
        <div className="icon">
          <FolderIcon />
        </div>
        <div className="label">Files</div>
      </div>
      <div className="item" id="clipboard" onClick={() => navigate("/")}>
        <div className="icon">
          <CommentIcon />
        </div>
        <div className="label">Clipboard</div>
      </div>
      <div className="item" onClick={() => setdarkTheme(!darkTheme)}>
        <div className="icon">
          {darkTheme ? <LightModeIcon /> : <DarkModeIcon />}
        </div>
        <div className="label">{darkTheme ? "LightMode" : "DarkTheme"}</div>
      </div>
      <div className="item" onClick={() => logout()}>
        <div className="icon">
          <LogoutIcon />
        </div>
        <div className="label">Logout</div>
      </div>
    </div>
  );
};

export default Navigation;
