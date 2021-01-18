import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getMovieById} from '../../redux/movies/movies.actions';
import './booking-page-card.styles.scss'

const BookingPageCard = ({movie,movieId,getMovieById}) => {


    useEffect ( () => {
        getMovieById(movieId)
    },[getMovieById]) 

    const {movie_id,movie_name,genre,duration,description,img_url} = movie;

    return(
    
    <div className="wrapper">
        <div className="booking-main_card">
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
 
                                  
                </div>	
                </div>
            </div>
            <div className="card_right">
                <div className="img_container">
                    <img src={img_url}  style={{height:"300px"}} alt=""/>
                    </div>
                    
                </div>
            </div>
        </div>

       
    )
}

const mapStateToProps = state => ({
    movie : state.movie.movie
})


export default connect(mapStateToProps,{getMovieById})(BookingPageCard);