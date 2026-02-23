import type { Movie } from "./DataHandler";

export default function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <p>Rating: {movie.rating}</p>
        </li>
      ))}
    </ul>
  );
}
