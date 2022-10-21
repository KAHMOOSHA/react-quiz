import React from "react";
import "./table.css";

import Row from "../Row";

const Table = ({ users, handleUpdate, handleDelete }) => {
  return (
    <div className="table">
      {users.map((user) => (
        <Row
          users={user}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Table;
