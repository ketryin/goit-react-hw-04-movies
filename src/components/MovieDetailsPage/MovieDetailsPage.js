import React, { useState, useEffect } from 'react';
import { NavLink, Route, useParams, withRouter } from 'react-router-dom';
import {fetchMovieDetails, fetchMovieCredits, fetchMovieReviews} from '../../services/movies-api';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import './MovieDetailsPage.scss';

function MovieDetailsPage ({location, history, match}) {

    const { id } = useParams();

    const [movieId, setMovieId] = useState(id);
    const [movie, setMovie] = useState();
    const [cast, setCast] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        async function fetchMovieWithCreditsAndReviews() {

          if (movie) {
            return;
          }

          const details = await fetchMovieDetails(movieId);
          const { title, overview, genres, poster_path, vote_average } = details;

          setMovie({
              poster: poster_path,
              title,
              userScore: vote_average,
              overview,
              genres,
            });
          
          const movieCredits = await fetchMovieCredits(movieId);
          setCast(movieCredits.cast.map(({ cast_id, name, character, profile_path }) => ({
            name,
            character,
            photo: profile_path,
            id: cast_id,
          })));

          const movieReviews = await fetchMovieReviews(movieId);
          setReviews(movieReviews.results.map(({ author, id, content }) => ({ author, id, text: content })));
        }

        fetchMovieWithCreditsAndReviews();
    }, [movie, setMovie]);

  const handleExit = () => {
    const { state } = location;
    let from;
    if (state && state.from) {
      const { pathname, search } = state.from;
      from = pathname + search;
    } else {
      from = '/';
    }
    history.push(from);
  };


    return (
      <div className="detailsContainer">
        <button className="returnButton" type="button" onClick={handleExit}>
            &#10229; Return
        </button>
        <div className="detailsBox">
          <div className="posterBox">
            {movie?.poster && <img src={`https://image.tmdb.org/t/p/w300${movie?.poster}`} alt={movie?.title} />}
          </div>
          <div>
            <h1 className="detailsTitle">{movie?.title}</h1>
            <p className="detailsText">
              <span className="detailsAccent">User score: </span>
              {movie?.userScore}
            </p>
            <h2 className="detailsSubtitle">Overview</h2>
            <p className="detailsText">{movie?.overview}</p>
            <h2 className="detailsSubtitle">Genres</h2>
            <ul className="GenresList"> 
              {movie?.genres?.map(({ name }) => (
                <li className="genreItem" key={name}>
                  <p className="genreName">{name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="box">
          <p className="additional">Additional information</p>
          <NavLink
            className="navLink"
            activeClassName="navLinkActive"
            to={{
              pathname: `${match.url}/cast`,
              state: {
                from: {
                  ...location.state.from,
                },
              },
            }}
          >
            <p className="additionalDetailsText">Cast</p>
          </NavLink>
          <NavLink
            className="navLink"
            activeClassName="navLinkActive"
            to={{
              pathname: `${match.url}/reviews`,
              state: {
                from: {
                  ...location.state.from,
                },
              },
            }}
          >
            <p className="additionalDetailsText">Reviews</p>
          </NavLink>
        </div>
        
        <Route path={`${match.path}/cast`} render={props => <Cast {...props} cast={cast} />} />
        <Route
          path={`${match.path}/reviews`}
          render={props => <Reviews {...props} reviews={reviews} />}
        />
      </div>
    );
}

export default withRouter(MovieDetailsPage);