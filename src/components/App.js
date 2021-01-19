import React, {useState, useEffect, useReducer} from 'react';
import firebase from './Firebase'
import '../css/App.css';
import AddProject from './AddProject'
import SearchProject from './SearchProject'
import ListProject from './ListProject';
import {Router, navigate} from '@reach/router';
import axios from 'axios';
import Home from './Home.js';
import Meetings from './Meetings.js';
import Welcome from './Welcome.js';
import Navigation from './Navigation.js';
import Login from './Login.js';
import Register from './Register.js';



import { isEqual, findIndex } from 'lodash';
import { FaIgloo } from 'react-icons/fa';


function App() {

  const [intialState, setInitialState]= useReducer (
    (state, newState) => ({ ...state, ...newState}),
    {     
  user: null,
  displayName: null,
  userID: null
  
  });

 
  /** 
  const [myappointments, setMyAppointments] = useState([]);
  useEffect(()=> {
    fetch('./data.json')
    .then(response => response.json())
    .then(result => {
      const apts = result.map(item => { 
      return item;
      });


      setMyAppointments({
        myappointments: apts
      });
    })
        
  });  
 
*/

/**const [myappointments, setMyAppointments] = useState([]);
const data = async() => {
  const apiRes = await fetch(
    './data.json'
  );

  const resJSON = await apiRes.json()
  return resJSON;
};

const handleSearch = e => {
  e.preventDefault();
  data().then( res => {
    console.log("map we" + res.petName) 
  })
} */

const [my_projects, setMy_projects] = useState([]);


const [formDisplay, setFormDisplay]  = useState(true);
//const [queryText, setQueryText] = useState('');
//const [orderBy, setOrderBy] = useState('ownerName');
//const[orderDir, setOrderDir] = useState('asc');

const [allOrder,setAllOrder]= useReducer (
  (state, newState) => ({ ...state, ...newState}),
  {     
orderBy: 'projectName',
orderDir: 'asc',
queryText: ''
});




  useEffect(()=> {


    firebase.auth().onAuthStateChanged(FBuser => {
      if( FBuser) {
        setInitialState ({
          user: FBuser,
          displayName:  FBuser.displayName,
          userID: FBuser.uid
        });
      }
      else{
        setInitialState({user: null});
  }
}) 
        

    //fetch('./data.json')
    fetch('http://localhost:4000/projects')
    .then(response => response.json())
     .then(setMy_projects)
    
        .catch(console.error)

      }, []) ;
/* if (myappointments) {
   const data = JSON.stringify(myappointments) 
   
   }**/

   const registerUser = userName =>{
    firebase.auth().onAuthStateChanged(FBuser => {
      FBuser.updateProfile({
        displayName: userName
      }).then(() => {
        setInitialState ({
          user: FBuser,
          displayName: FBuser.displayName,
          userID: FBuser.userID
        });
        navigate('/login');


      })
    })
  }

  const logOutUser = e => {

    e.preventDefault();
    setInitialState({
      user: null,
      displayName: null,
      userID: null
  
    });
  
    firebase.auth().signOut().then(()=> {
      navigate('/login');
    })
  }
 
  function handleRemove( item) {

    axios.delete('http://localhost:4000/projects/'+item._id)
  .then((response) => {
     console.log(response, " succesfully deleted");
  })
  .catch((error) =>{
console.log(error);
//console.log(id)

  }
  )
 
    // remove item
    //console.log(id);
  //const  val = without(my_projects,id)
  //setMy_projects(val);
     //console.log( val);
  }



  function searchItems(query){
    setAllOrder({queryText: query });
  }

function changeOrder(order, dir) {

  setAllOrder({
    orderBy: order,
    orderDir: dir
  })
  }

  function updateInfo (name, value, id){
    let tempInfo = my_projects;
    console.log(id)
    console.log(name)
    console.log(value)
    console.log(tempInfo)
    let currentIndex = findIndex(my_projects, {
      _id: id
    });
    tempInfo[currentIndex][name] = value;

     if(isEqual(name,"projectLocation"))
     {
      axios.put('http://localhost:4000/projects/'+id,{
        projectLocation:value})
        .then((response) => {
           console.log(response, " succesfully updated", tempInfo[currentIndex][name]);
        })
        .catch((error) =>{
      console.log(error); 
      
        })        

     } else if (isEqual(name,"projectName"))
     {
      axios.put('http://localhost:4000/projects/'+id,{
        projectName:value})
        .then((response) => {
           console.log(response, " succesfully updated", tempInfo[currentIndex][name]);
        })
        .catch((error) =>{
      console.log(error); 
      
        })        

     } 

     else if (isEqual(name,"projectDescription"))
     {
      axios.put('http://localhost:4000/projects/'+id,{
        projectDescription:value})
        .then((response) => {
           console.log(response, " succesfully updated", tempInfo[currentIndex][name]);
        })
        .catch((error) =>{
      console.log(error); 
      
        })        

     } 
   
     
   
     
      
     
     //console.log(" update needed")
    //setMy_projects(
     // {
       // myappointments: tempInfo
     // }
   // )
  }



  function toggleForm(){
     if (formDisplay === true )
    setFormDisplay(false)
      else
      setFormDisplay(true)
  }

function addItemToList(apt )
{
  
  axios.post('http://localhost:4000/projects', {
  projectName: apt.projectName,
  projectLocation: apt.projectLocation,
  projectDate: apt.projectDate,
  projectTime: apt.projectTime,

 projectDescription: apt.projectDescription
  //my_projects.unshift(apt)
  //console.log(apt.projectDate)
  })
  .then((response) => {
     console.log(response);
  })
  .catch((error) =>{
console.log(error);

  }
  )
 
  console.log(apt.projectTime)
}
 
let order;
let filteredItems = my_projects;
if (allOrder.orderDir === 'asc')
{
  order = 1;
}
 
  else {
  order = -1
}

filteredItems=filteredItems.sort((a,b) => {
if (a[allOrder.orderBy].toLowerCase() < 
b[allOrder.orderBy].toLowerCase())
{
  return -1 * order;
} else {
  return 1 * order;
}

}).filter(eachItem => {
  return(
    eachItem['projectName'].toLowerCase().includes(allOrder.queryText.toLowerCase()) ||
    eachItem['projectLocation'].toLowerCase().includes(allOrder.queryText.toLowerCase()) ||
    eachItem['projectDescription'].toLowerCase().includes(allOrder.queryText.toLowerCase()) 
  );
});

  return (
    
    <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container"> 
              <Navigation user={intialState.user}  
              logOutUser = {logOutUser}/>
               
              {intialState.user && <Welcome  userName={intialState.displayName} logOutUser = {logOutUser} /> }  
              {intialState.user && <SearchProject 
                orderBy = {allOrder.orderBy}
                orderDir = {allOrder.orderDir}
                changeOrder = {changeOrder}
                searchItems = {searchItems} />  }
                
                <Router>
                <Home path="/" user={intialState.user}/>
                <Login path="/login" />
               {/* <ListProject path="/listproject" appointments= {filteredItems} /> */}  
               <ListProject path="/listproject"
                appointments= {filteredItems}   
                deleteAppointment = {handleRemove}
                updateInfo={updateInfo}
                searchItems = {searchItems}
                />
              <Register path="/register" registerUser={registerUser}/>        
                <AddProject path = "/addproject" formDisplay ={formDisplay}
                //toggleForm = {toggleForm}
                addItemToList = {addItemToList}/>  
                 

                </Router>
                 {/*
                  <AddProject path = "/addproject" formDisplay ={formDisplay}
                toggleForm = {toggleForm}
                addItemToList = {addItemToList}/>
                 <SearchProject 
                orderBy = {allOrder.orderBy}
                orderDir = {allOrder.orderDir}
                changeOrder = {changeOrder}
                searchItems = {searchItems}/>  
                <ListProject  appointments= {filteredItems}
                 deleteAppointment = {handleRemove}
                 updateInfo={updateInfo}/> 
                */}
                       
                                 
               
              </div>
            </div>
          </div>
        </div>
        
      </main>
    );
}

export default App;
