import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import styles from "./App.module.css";
import { DataHandler, type Movie } from "./DataHandler";
import MovieList from "./MovieList";
import { useDispatch, useSelector } from "react-redux";
import { increment, selectCount } from "./redux/slices/counterSlice";
// import { counterSlice } from "./redux/slices/counterSlice";

const dataHandler = new DataHandler();

function App() {
  const [movies, setMovies] = useState<Movie[]>(dataHandler.getMovies());
  const counter = useSelector(selectCount);
  const dispatch = useDispatch();
  // const counter = useSelector(counterSlice.selectors.selectCount);

  useEffect(() => {
    console.log("useEffect");

    const intervalId = setInterval(() => {
      dispatch(increment());
      // dispatch(counterSlice.actions.increment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const updateMovies = () => {
    // Wir nutzen die Methode slice() um eine Kopie des Arrays zu erstellen
    // da React ohne neue Referenz zu einem Array keine Änderungen registriert
    //
    // Alternativ könnten wir im DataHandler bei jeder Methode, die das
    // movies-Array verändert, eine neue Referenz erstellen, beispielsweise
    // indem wir das Array mit map() oder filter() kopieren anstatt es direkt
    // zu verändern.
    setMovies(dataHandler.getMovies().slice());
  };

  const handleAddNewMovie = () => {
    dataHandler.addNewMovie();
    updateMovies();
  };

  const handleFetchMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie",
      {
        headers: {
          // Der API-Schlüssel wird aus den Umgebungsvariablen geladen, wobei
          // der Präfix VITE_ notwendig ist, damit Vite die Variable zur Laufzeit
          // im Browser verfügbar macht. Vorsicht: Niemals geheime Schlüssel im
          // Frontend-Code verwenden, sofern diese nicht öffentlich sein dürfen!
          // Man kann diesen Schlüssel aus der Website extrahieren.
          Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    type TMDBMovie = {
      id: number;
      title: string;
      overview: string;
      vote_average: number;
      genre_ids: number[];
    };

    const data: { results: TMDBMovie[] } = await response.json();

    dataHandler.addMovies(
      data.results.map((movie) => ({
        id: movie.id.toString(),
        title: movie.title,
        description: movie.overview,
        rating: movie.vote_average,
        genreIds: movie.genre_ids,
      })),
    );

    updateMovies();
  };

  const handleResetMovies = () => {
    dataHandler.resetMovies();
    updateMovies();
  };

  return (
    <>
      <div>
        <p>Counter: {counter}</p>
      </div>
      <h1>Movie List</h1>
      <ul className={styles.nav}>
        <li>
          <Link to="/">Movie List</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <button type="button" onClick={handleAddNewMovie}>
                Add New Movie
              </button>
              <button type="button" onClick={handleFetchMovies}>
                Fetch Movies
              </button>
              <button type="button" onClick={handleResetMovies}>
                Reset Movies
              </button>
              <MovieList
                movies={movies}
                dataHandler={dataHandler}
                updateMovies={updateMovies}
              />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <MovieList
              movies={movies.filter((movie) => movie.isFavorite)}
              dataHandler={dataHandler}
              updateMovies={updateMovies}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
