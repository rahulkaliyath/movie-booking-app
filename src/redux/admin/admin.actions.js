import axios from 'axios';
import adminActionTypes from './admin.types';


export const addShowTime = (movie_id,date,time,seats,jwt_token) =>async dispatch => {

    try {
        seats = Number(seats)
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const body = JSON.stringify({jwt_token,body:{movie_id,show_time:{date,[time]:seats}}});
        

       const res = await axios.post('http://localhost:5000/add_show_time', body ,config);

    

    //     if (res.data.status === 'error'){
    //         throw res.data.message
    //     }
        dispatch({
            type : adminActionTypes.ADD_SHOW_TIME
        })

        alert("Added Show time")
        

    } catch (error) {
        // dispatch({
        //     type : authActionTypes.LOGIN_FAIL,
        //     payload : error
        // })
    }
}


