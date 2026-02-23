export type Movie = {
  id: string;
  title: string;
  description: string;
  rating: number;
};

export class DataHandler {
  private movies: Movie[];

  constructor() {
    this.movies = defaultMovies.slice();
  }

  getMovies(): Movie[] {
    return this.movies;
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
