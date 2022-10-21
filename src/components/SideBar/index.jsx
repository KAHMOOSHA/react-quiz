import React from "react";
import "./sidebar.css";

const SideBar = ({ icons }) => {
  return (
    <nav className="sidebar">
      <ul>
        {icons.map((item) => {
          return (
            <li key={item}>
              <img src={item} alt="i" />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideBar;
