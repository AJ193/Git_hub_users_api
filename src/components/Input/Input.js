import React from "react";
import "./Input.css";

const Input = ({ handleSearch }) => {
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="input-container">
      <input
        type="text"
        className="input"
        placeholder="Search GitHub users..."
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
