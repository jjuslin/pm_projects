import React, {useState} from 'react'
import {without} from 'lodash'
import { FaTimes } from 'react-icons/fa'
import Moment from 'react-moment'
import { isCompositeComponent } from 'react-dom/test-utils';


function ListProject(props) {   
    
    
          
        return (
            <div className="appointment-list item-list mb-3">
        {props.appointments.map((item, index) => (         
          <div className="pet-item col media py-3" key = {index}>         
              
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
                      'petName',
                      e.target.innerText,
                      index
                    )
                  }
                  >{index}----{item.petName} </span>
                <span className="apt-date ml-auto">
               <Moment
                    date={item.aptDate}
                    parse = "YYYY-MM-dd hh:mm"
                    format= "MMM-D h:mma"
               />
                </span>
              </div>

              <div className="owner-name">
                <span className="label-item">Owner: </span>
                <span  contentEditable 
                  suppressContentEditableWarning>
                  {item.ownerName}
                </span>
              </div>
              <div className="apt-notes"
 >
                {item.aptNotes}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  
}
export default ListProject;