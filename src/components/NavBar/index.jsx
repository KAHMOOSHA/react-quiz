import React from "react";
import "./nav.css";
import burger from "../images/menu.svg";
import img from "../images/image1.svg";
import userImg from "../images/user.svg";

const NavBar = () => {
  return (
    <nav className="navBar">
      <div className="burger">
        <img src={burger} alt="" />
      </div>
      <div className="user_info_cont">
        <img src={img} alt="Uimg" />
        <div className="user_info">
          <div className="user_name">
            <h1>Ibrahim Alhelou</h1>
            <h4>Accuont Settings</h4>
          </div>
          <div className="user_img_cont">
            <img src={userImg} alt="img1" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
