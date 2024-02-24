import React, { useState } from 'react';

const GetUserByIdPage = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.bachthinh.link/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
      } else {
        setError('User not found');
        setUserData(null);
      }
    } catch (error) {
      setError('Failed to fetch user');
      setUserData(null);
    }
  };

  return (
    <div>
      <h2>Get User By ID</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={handleInputChange}
        />
        <button type="submit">Get User</button>
      </form>
      {userData && (
        <div>
          <h3>User Details</h3>
          <p>ID: {userData.id}</p>
          <p>Username: {userData.name}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default GetUserByIdPage;
