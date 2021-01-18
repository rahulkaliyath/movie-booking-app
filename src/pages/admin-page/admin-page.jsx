import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

const AdminPage = ({}) => {

    return(
        <div>
            <div>
                <h1>Welcome, Admin</h1>
                <Link to='/add-show-time'>Add Show Time</Link>
            </div>


        </div>
    )
}



export default connect(null,{})(AdminPage);