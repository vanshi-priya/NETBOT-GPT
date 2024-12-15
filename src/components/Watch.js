import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { API_OPTIONS, LOGO } from "../utils/constants";
import { useParams } from "react-router-dom";
import { addTrailerVideo } from "../utils/moviesSlice";
import MovieList from "./MovieList";
import photo from "../assets/image.png";

const Watch = () => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const { movieID } = useParams();
  const [recommendations, setRecommendations] = useState([]);

  const movies = useSelector((store) => store.movies);

  const fetchData = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieID +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterData?.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  const getMovieSuggestions = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieID +
          "/recommendations?language=en-US&page=1",
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const media = await response.json();
      setRecommendations(media.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    getMovieSuggestions();
  }, [movieID]);

  return (
    <>
      {/* Navbar styling */}
      <div className="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-transparent px-6 py-3 md:px-8 md:py-4 flex justify-between items-center">
        <a href="/browse" className="text-white">
          <img className="w-36 md:w-48" src={photo} alt="logo" />
        </a>
      </div>

      {/* Trailer section */}
      <div className="relative md:h-screen min-w-full max-w-full mt-[-4rem]">
        <iframe
          className="h-[300px] md:h-full w-full mt-[4rem] md:mt-0"
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?&autoplay=1&mute=0&loop=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* Recommendations section styling */}
      <div className="bg-gradient-to-t  from-gray-900 to-black text-white p-0 md:p-8 lg:p-8 space-y-4">
        {/* <h2 className="text-lg md:text-2xl font-semibold text-center md:text-left">Recommendations</h2> */}
        <MovieList title="Recommendations" movies={recommendations} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
      </div>
    </>
  );
};

export default Watch;
