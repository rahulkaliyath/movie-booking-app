import React from 'react';
import { Link } from 'react-router-dom';
import './shows.styles.scss';

const Shows = ({showTiming,movieId}) => {

   const {times,date} = showTiming;
   
 
    return(
        <div>
        
            <h2>{date}</h2>


            <div className="timing-row"> 
            {times.map(time => 
                (<div className="timing-column">
                    <Link to={`/book/${movieId}/${date}/${time}`}>
                    <div className="timing-card">
                        <h3> {time}</h3>
                    </div>
                    </Link>
                </div>)
            )
            }
            </div>
        
        </div>
    )
}

export default Shows;