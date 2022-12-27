import React from "react";
import { useState } from "react";
import "./login.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

const Register = (register) => {
  let [checkerror, setcheckerror] = useState(false);
  let [checked, setchecked] = useState(false);

  function check(e) {
    e.preventDefault();
    let username = e.target.Username.value;
    let password1 = e.target.Password.value;
    let password2 = e.target.PasswordConfirmation.value;
    if (password1 != password2) {
      setcheckerror(true);
    } else {
      register(username, password1, password2);
    }
  }
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
            style={checkerror ? { display: "block" } : { display: "none" }}
          >
            <div className="div2" style={{ backgroundColor: "#ff5d5d" }}>
              passwords dosen't match
            </div>
          </div>
          <div className="ti">Register</div>
          <form
            className="loginform register"
            id="loginform"
            onSubmit={(e) => {
              check(e);
            }}
          >
            <input
              type="text"
              label="Username"
              placeholder="  Username"
              name="Username"
            />
            <span className="registerIcon">
              <AccountCircleTwoToneIcon />
            </span>
            <input
              type={checked ? "text" : "password"}
              label="Password"
              placeholder="  Password"
              name="Password"
            />
            <span className="registerIcon pass1">
              <LockTwoToneIcon />
            </span>
            <input
              style={
                checkerror
                  ? { borderColor: "#ff5d5d" }
                  : { borderColor: "#3fb0ac" }
              }
              type={checked ? "text" : "password"}
              label="PasswordConfirmation"
              placeholder="  Confirm Password"
              name="PasswordConfirmation"
            />
            <span className="registerIcon pass2">
              <LockTwoToneIcon />
            </span>
            <p />
            <div className="check">
              <Checkbox
                checked={checked}
                onChange={() => setchecked(!checked)}
              />
              <b>Show password</b>
            </div>
            <Button type="submit" sx={style} variant="contained">
              Register
            </Button>
          </form>
          <p />
          <h4>
            Already have account ?{" "}
            <Link to="/login">
              <span style={{ color: "blue" }}>login</span>
            </Link>
          </h4>
        </div>
      </div>
    </>
  );
};

export default Register;
