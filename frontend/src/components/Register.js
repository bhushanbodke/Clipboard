import React from "react";
import { useContext } from "react";
import "./login.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Register = (register, error, seterror) => {
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
          className="login reg"
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
          <div className="ti">Register</div>
          <form
            className="loginform register"
            id="loginform"
            onSubmit={(e) => {
              register(e);
            }}
          >
            <input
              type="text"
              label="Username"
              placeholder="  Username"
              name="Username"
            />
            <input
              type="password"
              label="Password"
              placeholder="  Password"
              name="Password"
            />
            <input
              type="password"
              label="PasswordConfirmation"
              placeholder="Confirm Password"
              name="PasswordConfirmation"
            />
            <Button type="submit" sx={style} variant="contained">
              Register
            </Button>
          </form>
          <p />
          <h4>
            Alerady have account ?{" "}
            <Link to="/login">
              <span style={{ color: "blue" }} onClick={() => seterror(false)}>
                login
              </span>
            </Link>
          </h4>
        </div>
      </div>
    </>
  );
};

export default React.memo(Register);
