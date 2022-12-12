import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const LoginContext = createContext();

export default LoginContext;

export const Context = ({ children }) => {
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
  let backendUrl = "http://192.168.1.4:8000/";
  let navigate = useNavigate();
  const [loading, setloading] = useState(false);

  async function login(e) {
    e.preventDefault();
    axios
      .post(backendUrl + "api/token/", {
        username: e.target.Username.value,
        password: e.target.Password.value,
      })
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        localStorage.setItem("authtoken", JSON.stringify(response.data));
        setauthtoken(response.data);
        setusername(jwt_decode(response.data.access).username);
        navigate("");
      });
  }
  async function logout() {
    setusername(null);
    setauthtoken(null);
    localStorage.removeItem("authtoken");
    navigate("");
  }

  async function updatetoken() {
    if (authtoken == null) {
      return;
    } else {
      axios
        .post(backendUrl + "api/token/refresh/", {
          refresh: authtoken.refresh,
        })
        .catch(() => window.location.reload())
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

  let ContextData = {
    login: login,
    user: user,
    updatetoken: updatetoken,
    username: username,
    logout: logout,
    loading: loading,
    authtoken: authtoken,
  };

  return (
    <LoginContext.Provider value={ContextData}>
      {children}
    </LoginContext.Provider>
  );
};
