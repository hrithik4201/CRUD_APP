import React, { useState } from 'react';
import '../styles/Insert.css';

const Insert = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    pincode: 0,
    satScore: 0,
  });
  const [inserted, setInserted] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send POST request to backend
    fetch('http://localhost:5000/api/sat-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from backend
        console.log(data);
        setInserted(true);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        setInserted(false);
      });
  };

  return (
    <div className='insert-container'>
      <h1>Insert Data</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-items-container'>
          <div>
            <label htmlFor='name'>Full Name:</label>
            <br />
            <input type='text' id='name' name='name' onChange={handleChange} />
            <br />
          </div>
          <div>
            <label htmlFor='address'>Address:</label>
            <br />
            <input
              type='text'
              id='address'
              name='address'
              onChange={handleChange}
            />
            <br />
          </div>
          <div>
            <label htmlFor='city'>City:</label>
            <br />
            <input type='text' id='city' name='city' onChange={handleChange} />
            <br />
          </div>
        </div>
        <div className='input-items-container'>
          <div>
            <label htmlFor='country'>Country:</label>
            <br />
            <input
              type='text'
              id='country'
              name='country'
              onChange={handleChange}
            />
            <br />
          </div>
          <div>
            <label htmlFor='pincode'>Pincode:</label>
            <br />
            <input
              type='number'
              id='pincode'
              name='pincode'
              onChange={handleChange}
            />
            <br />
          </div>
          <div>
            <label htmlFor='satScore'>SAT Score:</label>
            <br />
            <input
              type='number'
              id='satScore'
              name='satScore'
              onChange={handleChange}
            />
            <br />
          </div>
        </div>
        <button type='submit'>Submit</button>
      </form>
      {inserted === true && (
        <p style={{ color: 'green' }}>Data has been inserted successfully!</p>
      )}
      {inserted === false && (
        <p style={{ color: 'red' }}>Data has not been inserted!</p>
      )}
    </div>
  );
};

export default Insert;
