import React, { useContext } from "react";
import "./login.css";
import { Button } from "@mui/material";
import LoginContext from "../context/context";

const Login = () => {
  let { login } = useContext(LoginContext);
  let { error } = useContext(LoginContext);
  const style = {
    backgroundColor: "rgb(255, 183, 110)",
    color: "#393f4d",
    width: "40vw",
    borderRadius: "50px",
    marginTop: "35px",
    "&:hover": {
      backgroundColor: "rgb(254, 140, 26)",
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
          <h4>Don't have an account ?</h4>
        </div>
      </div>
    </>
  );
};

export default Login;
