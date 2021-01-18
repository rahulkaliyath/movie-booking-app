import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {getSeatsAvailable,bookTicket} from '../../redux/ticket/ticket.actions';
import './booking-page.styles.scss'

const BookingPage = ({match,movieName,getSeatsAvailable, availableSeats,jwt_token,bookTicket,history}) => {
    const {movieId,date,time} = match.params;

    const [seats, setSeats] = useState(1);

    useEffect ( () => {
       getSeatsAvailable(movieId,date,time)
    },[]) 

    const handleChange = event => {
        const {value} = event.target;
        setSeats(value)
     }

    const handleSubmit = event => {
        event.preventDefault();
        
        if (seats > availableSeats){
            alert(`Only ${availableSeats} seats available. Select maximum of ${availableSeats} seats ${seats}`)
            return
        }

        bookTicket(movieId,date,time,seats,jwt_token,history)

    }

    return(
        <div>
            <form className='booking-form' onSubmit={handleSubmit}>
        <label >Movie Name</label>
        <input type="text" name="name" id="name" value={`${movieName}`} disabled/>
        <label >Date</label>
        <input type="text" name="date" id="email" value={`${date}`} disabled/>
        <label >Time</label>
        <input type="text" name="time" id="email" value={`${time}`}  disabled/>
        <label >Available Seats</label>
        <input type="text" name="time" id="email" value={`${availableSeats}`}  disabled/>
        <label >Number of Tickets</label>
        <select name="passes" id="passes" onChange={handleChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>

        </select>
        <label style={{marginBottom:0}}></label>
        <button type='submit'>Buy {seats} {seats > 1 ? `Tickets`: 'Ticket'} </button>
</form>
        </div>
    )
}

const mapStateToProps = state => ({
    movieName : state.movie.movie.movie_name,
    availableSeats : state.ticket.availableSeats,
    jwt_token : state.auth.jwt_token
})

export default connect(mapStateToProps,{getSeatsAvailable,bookTicket})(BookingPage);