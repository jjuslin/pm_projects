import React from 'react';
import {FaUsers} from 'react-icons/fa';
import {Link} from '@reach/router'

function Navigation(props) {
    const user =props.user;
    const logOutUser= props.logOutUser;
    return(
      <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <FaUsers className="mr-1" /> Preventive Maintenace Trascking System
        </Link>
        <div className="navbar-nav ml-auto">
          {user && (
            <Link className="nav-item nav-link" to="/listproject">
              Project List
            </Link>
          )}
          {!user && (
            <Link className="nav-item nav-link" to="/login">
              log in
            </Link>
          )}
          {!user && (
            <Link className="nav-item nav-link" to="/register">
              register
            </Link>
          )}
          {user && (
            <Link className="nav-item nav-link" to="/logout"
            onClick = { e=> logOutUser(e)}>
              log out
            </Link>
          )}
        </div>
      </div>
    </nav>
    );
}

export default Navigation ; 