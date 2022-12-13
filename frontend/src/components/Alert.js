import React, { useContext, useEffect } from "react";
import LoginContext from "../context/context";
import "./alert.css";
import AlertTitle from "@mui/material/AlertTitle";
const Alert = ({ type }) => {
  let { username } = useContext(LoginContext);

  // } else {
  //   return (
  //     <div class="container">
  //       <div class="progress-bar__container">
  //         <div class="progress-bar" style={{ width: (done / total) * 100 }}>
  //           <span class="progress-bar__text">Uploaded Successfully!</span>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="alert">
        {type == "success" ? (
          <div className="div1" style={{ backgroundColor: "#8fff82" }}>
            Sucessfully logged in as <strong>{username}</strong>
          </div>
        ) : (
          <div
            className="div1"
            style={{ backgroundColor: "rgb(255, 130, 130)" }}
          >
            Error while logging in <strong>check username / password</strong>
          </div>
        )}
      </div>
    </>
  );
};

export default Alert;
