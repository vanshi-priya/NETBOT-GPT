// import React from 'react'
// import { IMG_CDN_URL } from '../utils/constants';

// const MovieCard = ({posterPath}) => {
//   if(!posterPath) return null;
//   return (
//     <div className="w-36 md:w-48 pr-4">
//       <img alt="Movie card" src= {IMG_CDN_URL + posterPath} />
//     </div>
//   )
// }

// export default MovieCard;

import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieCard = ({ posterPath, movieID }) => {
  if (!posterPath) return null;
  return (
    <div className="w-32 md:w-48 pr-4">
      <Link to={`/watch/${movieID}`}>
        <img alt="MovieCard" src={IMG_CDN_URL + posterPath} />
      </Link>
    </div>
  );
};
MovieCard.propTypes = {
  posterPath: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  movieID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MovieCard;
