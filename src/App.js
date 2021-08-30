import React, { Suspense, lazy } from 'react';
import {  Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';

const HomeView = lazy(() => import('./views/HomeView'));
const MoviesView = lazy(() =>
  import('./views/MoviesView'),
);
const MovieDetailsPage = lazy(() =>
  import('./components/MovieDetailsPage/MovieDetailsPage'),
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>Загружаем...</h1>}>
        <Route path="/" exact>
          <HomeView />
        </Route>
        <Route path="/movies" exact>
          <MoviesView />
        </Route>
        <Route path="/movies/:id">
          <MovieDetailsPage />
        </Route>
        </Suspense>
    </Container>
  );
}
