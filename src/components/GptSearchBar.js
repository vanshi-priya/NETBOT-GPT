import React, { useRef } from 'react';
import lang from '../utils/langConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const searchMovieTMDB = async (movie) => {
     const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS );
     const json = await data.json();
     return json.results;
    }

    const handleGptSearchClick = async() => {
        console.log(searchText.current.value);
        //Make an API call to GPT API & get the movies results

     const gptQuery = "Act as a movie recommendation system and suggest some movies for the query" + searchText.current.value + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar2, Sholay, Don, Jigra, Maharaja";

      const gptResults =  await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
          });

          if(!gptResults.choices){
             //TODO: Write Error Handling
          }

          console.log(gptResults.choices?.[0]?.message?.content);
          const gptMovies =  gptResults.choices?.[0]?.message?.content.split(",")

          //for each movie I will search TMDB API

          const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));
          // [promise, promise, promise, promise, promise]

          const tmdbResults = await Promise.all(promiseArray);
          console.log(tmdbResults);

          dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
    };
  return (
    <div className="pt-[35%]  md:pt-[10%] flex justify-center">
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
        <input ref={searchText} type="text" className="p-4 m-4 col-span-9" placeholder={lang[langKey].getSearchPlaceholder} />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg " onClick={handleGptSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar;


