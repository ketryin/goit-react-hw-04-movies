import React, { useState, useEffect } from 'react';
import MoviesList from '../components/MoviesList/MoviesList';
import {fetchTrending} from '../services/movies-api';

function HomeView() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {

        if (movies.length > 0) {
            return;
        }

        fetchTrending()
            .then(response => { 
                const movies = response.results.map(({ id, original_title }) => ({ id, original_title }));
                setMovies(movies);
            });
    }, [movies, setMovies]);

    return (
        <>
            <h1>Trending movies today:</h1>
            <MoviesList movies={movies} />
        </>
    );
}

export default HomeView;