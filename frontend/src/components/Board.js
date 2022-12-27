import "./board.css";
import React, { useEffect } from "react";
import { Button, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import axios from "axios";
import { ReactDOM } from "react";
import GoBottom from "./GoBottom";
import Loading from "./Loading";
import Servererror from "./Servererror";
import Navigation from "./Navigation";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Send from "@mui/icons-material/Send";

const Main = ({
  authtoken,
  user,
  backendUrl,
  logout,
  username,
  logged,
  setlogged,
}) => {
  let [serverError, setserverError] = useState(true);
  let [showPaper, setshowPaper] = useState(false);
  let [Loaded, setLoaded] = useState(false);
  let [NewMsgs, setNewMsgs] = useState([]);
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
    width: "45vw",
    height: "65vh",
    position: "fixed",
    top: "15vh",
    left: "25vw",
    backgroundColor: "#1d1e22",
    border: "solid 5px #feda6a",
    ["@media (max-width:600px)"]: {
      marginTop: "0%",
      left: "5vw",
      width: "90%",
      height: "65%",
    },
  };

  //Get all messages
  function GetMessages() {
    document.querySelector("body").scroll(0, document.body.scrollHeight);
    axios
      .get(backendUrl + "/msg", header)
      .catch((error) => {
        setLoaded(true);
        throw error;
      })
      .then((response) => {
        setMessages(response.data);
        setNewMsgs([]);
        setserverError(false);
        localStorage.setItem("messages", JSON.stringify(response.data));
        setLoaded(true);
      });
  }

  useEffect(() => {
    if (!localStorage.getItem("PendingMsg")) {
      const array = [];
      localStorage.setItem("PendingMsg", array);
    } else {
      let messages = JSON.parse(localStorage.getItem("PendingMsg"));
      messages.forEach((message) => {
        addNew(message.body);
      });
    }
    GetMessages();
    setTimeout(() => {
      setlogged(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if (!serverError && localStorage.getItem("PendingMsg")) {
      pendingMsgs();
    }
  }, [serverError]);

  // pending message function so that even when server is offline user can still send
  function SaveMsg(e) {
    e.preventDefault();
    let data = {
      body: e.target.MessageBody.value,
      owner: user,
    };
    if (serverError) {
      let pendingMsg = [];
      if (localStorage.getItem("PendingMsg")) {
        pendingMsg = JSON.parse(localStorage.getItem("PendingMsg"));
      }
      pendingMsg.push(data);
      localStorage.setItem("PendingMsg", JSON.stringify(pendingMsg));
    } else {
      sendMsg(e, data);
    }
    addNew(data.body);
  }

  function addNew(body) {
    setNewMsgs((prev) => [...prev, NewMsg(body)]);
  }

  const NewMsg = (body) => {
    return (
      <div className="message">
        <div>
          <h2>{body}</h2>
        </div>
        <div className="deleteIcon">
          <DeleteForeverIcon
            sx={{
              fontSize: "25px",
              margin: "8px",
            }}
            onClick={(e) => DelMessage(null, e)}
          />
        </div>
      </div>
    );
  };

  function pendingMsgs() {
    let messages = JSON.parse(localStorage.getItem("PendingMsg"));
    console.log(messages);
    messages.forEach((message) => {
      sendMsg(null, message);
    });
    localStorage.setItem("PendingMsg", JSON.stringify([]));
  }

  // send message to backend
  function sendMsg(e, data) {
    axios
      .post(backendUrl + "/addmsg", data)
      .catch((error) => {
        let pendingMsg = [];
        if (localStorage.getItem("PendingMsg")) {
          pendingMsg = JSON.parse(localStorage.getItem("PendingMsg"));
        }
        pendingMsg.push(data);
        localStorage.setItem("PendingMsg", JSON.stringify(pendingMsg));
      })
      .then(() => addNew(data.body))
      .then(() => (e.target.MessageBody.value = ""));
  }

  function DelMessage(id, e) {
    if (id) {
      axios
        .delete(backendUrl + "/deletemsg/" + id)
        .then((response) => console.log(response.data))
        .then(() => (document.getElementById(id).style.display = "none"));
    } else {
      e.target.parentNode.parentNode.parentNode.remove();
    }
  }

  return (
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
        <div style={{ fontSize: "45px" }}>Clipboard</div>
      </div>
      <Servererror serverError={serverError} />
      <div
        className="msgbody"
        style={showPaper ? { filter: "blur(5px)" } : { filter: "none" }}
      >
        {Loaded ? (
          <div className="msgs">
            {AllMessages.map((message) => (
              <div id={message.id} className="message" key={message.id}>
                <div>
                  <h2>{message.body}</h2>
                </div>
                <div className="deleteIcon" title="delete message">
                  <DeleteForeverIcon
                    sx={{
                      fontSize: "25px",
                      margin: "8px",
                    }}
                    onClick={() => DelMessage(message.id, null)}
                  />
                </div>
              </div>
            ))}
            {NewMsgs}
          </div>
        ) : (
          <Loading />
        )}
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
              color: "#feda6a",
              position: "absolute",
              marginLeft: "94%",
              marginTop: "-4%",
              fontSize: "25px",
              ["@media (max-width:600px)"]: {
                marginLeft: "88%",
                fontSize: "35px",
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
                marginLeft: "5%",
                backgroundColor: "#feda6a",
                color: "black",
                width: "40vw",
                ["@media (max-width:600px)"]: {
                  width: "88%",
                },
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
        logout={logout}
        refresh={GetMessages}
      />
    </>
  );
};

export default React.memo(Main);
