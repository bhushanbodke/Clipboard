import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Button } from "@mui/material";
import LinkTwoToneIcon from "@mui/icons-material/LinkTwoTone";

const GetUrl = ({ seturl }) => {
  const style = {
    backgroundColor: "#3fb0ac",
    color: "#393f4d",
    width: "40vw",
    borderRadius: "10px",
    marginTop: "25px",
    "&:hover": {
      backgroundColor: "#20c7c1",
    },
    ["@media (max-width:600px)"]: {
      width: "75%",
    },
  };

  let navigate = useNavigate();

  function handlesubmit(e) {
    e.preventDefault();
    seturl(e.target.url.value);
    localStorage.setItem("backendurl", JSON.stringify(e.target.url.value));
    navigate("/board");
  }
  return (
    <>
      <div style={{ width: "100%", height: "100%", overflowY: "hidden" }}>
        <div
          className="login url"
          style={
            JSON.parse(localStorage.getItem("theme"))
              ? { backgroundColor: "#393f4d" }
              : { backgroundColor: "white" }
          }
        >
          <div className="ti">Add Backend Url</div>
          <form
            className="loginform"
            id="loginform"
            action=""
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <input
              type="text"
              label="url"
              placeholder="  Backend Url"
              name="url"
            />
            <span className="inputIcon registerIcon">
              <LinkTwoToneIcon />
            </span>
            <p />
            <Button type="submit" sx={style} variant="contained">
              Submit
            </Button>
          </form>
          <p />
        </div>
      </div>
    </>
  );
};

export default GetUrl;
