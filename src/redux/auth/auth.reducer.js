import authActionTypes from './auth.types';

const INITIAL_STATE ={
    jwt_token : null,
    userId:null,
    userName:null,
    loading:false,
    error:null,
    isAuthenticated: false
}

const authReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){

        case authActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading : false,
                userId : action.payload.user_id,
                userName :action.payload.user,
                jwt_token : action.payload.jwt_token,
                isAuthenticated :true
            }

        case authActionTypes.LOGIN_FAIL:
        case authActionTypes.LOGOUT_SUCCESS:
                return {
                    ...state,
                    loading : false,
                    userId : null,
                    userName :null,
                    error : action.payload,
                    isAuthenticated :false,
                    jwt_token : null
                }

        default:
            return state
    }
}

export default authReducer;