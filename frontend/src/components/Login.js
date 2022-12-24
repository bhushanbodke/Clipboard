import React from "react";
import "./login.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login = ({ login, error }) => {
  const style = {
    backgroundColor: "#3fb0ac",
    color: "#393f4d",
    width: "40vw",
    borderRadius: "10px",
    marginTop: "35px",
    "&:hover": {
      backgroundColor: "#20c7c1",
    },
    ["@media (max-width:600px)"]: {
      width: "75%",
    },
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%", overflowY: "hidden" }}>
        <div
          className="login"
          style={
            JSON.parse(localStorage.getItem("theme"))
              ? { backgroundColor: "#393f4d" }
              : { backgroundColor: "white" }
          }
        >
          <div
            className="alert1"
            style={error ? { display: "block" } : { display: "none" }}
          >
            <div className="div2" style={{ backgroundColor: "#ff5d5d" }}>
              Error while logging in <strong>check username / password</strong>
            </div>
          </div>
          <div className="ti">Login</div>
          <form
            className="loginform"
            id="loginform"
            action=""
            onSubmit={(e) => {
              login(e);
            }}
          >
            <input
              type="text"
              label="Username"
              placeholder="  Username"
              name="Username"
            />
            <p />
            <input
              type="password"
              label="Password"
              placeholder="  Password"
              name="Password"
            />
            <p />
            <Button type="submit" sx={style} variant="contained">
              Login
            </Button>
          </form>
          <p />
          <h4>
            Don't have an account ?
            <Link to="/register">
              <span style={{ color: "blue" }}>Register</span>
            </Link>
          </h4>
        </div>
      </div>
    </>
  );
};

export default React.memo(Login);
