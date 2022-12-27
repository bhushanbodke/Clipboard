import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

const Severerror = ({ serverError }) => {
  if (serverError) {
    return (
      <div
        onClick={() => {
          window.location.reload();
        }}
        className="servererror title"
      >
        <div>Cannot connect to server</div>
        <RefreshIcon
          sx={{
            position: "absolute",
            top: "2px",
            left: "36%",
            ["@media (max-width:600px)"]: {
              left: "10%",
            },
          }}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Severerror;
