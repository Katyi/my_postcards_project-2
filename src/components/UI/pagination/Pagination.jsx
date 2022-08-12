import React from "react";

const Pagination = ({ limit, totalAlbums, page, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAlbums / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="page__wrapper">
      {pageNumbers.map(number =>
        <span
          onClick={() => paginate(number)}
          key={number}
          className={page === number ? 'page__current' : 'page'}
        >
          {number}
        </span>
      )}
    </div>
  );
};

export default Pagination;