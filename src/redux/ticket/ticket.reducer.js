import ticketActionTypes from './ticket.types';

const INITIAL_STATE ={
    availableSeats : 0,
    ticketId : null,
    loading:false,
    UpcomingBookings:[]
}

const ticketReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){

        case ticketActionTypes.GET_AVAILABLE_SEATS:
            return {
                ...state,
                loading : false,
                availableSeats : action.payload
            }

        case ticketActionTypes.BOOK_TICKET:
            return {
                ...state,
                loading : false,
                availableSeats : 0,
                ticketId : action.payload
            }

        case ticketActionTypes.GET_UPCOMING_BOOKINGS:
            return{
                ...state,
                UpcomingBookings:action.payload,
                loading:false
            }
        

        case ticketActionTypes.CANCEL_MOVIE:
            return{
                ...state,
                UpcomingBookings: state.UpcomingBookings.filter(booking => 
                                booking.booking_id !== action.payload),
                loading:false
            }
        default:
            return state
    }
}

export default ticketReducer;