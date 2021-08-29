import React, { useState, useEffect } from 'react';
import { NavLink, Route, useParams, withRouter } from 'react-router-dom';
import {fetchMovieDetails, fetchMovieCredits, fetchMovieReviews} from '../../services/movies-api';
import './MovieDetailsPage.scss';

function MovieDetailsPage ({location, history}) {

    const { id } = useParams();

    const [movieId, setMovieId] = useState(id);
    const [movie, setMovie] = useState({genres:[]});
    // const [cast, setCast] = useState([]);
    // const [reviews, setReviews] = useState([]);

    useEffect(() => {

        async function fetchMovieWithCreditsAndReviews() {

            const data = await fetchMovieDetails(movieId);
            const { title, overview, genres, poster_path, vote_average } = data;

            setMovie({
                poster: poster_path,
                title,
                userScore: vote_average,
                overview,
                genres,
              });
        }

        fetchMovieWithCreditsAndReviews();
    });

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
            {movie.poster && <img src={`https://image.tmdb.org/t/p/w300${movie.poster}`} alt={movie.title} />}
          </div>
          <div>
            <h1 className="detailsTitle">{movie.title}</h1>
            <p className="detailsText">
              <span className="detailsAccent">User score: </span>
              {movie.userScore}
            </p>
            <h2 className="detailsSubtitle">Overview</h2>
            <p className="detailsText">{movie.overview}</p>
            <h2 className="detailsSubtitle">Genres</h2>
            <ul className="GenresList">
              {movie.genres.map(({ name }) => (
                <li className="genreItem" key={name}>
                  <p className="genreName">{name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          {/* <NavLink
            className="navLink"
            activeClassName="navLinkActive"
            to={{
              pathname: `${match.url}/cast`,
              state: {
                from: {
                  ...this.props.location.state.from,
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
                  ...this.props.location.state.from,
                },
              },
            }}
          >
            <p className="additionalDetailsText">Reviews</p>
          </NavLink> */}
        </div>

      </div>
    );
}

export default withRouter(MovieDetailsPage);