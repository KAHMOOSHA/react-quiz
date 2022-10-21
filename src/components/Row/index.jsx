import React from "react";
import trash from "../images/trash.svg";
import edit from "../images/edit-2.svg";

const Row = ({ users, handleUpdate, handleDelete }) => {
  return (
    <ul key={users.email}>
      <li>{users.username}</li>
      <li>{users.first_name}</li>
      <li>{users.last_name}</li>
      <li>{users.email}</li>
      <li>
        <img onClick={() => handleUpdate(users.id)} src={edit} alt="E" />
        <img onClick={() => handleDelete(users.id)} src={trash} alt="D" />
      </li>
    </ul>
  );
};

export default Row;
