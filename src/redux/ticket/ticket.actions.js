import axios from 'axios';
import ticketActionTypes from './ticket.types';


export const getSeatsAvailable = (movie_id,date,time) =>async dispatch => {

    try {

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const body = JSON.stringify({body : {movie_id, date,time}});

       const res = await axios.post('http://localhost:5000/check_availability' , body ,config) 

       dispatch({
        type : ticketActionTypes.GET_AVAILABLE_SEATS,
        payload : res.data.available_seats
        })


    } catch (error) {
        console.log(error)
    }
}



export const bookTicket = (movie_id,date,time,seats,jwt_token,history) =>async dispatch => {

    try {

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const body = JSON.stringify({body : {movie_id, date,time,seats},jwt_token});

       const res = await axios.post('http://localhost:5000/book_ticket' , body ,config)


       dispatch({
        type : ticketActionTypes.BOOK_TICKET,
        payload : res.data.booking_details.booking_id
        })

        history.push('/bookings/upcoming');


    } catch (error) {
        console.log(error)
    }
}

export const getUpcomingBookings = jwt_token =>async dispatch => {

    try {

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const body = JSON.stringify({jwt_token});

       const res = await axios.post('http://localhost:5000/get_upcoming_bookings' , body ,config)


       dispatch({
        type : ticketActionTypes.GET_UPCOMING_BOOKINGS,
        payload : res.data
        })


    } catch (error) {
        console.log(error)
    }
}

export const cancelMovie = (jwt_token,movie_id,booking_id) =>async dispatch => {

    try {

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const body = JSON.stringify({jwt_token, body:{movie_id,booking_id}});

       const res = await axios.post('http://localhost:5000/cancel_ticket' , body ,config)

    if(res.data.status === "success"){
       dispatch({
        type : ticketActionTypes.CANCEL_MOVIE,
        payload : booking_id
        })
    }
    else{
        throw res.data.message
    }


    } catch (error) {
        alert(error)
    }
}

