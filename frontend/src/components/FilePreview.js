import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const FilePreview = ({ fileurl, type, show, setshow }) => {
  let close = {
    position: "absolute",
    left: "93%",
    top: "1%",
    color: "var(--primary)",
    width: "35px",
    height: "35px",
    borderRadius: "50px",
    "&:hover": {
      backgroundColor: "rgba(128, 128, 128, 0.5)",
    },
    ["@media(max-width:600px)"]: {
      left: "90%",
      fontSize: "25px",
    },
  };
  if (show) {
    if (type == "image") {
      return (
        <div className="FileContainer">
          <img src={fileurl} />
          <CloseIcon
            sx={close}
            onClick={() => {
              setshow(false);
              document.querySelector(".filesbody").style.filter = "none";
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="FileContainer">
          <video width="800" height="400" controls autoPlay>
            <source src={fileurl} type="video/mp4"></source>
          </video>
          <CloseIcon
            sx={close}
            onClick={() => {
              setshow(false);
              document.querySelector(".filesbody").style.filter = "none";
            }}
          />
        </div>
      );
    }
  }
};

export default React.memo(FilePreview);
