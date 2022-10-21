import React from "react";
import "./input.css";

const Input = (props) => {
  return (
    <div className="input_wrapper">
      <input className="input" {...props} />
      {props.message && <p className="error">{props.message}</p>}
    </div>
  );
};

export default Input;
