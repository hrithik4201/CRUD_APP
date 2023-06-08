import React, { useState } from 'react';
import '../styles/Rank.css';

const Rank = () => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [rank, setRank] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send GET request to backend
    fetch(`http://localhost:5000/api/sat-results/rank/${formData.name}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle response from backend
        console.log(data);
        setRank(data.rank);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        setRank(null);
      });
  };

  return (
    <div className='rank-container'>
      <h1>Get Rank</h1>
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
      {rank !== null && <p>Rank: {rank}</p>}
    </div>
  );
};

export default Rank;
