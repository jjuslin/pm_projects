import React, {useReducer, useEffect} from 'react';
import FormError from './FormError'
import firebase from './Firebase.js'


function Register (props) {
  const [formFields, setFormFields]= useReducer (
    (state, newState) => ({ ...state, ...newState}),
    {     
  displayName: '',
  email:'',
  passOne:'',
  passTwo:'',
  errorMessage: null 
  });
  

  function handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    setFormFields({
       [itemName]: itemValue
    }, )
  }
   
  useEffect(() => {  
    const pass1 = formFields.passOne;
    const pass2 = formFields.passTwo;
    
    
     if (pass1 !== pass2){
        setFormFields({errorMessage: 'Passwords do not match'})
        
      }else
      {
        setFormFields({errorMessage: null})
      }
    

  },[formFields.passOne,formFields.passTwo]);


 function handleSubmit(e) {

     var registrationInfo = {
       displayName: formFields.displayName,
       email: formFields.email,
       password: formFields.passOne

     }
     e.preventDefault();
     firebase.auth().createUserWithEmailAndPassword(
       registrationInfo.email,
       registrationInfo.password

     ).then(() => {
       props.registerUser(registrationInfo.displayName)
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
      <form className="mt-3" onSubmit= {handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Register</h3>
                  <div className="form-row">
                   {formFields.errorMessage !== null ? (
                     <FormError theMessage= {formFields.errorMessage}/>
                   ): null}
                    <section className="col-sm-12 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="displayName"
                      >
                        Display Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="displayName"
                        placeholder="Display Name"
                        name="displayName"
                        required
                        value = {formFields.displayName}
                        onChange= {handleChange}
                       
                      />
                    </section>
                  </div>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      required
                      name="email"
                      value = {formFields.email}
                      onChange= {handleChange}
                       />
                  </section>
                  <div className="form-row">
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        name="passOne"
                        placeholder="Password"
                        value = {formFields.passOne}
                        onChange= {handleChange}
                        
                      />
                    </section>
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        required
                        name="passTwo"
                        placeholder="Repeat Password"
                        value = {formFields.passTwo}
                        onChange= {handleChange}
                        
                      />
                    </section>
                  </div>
                  <div className="form-group text-right mb-0">
                    <button 

                    disabled= {formFields.errorMessage !== null}
                    className="btn btn-primary"
                     type="submit">
                      Register
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


export default Register; 