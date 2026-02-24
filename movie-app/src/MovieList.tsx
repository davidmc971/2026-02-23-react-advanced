import { useEffect, useMemo, useState } from "react";
import type { DataHandler, Movie } from "./DataHandler";
import MovieItemEdit from "./MovieItemEdit";

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
  const [editingMovieId, setEditingMovieId] = useState<string | null>(null);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  const filteredMovies = useMemo(() => {
    if (!selectedGenreId) return movies;
    return movies.filter((movie) => movie.genreIds?.includes(selectedGenreId));
  }, [movies, selectedGenreId]);

  useEffect(() => {
    // Ich hab's nochmal nachgeschaut, ja, so geht async-await in useEffects
    (async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list",
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
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    })();
  }, []);

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

  const handleUpdate = (movie: Movie) => {
    dataHandler.updateMovie(movie);
    updateMovies();
    setEditingMovieId(null);
  };

  const handleToggleFavorite = (id: string) => {
    dataHandler.toggleFavorite(id);
    updateMovies();
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <select
        onChange={(e) =>
          setSelectedGenreId(parseInt(e.target.value, 10) ?? null)
        }
      >
        <option value={undefined}>All genres</option>
        {genres?.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            {movie.id === editingMovieId ? (
              <MovieItemEdit movie={movie} onSave={handleUpdate} />
            ) : (
              <>
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <p>Rating: {movie.rating.toFixed(1)}</p>
                <span>
                  <button type="button" onClick={() => handleDelete(movie.id)}>
                    Delete
                  </button>
                  <button type="button" onClick={() => handleRate(movie.id)}>
                    Rate
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingMovieId(movie.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleFavorite(movie.id)}
                  >
                    {movie.isFavorite ? "Unfavorite" : "Favorite"}
                  </button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
