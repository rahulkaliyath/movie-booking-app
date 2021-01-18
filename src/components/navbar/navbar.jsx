import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../redux/auth/auth.actions';
import './navbar.styles.scss'

const Navbar = ({isAuthenticated,logout,userId}) => {


    return(
        <div className="nav">
  <input type="checkbox" id="nav-check"/>
  <div className="nav-header">
    <div className="nav-title">
      Movie Booking App
    </div>
  </div>
  <div className="nav-btn">
    <label className="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div className="nav-links">
    { userId === 'admin' ? <Link to='/admin'>Admin</Link> : ''}
    
    <Link to='/now_showing'>Now Showing</Link>
    <Link to="/bookings" >Bookings</Link>
    {
      isAuthenticated ? <a onClick={logout} href="#!">Log Out</a> 
      : <Link to='/login'>Log In</Link>
    }
  </div>
</div>
    )
};


const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated,
  userId : state.auth.userId
})



export default connect(mapStateToProps,{logout})(Navbar);