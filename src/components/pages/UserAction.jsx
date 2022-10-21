import React, { useState, useEffect } from "react";
import "./userAction.css";
import Input from "../Input/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserAction = ({ children, id }) => {
  const formD = new FormData();
  const [singleUser, setSingleUser] = useState({});
  const navigate = useNavigate();
  const fetchUserById = async (id) => {
    const response = await axios.get(
      `https://test.helpmytoken.com/api/users/${id}`
    );
    const data = await response.data;
    setSingleUser(data.payload);
  };

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });
  const handleUpdate = (event) => {
    setUser(event.target.value);
  };
  const [error, setError] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const [url, setUrl] = useState("Slecet Image");
  const handleOnChangeAvatar = (e) => {
    setUser({ ...user, avatar: e.target.value });
    setUrl(e.target.value);
  };

  const reg = {
    username: /^[a-zA-Z]+$/,
    firstName: /^[a-zA-Z]+$/,
    lastName: /^[a-zA-Z]+$/,
    email: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
  };

  const validateInputs = () => {
    let isValid = true;
    if (!reg.username.test(user.username)) {
      setError({ ...error, username: "Username is not valid" });
      isValid = false;
    }
    if (!reg.firstName.test(user.first_name)) {
      setError({ ...error, first_name: "First name is not valid" });
      isValid = false;
    }
    if (!reg.lastName.test(user.last_name)) {
      setError({ ...error, last_name: "Last name is not valid" });
      isValid = false;
    }
    if (!reg.email.test(user.email)) {
      setError({ ...error, email: "Email is not valid" });
      isValid = false;
    }
    if (!reg.password.test(user.password)) {
      setError({ ...error, password: "Password is not valid" });
      isValid = false;
    }

    return isValid;
  };

  const onBlur = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    for (let key in user) {
      formD.append(key, user[key]);
    }
    if (validateInputs()) {
      axios.post("https://test.helpmytoken.com/api/users", user);

      navigate(`/list`);
    }
  };

  const handleEditUser = (id) => {
    axios.put(`https://test.helpmytoken.com/api/users/${id}`, user);
    navigate(`/list`);
  };
  return (
    <>
      {children.nav}
      <div className="main_cont">
        {children.side}
        <div className="right">
          <div className="new_user_details">
            <h2>{children.editOrNew} User Details</h2>
            <div className="user_inputs">
              <Input
                type="text"
                name="username"
                placeHolder="User Name"
                onBlur={onBlur}
                message={error.username}
                defaultValue={singleUser.username}
                onChange={(e) => handleUpdate(e)}
              />
              <Input
                type="text"
                name="first_name"
                placeHolder="First Name"
                message={error.first_name}
                onBlur={onBlur}
                defaultValue={singleUser.first_name}
                onChange={(e) => handleUpdate(e)}
              />
              <Input
                type="text"
                name="last_name"
                placeHolder="Last Name"
                message={error.last_name}
                onBlur={onBlur}
                defaultValue={singleUser.last_name}
                onChange={(e) => handleUpdate(e)}
              />
              <Input
                type="email"
                name="email"
                placeHolder="Email"
                message={error.email}
                onBlur={onBlur}
                defaultValue={singleUser.email}
                onChange={(e) => handleUpdate(e)}
              />
              <Input
                type="password"
                name="password"
                placeHolder="Password"
                onBlur={onBlur}
              />

              <div className="radio">
                <Input type="radio" name="role" id="Manager" value="Manager" />
                <label htmlFor="Manager">Manager</label>
                <Input
                  type="radio"
                  name="role"
                  id="Employee"
                  value="Employee"
                />
                <label htmlFor="Employee">Employee</label>
              </div>
            </div>
          </div>
          <div className="profile_pic">
            <h2>Profile Picture</h2>
            <div className="upload_img_cont">
              <img src={url} alt="" />
            </div>
            <Input
              type="url"
              placeholder={url}
              onChange={(e) => handleOnChangeAvatar(e)}
              style={{
                border: "none",
                backgroundColor: "#f9f9f9",
                width: "100%",
                height: "50px",
                textAlign: "center",
                fontSize: "1.2rem",
                marginTop: "1rem",
              }}
              className="img__url"
            />
          </div>
          <div className="action_buttons">
            <Input
              style={{ backgroundColor: "#606060", color: "#fff" }}
              type="button"
              value={`${children.editOrNew} User`}
              onClick={
                children.editOrNew === "Edit"
                  ? () => handleEditUser(id)
                  : onSubmit
              }
            />
            <Input
              style={{
                backgroundColor: "#ebebeb",
                color: "#606060",
                border: "none",
              }}
              type="button"
              value="Cancel"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAction;
