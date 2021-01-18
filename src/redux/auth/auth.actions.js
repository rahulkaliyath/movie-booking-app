import axios from 'axios';
import authActionTypes from './auth.types';


export const login = (email,password) =>async dispatch => {

    try {
        
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const body = JSON.stringify({email,password});
        

       const res = await axios.post('http://localhost:5000/login', body ,config);

        if (res.data.status === 'error'){
            throw res.data.message
        }
        dispatch({
            type : authActionTypes.LOGIN_SUCCESS,
            payload : res.data
        })
        

    } catch (error) {
        dispatch({
            type : authActionTypes.LOGIN_FAIL,
            payload : error
        })
    }
}


export const logout = () => async dispatch => {
    try {
        dispatch({
            type : authActionTypes.LOGOUT_SUCCESS
        })
        
    } catch (error) {
        
    }
}