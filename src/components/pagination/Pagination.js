// Pagination.js

import React from 'react';
import './Pagination.css';

const Pagination = ({ usersPerPage, totalUsers, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {currentPage > 1 && (
          <li className='page-item'>
            <button onClick={() => paginate(currentPage - 1)} className='page-link'>
              Previous
            </button>
          </li>
        )}
        {/* Display page numbers */}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={pageNumber === currentPage ? 'page-item active' : 'page-item'}>
            <button onClick={() => paginate(pageNumber)} className='page-link'>
              {pageNumber}
            </button>
          </li>
        ))}
        {currentPage < pageNumbers.length && (
          <li className='page-item'>
            <button onClick={() => paginate(currentPage + 1)} className='page-link'>
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
