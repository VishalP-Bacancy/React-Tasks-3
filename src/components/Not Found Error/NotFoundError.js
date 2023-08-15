import React from 'react';
import './NotFoundError.css'; // Make sure to create this CSS file

const NotFoundError = () => {
  return (
    <div className="not-found-container">
      <h1 className='not-found-title'>404 Error</h1>
      <p className='not-found-content'>Oops! You entered a wrong URL!.</p>
    </div>
  );
};

export default NotFoundError;
