import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { fetchSearchMovies } from '../services/movies-api';
import MoviesList from '../components/MoviesList/MoviesList';

function MoviesView({ location, history, match }) {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const queryParams = Object.fromEntries(urlSearchParams.entries());

        if (queryParams.query && movies.length === 0) {
            handleInput(queryParams.query);
            handleSearch(queryParams.query);
        }
    }, [query, movies, handleInput, handleSearch]);

    function handleInput(value) {
        setQuery(value);
    };

    function handleSearch(query) {
        fetchSearchMovies(query)
            .then(response => {
                match.params.query = query;
                history.push(`/movies?query=${match.params.query}`);

                const movies = response.results.map(({ id, original_title }) => ({ id, original_title }));
                setMovies(movies);
            });
    };

    return (
        <div className="moviesBox">
            <div className="miviesInput">
                <input
                    autoFocus
                    className="movieInput"
                    placeholder="What are you looking for?"
                    value={query}
                    type="text"
                    autoComplete="off"
                    onChange={e => handleInput(e.target.value)}
                />
                <button className="searchButton" type="button" onClick={e => handleSearch(query)}>
                    Search
                </button>
            </div>
            <MoviesList movies={movies} />
        </div>
  );
}

export default withRouter(MoviesView);