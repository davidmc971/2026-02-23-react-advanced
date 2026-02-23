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
          </span>
        </li>
      ))}
    </ul>
  );
}
