import React, { useState } from "react";
import "./Item.css";

const Item = ({ user, handleItemClick }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const accessToken = "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";
      const response = await fetch(`https://api.github.com/users/${user.login}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status} - ${response.statusText}`);
      }
      const userData = await response.json();
      setUserData(userData);
      setShowDetails(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div className="item">
      <img src={user.avatar_url} alt={user.login} />
      <p>{user.login}</p>
      <button onClick={handleClick} className="view-profile-button">View Profile</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {userData && showDetails && (
        <div className="second-pop-up">
          <span className="close" onClick={handleCloseDetails}>&times;</span>
          <div className="second-pop-up-content">
            <p>Full Name: {userData.name || "N/A"}</p>
            <p>Followers: {userData.followers || "N/A"}</p>
            <p>Following: {userData.following || "N/A"}</p>
            <p>Location: {userData.location || "N/A"}</p>
            <p>GitHub: <a href={userData.html_url} target="_blank" rel="noopener noreferrer">{userData.html_url}</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
