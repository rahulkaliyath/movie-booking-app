import React, {useEffect }  from 'react';
import {connect} from 'react-redux';
import BookingPageCard from '../../components/booking-page-card/booking-page-card';
import ShowsOverview from '../../components/shows-overview/shows-overview';

const MovieBooking = ({match}) => {

    useEffect ( () => {
       
    },[])

    return(
        <div  >
            <BookingPageCard movieId={match.params.movieId}/>
            <ShowsOverview movieId={match.params.movieId}/>
            
        </div>
    )
}

const mapStateToProps = state => ({
    movies : state.movie.movies
})

export default connect(mapStateToProps)(MovieBooking);