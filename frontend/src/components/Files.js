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

const Files = () => {
  let [AllFiles, setAllFiles] = useState([]);
  let [File, setFile] = useState();
  let [FileType, setFileType] = useState();
  let [FileName, setFileName] = useState();
  let [FileSize, setFileSize] = useState();
  let [uploadedSize, setuploadedSize] = useState();
  let [showPaper, setshowPaper] = useState(false);
  let [Loaded, setLoaded] = useState(false);
  let { authtoken } = useContext(LoginContext);
  let { user } = useContext(LoginContext);
  let { loading } = useContext(LoginContext);
  let BackendUrl = "http://192.168.1.4:8000";

  useEffect(() => {
    if (loading) {
      GetFiles();
    }
  }, [loading]);

  function GetFiles() {
    let header = {
      headers: {
        Authorization: `Bearer ${authtoken.access}`,
      },
    };
    axios
      .get(BackendUrl + "/files", header)
      .then((response) => setAllFiles(response.data))
      .then(() => setLoaded(true));
  }
  function UploadFile(e) {
    e.preventDefault();
    if (!File) {
      alert("select file first");
      return;
    }
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
        setuploadedSize(progressEvent.Loaded),
    };
    // upload the data
    axios.post(BackendUrl + "/addfiles", formdata, header).then((response) => {
      GetFiles();
      console.log(response.data);
      deselect();
    });
  }
  function DelFile(id) {
    axios
      .delete(BackendUrl + "/deletefile/" + id)
      .then((response) => console.log(response.data))
      .then(() => (document.getElementById(id).style.display = "none"));
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
  const button = {
    backgroundColor: "#66fcf1",
    color: "black",
    "&:hover": {
      backgroundColor: "#3fb0ac",
    },
  };

  const pill = {
    borderRadius: 50,
    backgroundColor: "#3fb0ac",
    margin: "5px",
    marginTop: "25px",
    "&:hover": {
      backgroundColor: "#66fcf1",
    },
  };
  const icon = {
    color: "black",
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

  return (
    <>
      {!Loaded ? (
        <Loading />
      ) : (
        <>
          <div className="title">
            <h2>Files</h2>
          </div>
          <div
            className="filesbody"
            style={showPaper ? { filter: "blur(5px)" } : { filter: "none" }}
          >
            <div className="Files">
              {AllFiles.map((file) => (
                <div key={file.id} id={file.id} className="File">
                  <div>
                    {" "}
                    <b>File Name :</b> {file.fileName}
                  </div>
                  <div>
                    <b>File Size :</b> {(file.size / 1000000).toFixed(2)} Mb
                  </div>
                  <div>
                    <b>File Type :</b> {file.filetype}
                  </div>
                  <a href={BackendUrl + file.Files}>
                    <Button sx={pill} variant="contained">
                      <DownloadIcon sx={icon} />
                    </Button>
                  </a>
                  <a href={BackendUrl + file.Files} target="_blank">
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
