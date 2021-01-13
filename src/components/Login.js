import React,{useReducer} from 'react';
import FormError from './FormError'
import firebase from './Firebase.js'
import { navigate} from '@reach/router'


function Login(props) {
  const [formFields, setFormFields]= useReducer (
    (state, newState) => ({ ...state, ...newState}),
    {     
  email:'',
  password:'',
  errorMessage: null 
  });
  

  function handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    setFormFields({
       [itemName]: itemValue
    }, )
  }
   
 


 function handleSubmit(e) {

     var registrationInfo = {
       
       email: formFields.email,
       password: formFields.password

     }
     e.preventDefault();
     firebase.auth().signInWithEmailAndPassword(
       registrationInfo.email,
       registrationInfo.password

     ).then(() => {
       navigate('/meetings')
     })
     .catch(error=> {
       if (error.message !== null) {
        setFormFields({errorMessage: error.message})
        console.log(error.message)
       }

       else{
        setFormFields({errorMessage: null})       
       }
     });
 }
 

   
    return(
      <form className="mt-3"  onSubmit={handleSubmit}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="font-weight-light mb-3">Log in</h3>
                <section className="form-group">
                {formFields.errorMessage !== null ? (
                     <FormError theMessage= {formFields.errorMessage}/>
                   ): null} 
                  <label
                    className="form-control-label sr-only"
                    htmlFor="Email"
                  >
                    Email
                  </label>
                  <input
                    required
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value= {setFormFields.email}
                    onChange = {handleChange}
                    
                
                  />
                </section>
                <section className="form-group">
                  <input
                    required
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value= {setFormFields.password}
                    onChange = {handleChange}
                   
                  />
                </section>
                <div className="form-group text-right mb-0">
                  <button className="btn btn-primary" type="submit">
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  
    );
}

export default Login ; 