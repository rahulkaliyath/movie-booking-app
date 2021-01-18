import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import BookedMovieCard from '../../components/booked-movie-card/booked-movie-card';
import {getUpcomingBookings} from '../../redux/ticket/ticket.actions';

const UpcomingBookings = ({jwt_token ,getUpcomingBookings,UpcomingBookings}) => {

    const [seats, setSeats] = useState(1);

    useEffect ( () => {
        getUpcomingBookings(jwt_token)
    },[]) 

    const handleChange = event => {
        const {value} = event.target;
        setSeats(value)
     }

    const handleSubmit = event => {
        event.preventDefault();
        

    }

    return(
        <div>
            <div>
                <h1>Upcoming Bookings</h1>
                {UpcomingBookings && UpcomingBookings.map(booking => 
                    <BookedMovieCard  key={booking.booking_id} details={booking} jwt_token={jwt_token}/>)}
            </div>


        </div>
    )
}

const mapStateToProps = state => ({
    jwt_token : state.auth.jwt_token,
    UpcomingBookings : state.ticket.UpcomingBookings
})

export default connect(mapStateToProps,{getUpcomingBookings})(UpcomingBookings);