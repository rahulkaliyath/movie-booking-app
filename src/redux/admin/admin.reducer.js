import adminActionTypes from './admin.types';

const INITIAL_STATE ={
    jwt_token : null,
    loading:false,
    error:null,
    isAuthenticated: false
}

const adminReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){

        case adminActionTypes.ADD_SHOW_TIME:
            return {
                ...state,
                loading : false
            }


        default:
            return state
    }
}

export default adminReducer;