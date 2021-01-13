import React from 'react';
import {Link} from '@reach/router'

function Welcome(props) {
    const userName =props.userName;
    const logOutUser = props.logOutUser;
    return(
        <div className="text-center mt-4">
        <span className="text-secondary font-weight-bold pl-1">
          Welcome {userName}
        </span>
        ,
        <Link to = "/login"
          className="font-weight-bold text-primary pl-1"
          onClick={e => logOutUser(e)}
        >
          log out
        </Link>
      </div>
    );
}

export default Welcome ; 