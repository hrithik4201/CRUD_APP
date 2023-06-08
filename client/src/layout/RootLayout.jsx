import React, { useState } from 'react';
import Insert from '../pages/Insert';
import View from '../pages/View';
import Rank from '../pages/Rank';
import Update from '../pages/Update';
import Delete from '../pages/Delete';
import '../styles/RootLayout.css';

const RootLayout = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Render different components based on the selected option
  const renderComponent = () => {
    switch (selectedOption) {
      case 'option1':
        return <Insert />;
      case 'option2':
        return <View />;
      case 'option3':
        return <Update />;
      case 'option4':
        return <Delete />;
      case 'option5':
        return <Rank />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='menu-container'>
        <h1>Menu</h1>
        <label htmlFor='selectOption'>Select an option:</label>
        <br />
        <select
          id='selectOption'
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value=''>-- Select --</option>
          <option value='option1'>Insert Data</option>
          <option value='option2'>View Data</option>
          <option value='option3'>Update Data</option>
          <option value='option4'>Delete Data</option>
          <option value='option5'>Get Rank</option>
        </select>
      </div>
      {renderComponent()}
    </>
  );
};

export default RootLayout;
