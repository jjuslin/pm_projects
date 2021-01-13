import React from 'react';

function FormError(props) {

    const theMessage = props.theMessage
   
    return(
    
        <div className="col-12 alert alert-danger px-3">
        {theMessage}
       
      </div>
       
    );
}

export default FormError;