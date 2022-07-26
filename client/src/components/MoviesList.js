
import React from 'react';

const MovieList = (props) => {
    return (
        <div class="container">
            <ul>
            {props.movies.map(movie => {
                return (
                    <span><li key={movie.id}>
                    moviesName : {movie.moviesName} &nbsp;&nbsp;&nbsp;&nbsp; 
                    ReleaseDate : {movie.releaseDate} &nbsp;&nbsp;&nbsp;&nbsp; 
                    Rating : {movie.rating}
                    </li></span>
                )
            })}

            </ul>
           
        </div>
    )
}

export default MovieList;