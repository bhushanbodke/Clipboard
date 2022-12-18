import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const FilePreview = ({ fileurl, type, show, setshow }) => {
  if (show) {
    if (type == "image") {
      return (
        <div className="FileContainer">
          <img src={fileurl} />
          <CloseIcon
            sx={{ top: "-45vh", position: "relative", right: "7vw" }}
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
            sx={{ top: "-45vh", position: "relative", right: "7vw" }}
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
