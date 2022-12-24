import React from "react";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import LazyLoad from "react-lazy-load";
import "./files.css";

const FileMap = ({ file, setfileurl, settype, backendUrl, setshow }) => {
  const pill = {
    borderRadius: 50,
    border: "solid 2px",
    borderColor: "#3fb0ac",
    margin: "5px",
    marginTop: "25px",
    "&:hover": {
      border: "solid 2px",
      borderColor: "#66fcf1",
      backgroundColor: "var(--background)",
    },
  };
  const icon = {
    color: "#3fb0ac",
  };

  function DelFile(id) {
    axios
      .delete(backendUrl + "/deletefile/" + id)
      .then((response) => console.log(response.data))
      .then(() => (document.getElementById(id).style.display = "none"));
  }

  function handlepreview(file) {
    document.querySelector(".filesbody").style.filter = "blur(5px)";
    let url = backendUrl + file.Files;
    setshow(true);
    setfileurl(url);
    settype(file.filetype.split("/")[0]);
  }
  if (file.filetype.split("/")[0] == "image") {
    return (
      <div key={file.id} id={file.id} className="Fileimage">
        <div>
          <LazyLoad>
            <img
              className="img"
              src={backendUrl + file.Files}
              onClick={() => handlepreview(file)}
            />
          </LazyLoad>
        </div>
        <div className="FileInfo">
          <div>
            <div>
              <b>File Name :</b> {file.fileName}
            </div>
            <div>
              <b>File Size :</b> {(file.size / 1000000).toFixed(2)} Mb
            </div>
            <div>
              <b>Uploaded On :</b> {file.sendTime}
            </div>
          </div>
          <div>
            <a
              href={backendUrl + file.Files}
              download={backendUrl + file.Files}
            >
              <Button sx={pill} variant="outlined">
                <DownloadIcon sx={icon} />
              </Button>
            </a>
            <a href={backendUrl + file.Files} target="_blank">
              <Button sx={pill} variant="outlined">
                <VisibilityIcon sx={icon} />
              </Button>
            </a>
            <Button
              sx={pill}
              onClick={() => DelFile(file.id)}
              variant="outlined"
            >
              <DeleteForeverIcon sx={icon} />
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (file.filetype.split("/")[0] == "video") {
    return (
      <div key={file.id} id={file.id} className="File video">
        <div>
          <LazyLoad>
            <video width="350" height="170" controls>
              <source src={backendUrl + file.Files} type="video/mp4"></source>
            </video>
          </LazyLoad>
        </div>
        <div>
          <div>{file.fileName}</div>
          <div>
            <b>File Size :</b> {(file.size / 1000000).toFixed(2)} Mb
          </div>
          <div>
            <b>Uploaded On :</b> {file.sendTime}
          </div>
          <a href={backendUrl + file.Files} download={file.fileName}>
            <Button sx={pill} variant="outlined">
              <DownloadIcon sx={icon} />
            </Button>
          </a>
          <a>
            <Button
              sx={pill}
              variant="outlined"
              onClick={() => handlepreview(file)}
            >
              <VisibilityIcon sx={icon} />
            </Button>
          </a>
          <Button sx={pill} onClick={() => DelFile(file.id)} variant="outlined">
            <DeleteForeverIcon sx={icon} />
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div key={file.id} id={file.id} className="File">
        <div>
          <b>File Name :</b> {file.fileName}
        </div>
        <div>
          <b>File Size :</b> {(file.size / 1000000).toFixed(2)} Mb
        </div>
        <div>
          <b>File Type :</b> {file.filetype}
        </div>
        <div>
          <b>Uploaded On :</b> {file.sendTime}
        </div>
        <a href={backendUrl + file.Files} download={file.fileName}>
          <Button sx={pill} variant="outlined">
            <DownloadIcon sx={icon} />
          </Button>
        </a>
        <a href={backendUrl + file.Files} target="_blank">
          <Button sx={pill} variant="outlined">
            <VisibilityIcon sx={icon} />
          </Button>
        </a>
        <Button sx={pill} onClick={() => DelFile(file.id)} variant="outlined">
          <DeleteForeverIcon sx={icon} />
        </Button>
      </div>
    );
  }
};

export default React.memo(FileMap);
