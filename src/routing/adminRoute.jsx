import React  from 'react';
import { Redirect, Route } from 'react-router-dom';
import {connect} from 'react-redux';

const AdminRoute = ({component: Component,auth:{isAuthenticated,userId},...otherprops}) => (
    <Route {...otherprops} render={props => !isAuthenticated || userId !=='admin' ? 
       
        (<Redirect to='/login' />) :
         ( <Component {...props} />)}/>
        );

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AdminRoute);
   