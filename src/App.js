/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Input from "./components/Input/Input";
import List from "./components/List/List";
import Modal from "./components/Modal/Modal";
import GitHubService from "./services/GitHubService";

function App() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (searchText.trim() !== "") {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [searchText]);

  const fetchUsers = async () => {
    try {
      const data = await GitHubService.searchUsers(searchText);
      setUsers(data.items);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleItemClick = async (user) => {
    try {
      const response = await fetch(`https://api.github.com/users/${user.login}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.status} - ${response.statusText}`);
      }
      const userData = await response.json();
      setUserDetails(userData);
      setSelectedUser(user);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setUserDetails(null);
  };

  return (
    <div>
      <h1 className="heading">Github User List</h1>
      <Input handleSearch={handleSearch} />
      <List users={users} handleItemClick={handleItemClick} />
      {selectedUser && (
        <Modal user={selectedUser} userDetails={userDetails} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
