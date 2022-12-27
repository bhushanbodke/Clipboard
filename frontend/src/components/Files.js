import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Paper } from "@mui/material";
import Upload from "@mui/icons-material/Upload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState, useEffect } from "react";
import axios from "axios";
import Servererror from "./Servererror";
import FilePreview from "./FilePreview";
import Navigation from "./Navigation";
import "./files.css";
import Loading from "./Loading";
import GoBottom from "./GoBottom";
import FileMap from "./FileMap";

const Files = ({ authtoken, backendUrl, logout, user }) => {
  let [AllFiles, setAllFiles] = useState(
    localStorage.getItem("files")
      ? JSON.parse(localStorage.getItem("files"))
      : []
  );
  let [File, setFile] = useState();
  let [FileType, setFileType] = useState();
  let [FileName, setFileName] = useState();
  let [FileSize, setFileSize] = useState(0);
  let [serverError, setserverError] = useState(true);
  let [showPaper, setshowPaper] = useState(false);
  let [showpreview, setshowpreview] = useState(false);
  let [Fileurl, setFileurl] = useState("");
  let [Loaded, setLoaded] = useState(false);
  let [type, settype] = useState("");
  let [showalert, setshowalert] = useState("");
  let [percent, setpercent] = useState(0);

  useEffect(() => {
    GetFiles();
  }, []);

  function GetFiles() {
    document.querySelector("body").scroll(0, document.body.scrollHeight);
    let header = {
      headers: {
        Authorization: `Bearer ${authtoken.access}`,
      },
    };
    axios
      .get(backendUrl + "/files", header)
      .catch((error) => {
        setLoaded(true);
        throw error;
      })
      .then((response) => {
        setserverError(false);
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

  function uploadPreview() {
    if (File && FileType.split("/")[0] === "image") {
      return <img className="uploadimg" src={URL.createObjectURL(File)} />;
    } else if (File && FileType.split("/")[0] === "video") {
      return (
        <video controls autoPlay>
          <source src={URL.createObjectURL(File)} type="video/mp4"></source>
        </video>
      );
    }
  }

  const button = {
    backgroundColor: "#66fcf1",
    color: "black",
    width: "20.5vw",
    "&:hover": {
      backgroundColor: "#3fb0ac",
    },
    ["@media(max-width:600px)"]: {
      width: "75vw",
    },
  };

  let styleprogress = { width: percent.toString() + "%" };

  return (
    <>
      <GoBottom color="#66fcf1" back="#3fb0ac" />
      <FilePreview
        fileurl={Fileurl}
        show={showpreview}
        setshow={setshowpreview}
        type={type}
      />
      {ShowAlertBar()}
      <Servererror serverError={serverError} />
      <div className="title">
        <div>Files</div>
      </div>
      <div
        className="filesbody"
        style={showPaper ? { filter: "blur(5px)" } : { filter: "none" }}
      >
        {Loaded ? (
          <div className="Files">
            {AllFiles.map((file) => (
              <FileMap
                file={file}
                setfileurl={setFileurl}
                setshow={setshowpreview}
                settype={settype}
                backendUrl={backendUrl}
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <div
        id="paper"
        style={showPaper ? { display: "block" } : { display: "none" }}
      >
        <div className="FileSelect">
          <CloseIcon
            sx={{
              position: "absolute",
              marginLeft: "38.5vw",
              marginTop: "2vh",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "rgba(128, 128, 128, 0.5)",
              },
              ["@media (max-width:600px)"]: {
                marginLeft: "70vw",
                fontSize: "40px",
              },
            }}
            onClick={() => setshowPaper(false)}
          />
          <div className="selectedFile">
            <div id="ImagefilePreview">{uploadPreview()}</div>
            <div>
              <p />
              <b>FileName :</b>
              <p />
              {FileName}
              <p />
              <b>FileType :</b>
              <p />
              {FileType}
              <p />
              <b>Size :</b>
              <p />
              {FileSize ? (FileSize / 1000000).toFixed(2) : ""}
              {FileSize ? <span> Mb</span> : ""}
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
            </div>
          </div>
        </div>
      </div>
      <Navigation
        setshowPaper={setshowPaper}
        showPaper={showPaper}
        page={"Files"}
        refresh={GetFiles}
        logout={logout}
      />
    </>
  );
};

export default React.memo(Files);
