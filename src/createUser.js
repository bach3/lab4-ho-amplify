import React, { useState } from 'react';

const CreateUserPage = () => {
  const [formData, setFormData] = useState({
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.bachthinh.link/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // User created successfully
        alert('User created successfully');
        console.log('User created successfully');
      } else {
        // Handle error response
        const data = await response.json();
        console.error('Failed to create user:', data.error);
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
    // Reset form after submission
    setFormData({
      name: ''
    });
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUserPage;
