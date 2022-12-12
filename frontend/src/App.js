import "./App.css";
import LoginContext, { Context } from "./context/context";
import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useContext, useEffect } from "react";
import Files from "./components/Files";
import Navigation from "./components/Navigation";

function App() {
  let { username } = useContext(LoginContext);
  let { updatetoken } = useContext(LoginContext);

  useEffect(() => {
    updatetoken();
  }, []);

  return (
    <>
      <Routes>
        <Route path="login" element={username ? <Main /> : <Login />} />
        <Route path="" element={username ? <Main /> : <Login />} />
        <Route path="/files" element={username ? <Files /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
