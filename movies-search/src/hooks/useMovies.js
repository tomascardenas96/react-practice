import { useCallback, useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;

    try {
        setLoading(true);
      const foundMovies = await searchMovies({ search });
      setMovies(foundMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
        setLoading(false);
    }
  }, []);

  return { movies, getMovies, loading };
}
