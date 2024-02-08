import React, { useEffect, useState } from "react";
import { searchMovies } from "../services/movies";
import { useSearch } from "../hooks/useSearch";
import { useMovies } from "../hooks/useMovies";
import Movies from "./Movies";

function SearchEngine() {
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search });

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <>
      <main>
        <div>
          <h1>Buscador de peliculas</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Avengers, Star wars, Matrix..."
              onChange={handleChange}
            />
            <input type="submit" value="Buscar" />
          </form>
        </div>
        {error && error}
      </main>

      {loading ? <h1>Loading...</h1> : <Movies movies={movies} />}
    </>
  );
}

export default SearchEngine;
