import React from "react";

function ListOfMovies({ movies }) {
  return (
    <>
      <div>
        {movies.map((movie) => (
          <ul key={movie.id}>
            <li>{movie.title}</li>
            <li>{movie.year}</li>
            <img src={movie.image} alt={movie.title} />
            </ul>
            ))}
      </div>
    </>
  );
}

function NoMoviesResults() {
    return (
        <p>No se han encontrado peliculas.</p>
    )
}

export default function Movies({ movies }) {
    const hasMovies = movies?.length > 0;

    return (
        hasMovies 
        ? <ListOfMovies movies={movies} />
        : <NoMoviesResults />
    )
}
