import React from "react";
import Item from "../Item/Item";

const List = ({ users, handleItemClick }) => {
  if (!Array.isArray(users) || users.length === 0) {
    return <div>No users found.</div>;
  }

  if (typeof handleItemClick !== "function") {
    console.warn("handleItemClick is not a function.");
    return <div>Unable to handle item click.</div>;
  }

  return (
    <div className="list">
      {users.map((user) => (
        <Item key={user.id} user={user} handleItemClick={handleItemClick} />
      ))}
    </div>
  );
};

export default List;
