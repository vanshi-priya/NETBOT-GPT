import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);

  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white font-semibold">
        {title}
      </h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                posterPath={movie.poster_path}
                movieID={movie.id}
              />
            ))
          ) : (
            <p>No movies available</p> // Fallback message
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
