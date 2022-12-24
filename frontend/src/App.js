import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Files from "./components/Files";
import Board from "./components/Board";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Register from "./components/Register";

function App() {
  useEffect(() => {
    updatetoken();
  }, []);

  const [username, setusername] = useState(
    localStorage.getItem("authtoken")
      ? jwt_decode(localStorage.getItem("authtoken")).username
      : null
  );
  const [user, setuser] = useState(
    localStorage.getItem("authtoken")
      ? jwt_decode(localStorage.getItem("authtoken")).user_id
      : null
  );

  const [authtoken, setauthtoken] = useState(
    localStorage.getItem("authtoken")
      ? JSON.parse(localStorage.getItem("authtoken"))
      : null
  );
  let navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [backendUrl, setbackendUrl] = useState("http://192.168.1.3:8000");
  const [logged, setlogged] = useState(false);

  async function register(e) {
    e.preventDefault();
    let username = e.target.Username.value;
    let password1 = e.target.Password.value;
    let password2 = e.target.PasswordConfirmation.value;
    if (password1 != password2) {
      seterror(true);
      document.querySelector(".div2").innerHTML = "Passwords doesn't match";
    }
    axios
      .post(backendUrl + "/register", {
        username: username,
        password: password1,
        password2: password2,
      })
      .catch((error) => {
        seterror(true);
      })
      .then((response) => {
        seterror(true);
        console.log(response.data);
        document.querySelector(".div2").innerHTML =
          "Registered sucessfully go to login page";
        document.querySelector(".div2").style.backgroundColor = "green";
      });
  }

  async function login(e) {
    e.preventDefault();
    axios
      .post(backendUrl + "/api/token/", {
        username: e.target.Username.value,
        password: e.target.Password.value,
      })
      .catch((error) => {
        seterror(true);
        throw error;
      })
      .then((response) => {
        localStorage.setItem("authtoken", JSON.stringify(response.data));
        setauthtoken(response.data);
        setusername(jwt_decode(response.data.access).username);
        setlogged(true);
        navigate("");
      });
  }
  async function logout() {
    setusername(null);
    setauthtoken(null);
    seterror(false);
    localStorage.removeItem("authtoken");
    navigate("/login");
  }

  async function updatetoken() {
    if (authtoken == null) {
      return;
    } else {
      axios
        .post(backendUrl + "/api/token/refresh/", {
          refresh: authtoken.refresh,
        })
        .then((response) => {
          localStorage.setItem("authtoken", JSON.stringify(response.data));
          setauthtoken(response.data);
          setusername(jwt_decode(response.data.access).username);
          setloading(true);
        });
    }
  }
  useEffect(() => {
    let interval = setInterval(() => {
      updatetoken();
    }, 1000 * 60 * 15);
    return () => clearInterval(interval);
  }, [authtoken]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            username ? (
              <Board
                authtoken={authtoken}
                user={user}
                backendUrl={backendUrl}
                logged={logged}
                setlogged={setlogged}
                username={username}
                logout={logout}
              />
            ) : (
              <Login login={login} error={error} />
            )
          }
        />
        <Route
          path="/files"
          element={
            username ? (
              <Files
                authtoken={authtoken}
                user={user}
                logout={logout}
                backendUrl={backendUrl}
              />
            ) : (
              <Login login={login} error={error} />
            )
          }
        />
        <Route
          path=""
          element={
            username ? (
              <Board
                authtoken={authtoken}
                user={user}
                backendUrl={backendUrl}
                logged={logged}
                setlogged={setlogged}
                logout={logout}
                username={username}
              />
            ) : (
              <Login login={login} error={error} />
            )
          }
        />
        <Route
          path="/register"
          element={
            <Register register={register} setlogged={setlogged} error={error} />
          }
        />
      </Routes>
    </>
  );
}

export default React.memo(App);
