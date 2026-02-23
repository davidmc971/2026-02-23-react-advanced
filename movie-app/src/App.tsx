import { useState } from "react";
import "./App.css";
import { DataHandler, type Movie } from "./DataHandler";
import MovieList from "./MovieList";

const dataHandler = new DataHandler();

function App() {
  const [movies, setMovies] = useState<Movie[]>(dataHandler.getMovies());

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

  return (
    <>
      <h1>Movie List</h1>
      <button type="button" onClick={handleAddNewMovie}>
        Add New Movie
      </button>
      <MovieList
        movies={movies}
        dataHandler={dataHandler}
        updateMovies={updateMovies}
      />
    </>
  );
}

export default App;
