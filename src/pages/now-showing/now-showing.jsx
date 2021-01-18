import React, {useEffect }  from 'react';
import MovieCard from '../../components/movie-card/movie-card';
import {connect} from 'react-redux';
import {getAllMovies} from '../../redux/movies/movies.actions';

const NowShowing = ({getAllMovies,movies}) => {

    useEffect ( () => {
        getAllMovies()
    },[getAllMovies])

    return(
        <div>
            { movies.map(movie => 
            <MovieCard key={movie.movie_id} movie={movie}/>) }
            
        </div>
    )
}

const mapStateToProps = state => ({
    movies : state.movie.movies
})

export default connect(mapStateToProps,{getAllMovies})(NowShowing);