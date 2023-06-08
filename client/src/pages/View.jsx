import React, { useEffect, useState } from 'react';

const View = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:5000/api/sat-results')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>View Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default View;
