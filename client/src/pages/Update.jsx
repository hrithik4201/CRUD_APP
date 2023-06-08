import React, { useState } from 'react';
import '../styles/Update.css';

const Update = () => {
  const [formData, setFormData] = useState({
    name: '',
    satScore: 0,
  });
  const [updated, setUpdated] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send PUT request to backend
    fetch(`http://localhost:5000/api/sat-results/name/${formData.name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ satScore: formData.satScore }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from backend
        console.log(data);
        if (data.success) {
          setUpdated(true);
        } else {
          setUpdated(false);
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        setUpdated(false);
      });
  };

  return (
    <div className='update-container'>
      <h1>Update SAT Score</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-item'>
          <label htmlFor='name'>Full Name:</label>
          <br />
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          <br />
        </div>
        <div className='input-item'>
          <label htmlFor='satScore'>SAT Score:</label>
          <br />
          <input
            type='number'
            id='satScore'
            name='satScore'
            value={formData.satScore}
            onChange={handleChange}
          />
          <br />
        </div>
        <button type='submit'>Submit</button>
      </form>
      {updated === true && (
        <p style={{ color: 'green' }}>
          SAT score has been updated successfully!
        </p>
      )}
      {updated === false && (
        <p style={{ color: 'red' }}>Failed to update SAT score.</p>
      )}
    </div>
  );
};

export default Update;
