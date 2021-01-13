import React, {useReducer} from 'react'
import {FaPlus } from 'react-icons/fa';

function AppProject(props) {    


    const [allValues,setAllValues]= useReducer (
      (state, newState) => ({ ...state, ...newState}),
      {     
    petName: '',
    ownerName: '',
    aptDate: '',
    aptTime: '',
    aptNotes: ''
  });

    function handleChange(e){
      const name = e.target.name;
      const newval = e.target.value;
      setAllValues({[name]: newval})
    
    }

   function handleAdd(e) {
       e.preventDefault();
       let temptApt = {
         petName: allValues.petName,
         ownerName: allValues.ownerName,
         aptDate: allValues.aptDate + ' '+ allValues.aptTime,
         aptNotes: allValues.aptNotes
       };
       props.addItemToList(temptApt);
       setAllValues();
       props.toggleForm();
   }
   
        return (
            <div className= {
                'card textcenter mt-3 ' +
                (props.formDisplay ? '' :'add-appointment') }>
          
        <div className="apt-addheading card-header bg-primary text-white" onClick={props.toggleForm}>
         <FaPlus /> Add Appointment
        </div>

        <div className="card-body">
          <form id="aptForm" noValidate
          onSubmit = {handleAdd}>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="petName"
                readOnly>
                Pet Name
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="petName"
                  placeholder="Pet's Name"
                  value ={allValues.petName}
                  onChange={handleChange}
                  
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="ownerName"
              >
                Pet Owner
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="ownerName"
                  placeholder="Owner's Name"
                  value ={allValues.ownerName}
                  onChange={handleChange}
                  
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptDate"
              >
                Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="aptDate"
                  id="aptDate"
                  value ={allValues.aptDate}
                  onChange={handleChange}
                />
              </div>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptTime"
              >
                Time
              </label>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  name="aptTime"
                  id="aptTime"
                  value ={allValues.aptTime}
                  onChange={handleChange}
                  
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                Apt. Notes
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="aptNotes"
                  id="aptNotes"
                  placeholder="Appointment Notes"
                  value ={allValues.aptNotes}
                  onChange={handleChange}
                 
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Add Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
           
        );    
}
export default AppProject;