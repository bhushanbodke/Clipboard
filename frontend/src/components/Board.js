import "./board.css";
import React, { useContext, useEffect } from "react";
import { Button, Paper } from "@mui/material";
import LoginContext from "../context/context";
import { useState } from "react";
import axios from "axios";
import GoBottom from "./GoBottom";
import Loading from "./Loading";
import Navigation from "./Navigation";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Send from "@mui/icons-material/Send";

const Main = (props) => {
  let { user } = useContext(LoginContext);
  let { username } = useContext(LoginContext);
  let { setlogged } = useContext(LoginContext);
  let { authtoken } = useContext(LoginContext);
  let { backendUrl } = useContext(LoginContext);
  let { logged } = useContext(LoginContext);
  let [serverError, setserverError] = useState(false);
  let [showPaper, setshowPaper] = useState(false);
  let [Loaded, setLoaded] = useState(false);
  let [AllMessages, setMessages] = useState(
    localStorage.getItem("messages")
      ? JSON.parse(localStorage.getItem("messages"))
      : []
  );

  let header = {
    headers: {
      Authorization: `Bearer ${authtoken.access}`,
    },
  };

  // mui style override
  const pagestyle = {
    width: "40vw",
    height: "50vh",
    position: "fixed",
    top: "20vh",
    left: "25vw",
    backgroundColor: "#1d1e22",
    border: "solid 5px #feda6a",
    paddingLeft: "8vh",
    paddingRight: "10vh",
    paddingTop: "2vh",
    paddingBottom: "10vh",
    ["@media (max-width:600px)"]: {
      left: "5vw",
      width: "50vw",
      height: "40vh",
    },
  };

  //Get all messages
  function GetMessages() {
    axios
      .get(backendUrl + "/msg", header)
      .catch((error) => {
        setLoaded(true);
        if (AllMessages.length === 0) {
          setserverError(true);
          throw error;
        } else {
          throw error;
        }
      })
      .then((response) => {
        setMessages(response.data);
        localStorage.setItem("messages", JSON.stringify(response.data));
        localStorage.setItem("No", response.data.length);
        setLoaded(true);
      });
  }

  useEffect(() => {
    GetMessages();
    setTimeout(() => {
      setlogged(false);
    }, 5000);
  }, []);

  function GetNo() {
    axios.get(backendUrl + "/getNo", header).then((response) => {
      console.log(response.data);
      let no = localStorage.getItem("No");
      if (no !== response.data) {
        GetMessages();
      }
    });
  }
  useEffect(() => {
    let interval = setInterval(() => {
      GetNo();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // server error
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
  function SaveMsg(e) {
    e.preventDefault();
    let data = {
      body: e.target.MessageBody.value,
      owner: user,
    };
    axios
      .post(backendUrl + "/addmsg", data)
      .then(() => GetMessages())
      .then(() => (e.target.MessageBody.value = ""));
  }
  function DelMessage(id) {
    axios
      .delete(backendUrl + "/deletemsg/" + id)
      .then((response) => console.log(response.data))
      .then(() => (document.getElementById(id).style.display = "none"));
  }

  return (
    <>
      {!Loaded ? (
        <Loading />
      ) : (
        <>
          <GoBottom color="#feda6a" back="#D29707" />
          {logged ? (
            <div className="alert">
              <div className="div1" style={{ backgroundColor: "#8fff82" }}>
                Sucessfully logged in as <strong>{username}</strong>
              </div>
            </div>
          ) : null}
          <div className="title">
            <h2>Clipboard</h2>
          </div>
          {ServerError()}
          <div
            className="msgbody"
            style={showPaper ? { filter: "blur(5px)" } : { filter: "none" }}
          >
            <div className="msgs">
              {AllMessages.map((message) => (
                <div id={message.id} className="message" key={message.id}>
                  <div>
                    <h2>{message.body}</h2>
                  </div>
                  <p />

                  <DeleteForeverIcon
                    sx={{
                      paddingLeft: "40vw",
                      ["@media (max-width:600px)"]: {
                        paddingLeft: "78vw",
                      },
                    }}
                    onClick={() => DelMessage(message.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            id="paper"
            style={showPaper ? { display: "block" } : { display: "none" }}
          >
            <Paper elevation={10} sx={pagestyle}>
              <div
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "25px",
                }}
              >
                Add
              </div>
              <CloseIcon
                sx={{
                  paddingLeft: "40vw",
                  ["@media (max-width:600px)"]: {
                    paddingLeft: "55vw",
                  },
                }}
                onClick={() => setshowPaper(false)}
              />

              <form
                action=""
                onSubmit={(e) => {
                  SaveMsg(e);
                  e.target.MessageBody.value === ""
                    ? alert("No")
                    : setshowPaper(false);
                }}
              >
                <textarea
                  type="text"
                  name="MessageBody"
                  label="Clipboard"
                  placeholder="Clipboard"
                  cols="10"
                  rows="12"
                ></textarea>

                <p />
                <Button
                  sx={{
                    backgroundColor: "#feda6a",
                    color: "black",
                    width: "40vw",
                  }}
                  variant="contained"
                  type="submit"
                  endIcon={<Send />}
                >
                  Send
                </Button>
              </form>
            </Paper>
          </div>
          <Navigation
            setshowPaper={setshowPaper}
            showPaper={showPaper}
            page={"clipboard"}
          />
        </>
      )}
    </>
  );
};

export default Main;
