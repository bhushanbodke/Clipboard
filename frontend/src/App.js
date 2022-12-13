import "./App.css";
import LoginContext, { Context } from "./context/context";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useContext, useEffect } from "react";
import Files from "./components/Files";
import Navigation from "./components/Navigation";
import Board from "./components/Board";

function App() {
  let { username } = useContext(LoginContext);
  let { updatetoken } = useContext(LoginContext);

  useEffect(() => {
    updatetoken();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={username ? <Board /> : <Login />} />
        <Route path="/files" element={username ? <Files /> : <Login />} />
        <Route path="" element={username ? <Board /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
