import moviesActionTypes from './movies.types';

const INITIAL_STATE ={
    movies:[],
    loading:false,
    movie: [],
    show_timings : []
}

const moviesReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){

        case moviesActionTypes.GET_MOVIES:
            return {
                ...state,
                loading : false,
                movies : action.payload
            }

        case moviesActionTypes.START_FETCHING:
            return {
                ...state,
                loading : true
            }

        case moviesActionTypes.FINISHED_FETCHING:
            return {
                ...state,
                loading : false
            }

        case moviesActionTypes.FETCH_ERROR:
            return {
                ...state,
                movies: [],
                loading : false
            }

        case moviesActionTypes.FETCH_MOVIE_DETAILS:
            return{
                ...state,
                movie : action.payload,
                loading: false
            }

        case moviesActionTypes.FETCH_MOVIE_SHOWTIME:
            return {
                ...state,
                show_timings : action.payload,
                loading: false
            }

        default:
            return state
    }
}

export default moviesReducer;