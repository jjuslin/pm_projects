import React from 'react';
import {Link} from '@reach/router'

function Home(props) {
    const user =props.user;
    const biggerLead = {
      fontSize: 1.4 + 'em',
      fontWeight: 200
    };
    return(
      <div className="container text-center">
      <div className="row justify-content-center">

        <div className="col-10 col-md-10 col-lg-8 col-xl-7">
          <div
            className="display-4 text-primary mt-3 mb-2"
            style={{
              fontSize: 2.8 + 'em'
            }}
          >
            PM-T-Sysytem  Home
          </div>
    
    <p className="lead"  style={biggerLead}>
            This simple app manages Preventive maintenance projects for Properties.
            It can be used by proterty managers to keep track of different projects 
             and maintenance to be held for the fiscal year. This is a good tool to use 
             as a reference when reconciling monthly project reports. It is based on
             <a href="https://reactjs.org/">React</a>{' '}
            and <a href="https://firebase.google.com">Firebase</a>.
          </p>
         
                   {/* If User does not exist then display the Register and Login buttons */}
          {user == null && (
              <span>
          <Link to = "/register"
                className="btn btn-outline-primary mr-2"> Register</Link>

<Link to = "/login"
                className="btn btn-outline-primary mr-2"> Log In</Link>
  </span>
                )}

{/* If User exists then do not display the Register and Login buttons */}
{user && (
<Link to ="/listproject" className="btn btn-primary">

Projects

</Link>

)}


  </div>
  </div>
  </div>
  );
}

export default Home ; 