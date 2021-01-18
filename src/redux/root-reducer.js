import {combineReducers} from 'redux';
import moviesReducer from './movies/movies.reducer';
import authReducer from './auth/auth.reducer';
import ticketReducer from './ticket/ticket.reducer';
import adminReducer from './admin/admin.reducer';


const rootReducer = combineReducers({
    movie : moviesReducer,
    auth : authReducer,
    ticket : ticketReducer,
    admin : adminReducer
});

export default rootReducer;
