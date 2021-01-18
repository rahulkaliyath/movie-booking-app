import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

const UserBookings = ({jwt_token}) => {

    const [seats, setSeats] = useState(1);

    useEffect ( () => {

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
            <Link to='/bookings/upcoming'>Upcoming Bookings</Link>
            
            </div>

            
    )
}

const mapStateToProps = state => ({
    jwt_token : state.auth.jwt_token
})

export default connect(mapStateToProps,{})(UserBookings);