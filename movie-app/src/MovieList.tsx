import type { DataHandler, Movie } from "./DataHandler";

type MovieListProps = {
  movies: Movie[];
  dataHandler: DataHandler;
  updateMovies: () => void;
};

export default function MovieList({
  movies,
  dataHandler,
  updateMovies,
}: MovieListProps) {
  const handleDelete = (id: string) => {
    dataHandler.deleteMovie(id);
    updateMovies();
  };

  const handleRate = (id: string) => {
    const ratingInput = prompt("Enter a rating (1 - 10):");
    if (ratingInput === null) return;

    const rating = parseFloat(ratingInput);
    if (Number.isNaN(rating) || rating < 1 || rating > 10) {
      alert("Invalid rating!");
      return;
    }

    dataHandler.rateMovie(id, rating);
    updateMovies();
  };

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <p>Rating: {movie.rating}</p>
          <span>
            <button type="button" onClick={() => handleDelete(movie.id)}>
              Delete
            </button>
            <button type="button" onClick={() => handleRate(movie.id)}>
              Rate
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
}
