import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Paper } from "@mui/material";
import Upload from "@mui/icons-material/Upload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import LoginContext from "../context/context";
import Navigation from "./Navigation";
import "./files.css";
import Loading from "./Loading";
import GoBottom from "./GoBottom";
import FileMap from "./FileMap";

const Files = () => {
  let [AllFiles, setAllFiles] = useState([]);
  let [File, setFile] = useState();
  let [FileType, setFileType] = useState();
  let [FileName, setFileName] = useState();
  let [FileSize, setFileSize] = useState(0);
  let [serverError, setserverError] = useState(false);
  let [showPaper, setshowPaper] = useState(false);
  let [Loaded, setLoaded] = useState(false);
  let [showalert, setshowalert] = useState("");
  let { authtoken } = useContext(LoginContext);
  let { user } = useContext(LoginContext);
  let [percent, setpercent] = useState(0);
  let { backendUrl } = useContext(LoginContext);

  useEffect(() => {
    GetFiles();
  }, []);

  function GetFiles() {
    let header = {
      headers: {
        Authorization: `Bearer ${authtoken.access}`,
      },
    };
    axios
      .get(backendUrl + "/files", header)
      .catch((error) => {
        setLoaded(true);
        setserverError(true);
        return;
      })
      .then((response) => {
        setAllFiles(response.data);
        localStorage.setItem("files", JSON.stringify(response.data));
      })
      .then(() => setLoaded(true));
  }
  function UploadFile(e) {
    e.preventDefault();
    if (!File) {
      setshowalert("not selected");
      setTimeout(() => {
        setshowalert("");
      }, 5000);
      return;
    }
    setshowalert("upload");
    //upload data
    let formdata = new FormData();
    formdata.append("Files", File);
    formdata.append("fileName", FileName);
    formdata.append("size", parseInt(FileSize));
    formdata.append("filetype", FileType);
    formdata.append("sender", user);

    // headeres for request
    let header = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authtoken.access}`,
      },
      // get upload progress
      onUploadProgress: (progressEvent) =>
        setpercent(progressEvent.progress.toFixed(2) * 100),
    };
    // upload the data
    axios.post(backendUrl + "/addfiles", formdata, header).then((response) => {
      setshowalert("");
      GetFiles();
      deselect();
    });
  }

  // set the files selected by user
  function updateFiles(e) {
    setFile(e.target.files[0]);
    setFileType(e.target.files[0].type);
    setFileName(e.target.files[0].name);
    setFileSize(e.target.files[0].size);
  }
  function deselect(e) {
    setFile([]);
    setFileType("");
    setFileName("");
    setFileSize("");
  }
  function ServerError() {
    if (serverError) {
      return (
        <div className="servererror title">
          <h2>Server is Offline</h2>
        </div>
      );
    } else {
      return null;
    }
  }

  function ShowAlertBar() {
    if (showalert === "not selected") {
      return (
        <Paper elevation={10}>
          <div className="alert" style={{ zIndex: 1 }}>
            <div className="div1" style={{ backgroundColor: "#ff5d5d" }}>
              <strong>Error : Select file first</strong>
            </div>
          </div>
        </Paper>
      );
    } else if (showalert === "upload") {
      return (
        //File upload progress Bar
        <div className="container_1">
          <div className="container">
            <div className="progress-bar__container">
              <div className="progress-bar" style={styleprogress}></div>
            </div>
          </div>
          <div style={{ marginTop: "-15px" }}>
            {percent.toFixed(0).toString()}% uploaded
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  const button = {
    backgroundColor: "#66fcf1",
    color: "black",
    width: "32.5vw",
    "&:hover": {
      backgroundColor: "#3fb0ac",
    },
    ["@media(max-width:600px)"]: {
      width: "65vw",
    },
  };

  const pagestyle = {
    width: "30vw",
    height: "35vh",
    position: "fixed",
    top: "20vh",
    color: "#66fcf1",
    backgroundColor: "#393f4d",
    border: "solid 5px #66fcf1",
    borderRadius: "10px",
    left: "25vw",
    paddingLeft: "5vh",
    paddingRight: "10vh",
    paddingTop: "5vh",
    paddingBottom: "10vh",
    ["@media (max-width:600px)"]: {
      left: "5vw",
      width: "55vw",
    },
  };
  let styleprogress = { width: percent.toString() + "%" };

  return (
    <>
      {!Loaded ? (
        <Loading />
      ) : (
        <>
          <GoBottom color="#66fcf1" back="#3fb0ac" />

          {ShowAlertBar()}
          {ServerError()}
          <div className="title">
            <h2>Files</h2>
          </div>
          <div
            className="filesbody"
            style={showPaper ? { filter: "blur(5px)" } : { filter: "none" }}
          >
            <div className="Files">
              {AllFiles.map((file) => (
                <FileMap file={file} />
              ))}
            </div>
          </div>
          <div
            id="paper"
            style={showPaper ? { display: "block" } : { display: "none" }}
          >
            <Paper elevation={10} sx={pagestyle}>
              <CloseIcon
                sx={{
                  paddingLeft: "30vw",
                  ["@media (max-width:600px)"]: {
                    paddingLeft: "60vw",
                  },
                }}
                onClick={() => setshowPaper(false)}
              />
              <div style={{ width: "50vw" }}>
                <div>
                  <b>FileName :</b> {FileName}
                </div>
                <p />
                <div>
                  <b>FileType :</b> {FileType}
                </div>
                <p />

                <div>
                  <b>Size :</b>{" "}
                  {FileSize ? (FileSize / 1000000).toFixed(2) : ""}
                  {FileSize ? <span> Mb</span> : ""}
                </div>
              </div>
              <div className="fileupload">
                <form
                  action=""
                  method="post"
                  onSubmit={(e) => {
                    UploadFile(e);
                    File ? setshowPaper(false) : console.log(true);
                    window.scrollTo({
                      top: document.documentElement.scrollHeight,
                      behavior: "smooth",
                    });
                  }}
                >
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => updateFiles(e)}
                    accept="/*"
                    hidden
                  />

                  <Button
                    sx={button}
                    variant="contained"
                    startIcon={<AttachFileIcon />}
                  >
                    <label htmlFor="file">Select File</label>
                  </Button>

                  <p />
                  <Button
                    sx={button}
                    variant="contained"
                    type="submit"
                    startIcon={<Upload />}
                  >
                    Send
                  </Button>
                </form>
              </div>
            </Paper>
          </div>
          <Navigation
            setshowPaper={setshowPaper}
            showPaper={showPaper}
            page={"Files"}
          />
        </>
      )}
    </>
  );
};

export default Files;
