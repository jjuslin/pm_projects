import React, {useReducer} from 'react'
import {FaPlus } from 'react-icons/fa';

function AppProject(props) {    


    const [allValues,setAllValues]= useReducer (
      (state, newState) => ({ ...state, ...newState}),
      {     
    projectName: '',
    projectLocation: '',
    projectDate: '',
    projectTime: '',
    projectDescription: ''
  });

    function handleChange(e){
      const name = e.target.name;
      const newval = e.target.value;
      setAllValues({[name]: newval})
    
    }

   function handleAdd(e) {
       e.preventDefault();
       let temptApt = {
         projectName: allValues.projectName,
         projectLocation: allValues.projectLocation,
         projectDate: allValues.projectDate,
         projectTime: allValues.projectTime,
         projectDescription: allValues.projectDescription
       };
       props.addItemToList(temptApt);
       setAllValues();
      // props.toggleForm();
   }
   
        return (
            <div className= {
                'card textcenter mt-3 ' +
                (props.formDisplay ? '' :'add-appointment') }>
          
        <div className="apt-addheading card-header bg-primary text-white" onClick={props.toggleForm}>
         <FaPlus /> Add Project
        </div>

        <div className="card-body">
          <form id="aptForm" 
          onSubmit = {handleAdd}>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="projectName"
                readOnly>
                Project Title
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="projectName"
                  placeholder="Project Name"
                  required
                  value ={allValues.projectName}
                  onChange={handleChange}
                  
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="projectLocation"
              >
                Project Location
              </label>
              <div className="col-md-10">
                <input
                  required
                  type="text"
                  className="form-control"
                  name="projectLocation"
                  placeholder="Location"
                
                  value ={allValues.projectLocation}
                  onChange={handleChange}
                  
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="projectDate"
              >
                Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="projectDate"
                  id="projectDate"
                  required
                  value ={allValues.projectDate}
                  onChange={handleChange}
                />
              </div>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="projectTime"
              >
                Time
              </label>
              <div className="col-md-4">
                <input
                required
                  type="time"
                  className="form-control"
                  name="projectTime"
                  id="projectTime"
                  
                  value ={allValues.projectTime}
                  onChange={handleChange}
                  
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="projectDescription">
                Proj. Description
              </label>
              <div className="col-md-10">
                <textarea
                  required

                  className="form-control"
                  rows="4"
                  cols="50"
                  name="projectDescription"
                  id="projectDescription"
                  placeholder="Project Notes"
                  value ={allValues.projectDescription}
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
                  Add Project
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
           
        );    
}
export default AppProject;