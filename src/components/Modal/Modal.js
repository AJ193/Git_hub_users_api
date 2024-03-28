import React, { useState, useEffect } from "react";

const Modal = ({ user = {}, handleCloseModal }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/users/${user.login}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status} - ${response.statusText}`);
        }
        const userData = await response.json();
        setUserData(userData);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user.login) {
      fetchUserData();
    }
  }, [user.login]);

  return (
    <div className="modal" style={{ display: userData ? "block" : "none" }}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>&times;</span>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <p>Full Name: {userData?.name || "N/A"}</p>
            <p>Followers: {userData?.followers || "N/A"}</p>
            <p>Following: {userData?.following || "N/A"}</p>
            <p>Location: {userData?.location || "N/A"}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
