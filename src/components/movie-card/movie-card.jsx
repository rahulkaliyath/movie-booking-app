import React from 'react';
import { Link } from 'react-router-dom';
import './movie-card.styles.scss'

const MovieCard = ({movie}) => {

    const {movie_id,movie_name,genre,duration,description,img_url} = movie;

    return(

    <div className="wrapper">
        <div className="main_card">
            <div className="card_left">
                <div className="card_datails">
                    <h1>{movie_name}</h1>
                    <div className="card_cat">
                        <p className="PG">PG - 13</p>
                        <p className="year">2018</p>
                        <p className="genre">{genre} </p>
                        <p className="time">{duration}</p>
                    </div>
                    <p className="disc">{description}</p>
                   
                <div className="social-btn">
 
                                  
                    <Link to={`/movie/${movie_id}`} className='movie-button' movie={movie}> 
                         Book Tickets
                    </Link>
                   

                </div>	
                </div>
            </div>
            <div className="card_right">
                <div className="img_container">
                    <img src={img_url} alt=""/>
                    </div>
                    
                </div>
            </div>
        </div>

       
    )
}

export default MovieCard;