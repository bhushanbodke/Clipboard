import React, { useContext } from "react";
import "./login.css";
import { Button } from "@mui/material";
import LoginContext from "../context/context";

const Login = () => {
  let { login } = useContext(LoginContext);

  const style = {
    backgroundColor: "rgb(255, 183, 110)",
    color: "#393f4d",
    width: "40vw",
    borderRadius: "50px",
    marginTop: "15px",
    "&:hover": {
      backgroundColor: "rgb(254, 140, 26)",
    },
  };

  return (
    <div className="login">
      <div className="ti">Login</div>
      <form id="loginform" action="" onSubmit={(e) => login(e)}>
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
  );
};

export default Login;
