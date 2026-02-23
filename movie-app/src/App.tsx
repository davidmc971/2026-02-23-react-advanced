import { useState } from "react";
import "./App.css";
import { DataHandler, type Movie } from "./DataHandler";
import MovieList from "./MovieList";

const dataHandler = new DataHandler();

function App() {
  const [movies, setMovies] = useState<Movie[]>(dataHandler.getMovies());

  return (
    <>
      <h1>Movie List</h1>
      <MovieList movies={movies} />
    </>
  );
}

export default App;
