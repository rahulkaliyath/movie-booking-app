import React,{useEffect} from 'react';
import Shows from '../shows/shows';
import {connect} from 'react-redux';
import {getMovieShowTimes} from '../../redux/movies/movies.actions';
import './shows-overview.styles.scss'

const ShowsOverview = ({movieId,getMovieShowTimes,showTimings}) => {

    useEffect ( () => {
        getMovieShowTimes(movieId)
    },[getMovieShowTimes]) 


    return(
        <div>

            <div>
                <h1>Show Timings</h1> 
            </div>
           
            {showTimings && showTimings.map(show =>
             
                <Shows  showTiming={show} movieId={movieId}/>
            )}
            
        
        </div>
    )
}

const mapStateToProps = state => ({
    showTimings : state.movie.show_timings
})

export default connect(mapStateToProps,{getMovieShowTimes})(ShowsOverview);