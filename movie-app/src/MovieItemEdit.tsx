import { useState } from "react";
import type { Movie } from "./DataHandler";
import styles from "./MovieItemEdit.module.css";

type MovieItemEditProps = {
  movie: Movie;
  onSave: (movie: Movie) => void;
};

export default function MovieItemEdit({ movie, onSave }: MovieItemEditProps) {
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="button"
        onClick={() => onSave({ ...movie, title, description })}
      >
        Save
      </button>
    </div>
  );
}
