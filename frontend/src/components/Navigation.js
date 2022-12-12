import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import { BottomNavigation } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
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

  useEffect(() => {
    let r = document.querySelector(":root");
    if (page == "clipboard") {
      document.getElementById(page).style.color = "#feda6a";
      r.style.setProperty("--primary", "#feda6a");
      r.style.setProperty("--secondary", "#393f4d");
    } else {
      document.getElementById(page).style.color = "aqua";
      r.style.setProperty("--primary", "#3fb0ac");
    }
  }, []);

  let navigate = useNavigate();
  return (
    <div className="nav">
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
