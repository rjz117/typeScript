import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovies from './components/AddMovies'

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [myError, setMyError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://react-b8154-default-rtdb.firebaseio.com/movie.json");
      if(!response.ok) {
        throw new Error('Something Went Wrong. :(');
      }
      const data = await response.json();
      const loadedMovies = [];
      for(const key in data) {
        loadedMovies.push({
          id : key,
          title : data[key].title,
          openingText : data[key].openingText,
          releaseDate : data[key].releaseDate,
        })
      }

      const transformedMovies = loadedMovies.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          openingText: movie.openingText,
          releaseDate: movie.releaseDate,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setMyError(error.message);
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchMovieHandler()
  },[fetchMovieHandler])

  const addMovieHandler = async (movie) => {
    const response = await fetch("https://react-b8154-default-rtdb.firebaseio.com/movie.json", {
      method : 'POST',
      body : JSON.stringify(movie),
      headers : {
        'content-type' : 'aplication/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <React.Fragment>
      <section >
        <AddMovies onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>  
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !myError && <p>No Movies yet :( </p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && myError && <p>{myError}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
