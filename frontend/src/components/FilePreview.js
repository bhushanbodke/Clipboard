import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const FilePreview = ({ fileurl, type, show, setshow }) => {
  let close = {
    top: "-45vh",
    position: "relative",
    right: "7vw",
    ["@media(max-width:600px)"]: {
      top: "-30vh",
      right: "0",
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
