import axios from 'axios';
import moviesActionTypes from './movies.types';


export const getAllMovies = () =>async dispatch => {

    try {
        dispatch({
            type : moviesActionTypes.START_FETCHING
        })

       const res = await axios.get('http://localhost:5000/list_movies')

        dispatch({
            type : moviesActionTypes.GET_MOVIES,
            payload : res.data.movies
        })
        dispatch({
            type : moviesActionTypes.FINISHED_FETCHING
        })

    } catch (error) {
        dispatch({
            type : moviesActionTypes.FETCH_ERROR
        })
    }
}


export const getMovieById = movie_id => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const body = JSON.stringify({body : {movie_id}});

       const res = await axios.post('http://localhost:5000/movie_details' , body ,config)


       dispatch({
        type : moviesActionTypes.FETCH_MOVIE_DETAILS,
        payload : res.data.movie_details
    })


    } catch (error) {
        console.log(error)
    }
}

export const getMovieShowTimes = movie_id => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const body = JSON.stringify({body : {movie_id}});

       const res = await axios.post('http://localhost:5000/show_timings' , body ,config)

       

       dispatch({
        type : moviesActionTypes.FETCH_MOVIE_SHOWTIME,
        payload : res.data.timings
    })


    } catch (error) {
        console.log(error)
    }
}