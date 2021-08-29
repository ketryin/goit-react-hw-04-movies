import React, { useState } from "react";
import { fetchSearchMovies } from '../services/movies-api';
import MoviesList from '../components/MoviesList/MoviesList';

function MoviesView() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleInput = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        fetchSearchMovies(query)
            .then(response => { 
                const movies = response.results.map(({ id, original_title }) => ({ id, original_title }));
                setMovies(movies);
            });
    };

    return  (
    <div className="moviesBox">
        <div className="miviesInput">
            <input
                autoFocus
                className="movieInput"
                placeholder="What are you looking for?"
                value={query}
                type="text"
                autoComplete="off"
                onChange={handleInput}
            />
            <button className="searchButton" type="button" onClick={handleSearch}>
                Search
            </button>
        </div>
        <MoviesList movies={movies} />
    </div>
  );
}

export default MoviesView;