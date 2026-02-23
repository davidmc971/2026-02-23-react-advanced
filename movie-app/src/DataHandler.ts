export type Movie = {
  id: string;
  title: string;
  description: string;
  rating: number;
};

export class DataHandler {
  private movies: Movie[];
  private nextId: number;

  constructor() {
    this.movies = defaultMovies.slice();
    const maxId = this.movies.reduce(
      // Callback
      (acc, movie) => Math.max(acc, parseInt(movie.id, 10)),
      // Initialer Wert des Akkumulators
      0,
    );
    this.nextId = maxId + 1;
  }

  getMovies(): Movie[] {
    return this.movies;
  }

  deleteMovie(id: string): void {
    const indexToDelete = this.movies.findIndex((movie) => movie.id === id);
    if (indexToDelete !== -1) {
      this.movies.splice(indexToDelete, 1);
    }
  }

  addNewMovie(): void {
    const id = this.nextId.toString();
    this.nextId++;

    const newMovie: Movie = {
      id,
      title: `New Movie ${id}`,
      description: "New Movie Description",
      rating: 0,
    };

    this.movies.push(newMovie);
  }

  rateMovie(id: string, rating: number): void {
    const movie = this.movies.find((movie) => movie.id === id);
    if (movie) {
      movie.rating = rating;
    }
  }

  updateMovie(movie: Movie): void {
    const indexToUpdate = this.movies.findIndex((m) => m.id === movie.id);
    if (indexToUpdate !== -1) {
      this.movies[indexToUpdate] = movie;
    }
  }
}

const defaultMovies: Movie[] = [
  {
    id: "1",
    title: "Movie Title",
    description: "Movie Description",
    rating: 5,
  },
  {
    id: "2",
    title: "Movie Title 2",
    description: "Movie Description 2",
    rating: 4,
  },
  {
    id: "3",
    title: "Movie Title 3",
    description: "Movie Description 3",
    rating: 3,
  },
  {
    id: "4",
    title: "Movie Title 4",
    description: "Movie Description 4",
    rating: 2,
  },
  {
    id: "5",
    title: "Movie Title 5",
    description: "Movie Description 5",
    rating: 1,
  },
];
