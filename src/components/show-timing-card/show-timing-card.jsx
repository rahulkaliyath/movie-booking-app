import React from 'react';
import { Link } from 'react-router-dom';
import './show-timing-card.styles.scss'

const ShowTimingCard = ({props:{date,time,movieId}}) => {

    
    return(
        
        <div className="timing-column">
            <Link to={`${movieId}/${time}`}>
            <div className="timing-card">
            <h3> {time}</h3>
            </div>
            </Link>
        </div>
    )
}

export default ShowTimingCard;