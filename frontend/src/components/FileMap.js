import React from "react";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useContext } from "react";
import axios from "axios";
import LoginContext from "../context/context";
import LazyLoad from "react-lazy-load";
import "./files.css";

const FileMap = ({ file, setfileurl, settype, setshow }) => {
  let { backendUrl } = useContext(LoginContext);

  const pill = {
    borderRadius: 50,
    backgroundColor: "#66fcf1",
    margin: "5px",
    marginTop: "25px",
    "&:hover": {
      backgroundColor: "#3fb0ac",
    },
  };
  const pill1 = {
    borderRadius: 50,
    backgroundColor: "#66fcf1",
    margin: "5px",
    marginTop: "5px",
    "&:hover": {
      backgroundColor: "#3fb0ac",
    },
  };
  const icon = {
    color: "black",
  };

  function DelFile(id) {
    axios
      .delete(backendUrl + "/deletefile/" + id)
      .then((response) => console.log(response.data))
      .then(() => (document.getElementById(id).style.display = "none"));
  }

  function handlepreview(file) {
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
        <div>
          <div style={{ paddingTop: "1vh" }}>
            <div>
              <b>File Name :</b> {file.fileName}
            </div>
            <div>
              <b>File Size :</b> {(file.size / 1000000).toFixed(2)} Mb
            </div>
          </div>
          <div>
            <a href={backendUrl + file.Files}>
              <Button sx={pill} variant="contained">
                <DownloadIcon sx={icon} />
              </Button>
            </a>
            <a href={backendUrl + file.Files} target="_blank">
              <Button sx={pill} variant="contained">
                <VisibilityIcon sx={icon} />
              </Button>
            </a>
            <Button
              sx={pill}
              onClick={() => DelFile(file.id)}
              variant="contained"
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
          <a href={backendUrl + file.Files}>
            <Button sx={pill1} variant="contained">
              <DownloadIcon sx={icon} />
            </Button>
          </a>
          <a>
            <Button
              sx={pill1}
              variant="contained"
              onClick={() => handlepreview(file)}
            >
              <VisibilityIcon sx={icon} />
            </Button>
          </a>
          <Button
            sx={pill1}
            onClick={() => DelFile(file.id)}
            variant="contained"
          >
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
        <a href={backendUrl + file.Files}>
          <Button sx={pill} variant="contained">
            <DownloadIcon sx={icon} />
          </Button>
        </a>
        <a href={backendUrl + file.Files} target="_blank">
          <Button sx={pill} variant="contained">
            <VisibilityIcon sx={icon} />
          </Button>
        </a>
        <Button sx={pill} onClick={() => DelFile(file.id)} variant="contained">
          <DeleteForeverIcon sx={icon} />
        </Button>
      </div>
    );
  }
};

export default FileMap;
