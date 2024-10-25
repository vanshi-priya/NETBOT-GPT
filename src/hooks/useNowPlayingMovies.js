import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import { useEffect } from 'react';

const useNowPlayingMovies = () => {
    // Fetch data from TMDB API and update store

    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);
    
    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
      const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTIONS);
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    }
  
    useEffect(() => {
     !nowPlayingMovies && getNowPlayingMovies();
    }, []);
}

export default useNowPlayingMovies;

