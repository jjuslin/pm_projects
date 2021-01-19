import React, {useState} from 'react'
import {without} from 'lodash'
import { FaTimes } from 'react-icons/fa'
import Moment from 'react-moment'
import { isCompositeComponent } from 'react-dom/test-utils';


function ListProject(props) {   
    
    
          
        return (
            <div className="appointment-list item-list mb-3">
        {props.appointments.map((item) => (         
          <div className="pet-item col media py-3" key = {item._id}>         
              
            <div className="mr-3">
                
              <button
                className="pet-delete btn btn-sm btn-danger"  

                   onClick={()=> props.deleteAppointment(item)} >
                <FaTimes />
              </button>

            </div>

            <div className="pet-info media-body">
              <div className="pet-head d-flex">
                <span
                  className="pet-name" 
                  contentEditable 
                  suppressContentEditableWarning
                  onBlur={
                    e => props.updateInfo(
                      'projectName',
                      e.target.innerText,
                      item._id
                    )
                  }
                  >{item.projectName} </span>

                <span className="apt-date ml-auto">
               <Moment
                    date={item.projectDate}
                    //parse = "YYYY-MM-dd hh:mm"
                    format= "MMM-D-YY "
               />
                </span>
              </div>

              <div className="owner-name">
                <span className="label-item">Location: </span>
                <span contentEditable 
                  suppressContentEditableWarning 
                  onBlur={
                    e => props.updateInfo(
                      'projectLocation',
                      e.target.innerText,
                      item._id
                    )
                  }>
                  {item.projectLocation}
                </span>
              </div>
              <div className="apt-notes">
              <span className="label-item">Description: </span>
                <span  contentEditable 
                  suppressContentEditableWarning
                  onBlur={
                    e => props.updateInfo(
                      'projectDescription',
                      e.target.innerText,
                      item._id
                    )
                    }>
                {item.projectDescription}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  
}
export default ListProject;