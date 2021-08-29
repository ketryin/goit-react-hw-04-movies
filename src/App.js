import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import HomeView from './views/HomeView';
import MoviesView from './views/MoviesView';
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";


export default function App() {
  return (
    <Container>
      <AppBar />

      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
        <Route path="/movies" exact>
          <MoviesView />
        </Route>
        <Route path="/movies/:id">
          <MovieDetailsPage />
        </Route>
      </Switch>
    </Container>
  );
}
