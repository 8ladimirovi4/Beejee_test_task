import React from 'react';
import { Link } from 'react-router-dom';

function Pagination({ tasksPerPage, totalTasks, paginate }) {
  const pageNumbers = [];

  for (let index = 1; index <= Math.ceil(totalTasks / tasksPerPage); index++) {
    pageNumbers.push(index);
  }
  return (
    <div className="pag-container">
      {pageNumbers.map((number) => (
        <div className="page-item" key={number}>
          <button className="page-btn" onClick={() => paginate(number)}>
            {number}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Pagination;
