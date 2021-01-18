import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {cancelMovie} from '../../redux/ticket/ticket.actions';
import './booked-movie-card.styles.scss'

const BookedMovieCard = ({details,jwt_token,cancelMovie}) => {

    const {movie_name,booking_id,seats,booked_on,show_time,duration,movie_id} = details;

    return(

        <div class="booked-card">
  {/* <div class="bg-img"></div> */}
  <div class="content">
    <h3>{movie_name}</h3>
    
    <p>Date: {show_time}</p>
    {/* <p>Time: 12-45PM</p> */}
    <p>Seats: {seats}</p>
    <p>Booking Id : {booking_id}</p>
    <p>Booked At : {booked_on}</p> 
    <button onClick={() => cancelMovie(jwt_token,movie_id,booking_id)}>Cancel Tickets</button> </div>
</div>

       
    )
}

export default connect(null,{cancelMovie})(BookedMovieCard);