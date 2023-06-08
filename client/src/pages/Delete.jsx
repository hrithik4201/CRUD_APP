import React, { useState } from 'react';
import '../styles/Delete.css';

const Delete = () => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [deleted, setDeleted] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send DELETE request to backend
    fetch(`http://localhost:5000/api/sat-results/name/${formData.name}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from backend
        console.log(data);
        if (data.success) {
          setDeleted(true);
        } else {
          setDeleted(false);
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        setDeleted(false);
      });
  };

  return (
    <div className='delete-container'>
      <h1>Delete Data</h1>
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
        <button type='submit'>Submit</button>
      </form>
      {deleted === true && (
        <p style={{ color: 'green' }}>Data has been deleted successfully!</p>
      )}
      {deleted === false && (
        <p style={{ color: 'red' }}>Failed to delete data.</p>
      )}
    </div>
  );
};

export default Delete;
