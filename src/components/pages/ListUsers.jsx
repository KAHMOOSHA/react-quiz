import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import "./listUsers.css";
import Table from "../Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListUsers = ({ children, setId, id }) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch("https://test.helpmytoken.com/api/users");
    const data = await response.json();
    setUsers(data.payload);
  };

  const [searchQueries, setSearchQueries] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handlesearch = () => {
    if (
      searchQueries.firstName ||
      searchQueries.lastName ||
      searchQueries.email
    ) {
      const filtered = users.filter((user) => {
        return (
          user.first_name
            .toLowerCase()
            .includes(searchQueries.firstName.toLowerCase()) &&
          user.last_name
            .toLowerCase()
            .includes(searchQueries.lastName.toLowerCase()) &&
          user.email.toLowerCase().includes(searchQueries.email.toLowerCase())
        );
      });
      setUsers(filtered);
    } else {
      const getUsers = async () => {
        const { data } = await axios.get(
          "https://test.helpmytoken.com/api/users"
        );
        setUsers(data.payload);
      };
      getUsers();
    }
  };

  const handleOnChange = (e) => {
    setSearchQueries({
      ...searchQueries,
      [e.target.name]: e.target.value,
    });

    return handlesearch();
  };

  const handleDelete = (id) => {
    axios.delete(`https://test.helpmytoken.com/api/${id}`);
  };

  const handleUpdate = (id) => {
    setId(id);
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {children.nav}
      <div className="main_cont">
        {children.side}
        <div className="search">
          <h1>Search</h1>
          <div className="search_bars">
            <Input
              type="text"
              name="firstName"
              value= {searchQueries.firstName}
              placeHolder="First Name"
              onChange={(e) => handleOnChange(e)}
            />
            <Input
              type="text"
              name="lastName"
              value= {searchQueries.lastName}
              placeHolder="Last Name"
              onChange={(e) => handleOnChange(e)}
            />
            <Input
              type="text"
              name="email"
              value= {searchQueries.email}
              placeHolder="Email"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <h1>Users</h1>
          <Table
            users={users}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
};

export default ListUsers;
