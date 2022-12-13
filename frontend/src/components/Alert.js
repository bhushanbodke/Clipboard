import React, { useEffect } from "react";
import "./alert.css";

const Alert = ({ total, done }) => {
  let percent = 0;
  total !== 0 ? (percent = (done / total) * 100) : (percent = 0);
  console.log(total);
  console.log(done);

  return (
    <div className="container">
      <div className="progress-bar__container">
        <div
          className="progress-bar"
          style={{ width: percent.toString() + "%" }}
          id="progress-bar"
        >
          <span className="progress-bar__text">Uploaded Successfully!</span>
        </div>
      </div>
    </div>
  );
};

export default Alert;
