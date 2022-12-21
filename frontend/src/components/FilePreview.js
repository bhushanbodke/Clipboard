import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const FilePreview = ({ fileurl, type, show, setshow }) => {
  let close = {
    position: "absolute",
    left: "93%",
    top: "1%",
    fontSize: "35px",
    ["@media(max-width:600px)"]: {
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
            }}
          />
        </div>
      );
    }
  }
};

export default FilePreview;
