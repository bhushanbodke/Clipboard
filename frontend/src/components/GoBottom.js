import React, { useState } from "react";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const GoBottom = ({ color, back }) => {
  let [bottom, setbottom] = useState(false);
  let [up, setup] = useState(true);
  let button = {
    backgroundColor: color,
    borderRadius: "50%",
    minWidth: "0px",
    width: "35px",
    "&:hover": {
      backgroundColor: back,
    },
  };

  return (
    <>
      <div style={bottom ? { display: "none" } : { display: "block" }}>
        <div
          style={{ position: "fixed", right: "3vw", bottom: "12vh", zIndex: 2 }}
          onClick={() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
            setbottom(true);
            setup(false);
          }}
        >
          <Button sx={button} variant="contained" color="primary">
            <KeyboardArrowDownIcon sx={{ color: "#393f4d" }} />
          </Button>
        </div>
      </div>
      <div style={up ? { display: "none" } : { display: "block" }}>
        <div
          style={{ position: "fixed", right: "3vw", top: "12vh", zIndex: 2 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setup(true);
            setbottom(false);
          }}
        >
          <Button sx={button} variant="contained" color="primary">
            <KeyboardArrowUpIcon sx={{ color: "#393f4d" }} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default GoBottom;
