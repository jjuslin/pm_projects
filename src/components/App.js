import React, {useState, useEffect, useReducer} from 'react';
import firebase from './Firebase'
import '../css/App.css';
import AddProject from './AddProject'
import SearchProject from './SearchProject'
import ListProject from './ListProject';
import {Router, navigate} from '@reach/router';
import Home from './Home.js';
import Meetings from './Meetings.js';
import Welcome from './Welcome.js';
import Navigation from './Navigation.js';
import Login from './Login.js';
import Register from './Register.js';



import { without, findIndex } from 'lodash';


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

const [myappointments, setMyAppointments] = useState([]);


const [formDisplay, setFormDisplay]  = useState(false);
//const [queryText, setQueryText] = useState('');
//const [orderBy, setOrderBy] = useState('ownerName');
//const[orderDir, setOrderDir] = useState('asc');

const [allOrder,setAllOrder]= useReducer (
  (state, newState) => ({ ...state, ...newState}),
  {     
orderBy: 'ownerName',
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
        

    fetch('./data.json')
    .then(response => response.json())
     .then(setMyAppointments)
    
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
 
  function handleRemove( id) {
    // remove item
    
  const  val = without(myappointments,id)
  setMyAppointments(val);
     console.log( val);
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
    let tempInfo = myappointments;
    console.log(id)
    let currentIndex = findIndex(myappointments, {
      currentIndex: id
    });
    tempInfo[currentIndex][name] = value;
    setMyAppointments(
      {
        myappointments: tempInfo
      }
    )
  }



  function toggleForm(){
     if (formDisplay === true )
    setFormDisplay(false)
      else
      setFormDisplay(true)
  }

function addItemToList(apt )
{
  myappointments.unshift(apt)
 
  
}
 
let order;
let filteredItems = myappointments;
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
    eachItem['petName'].toLowerCase().includes(allOrder.queryText.toLowerCase()) ||
    eachItem['ownerName'].toLowerCase().includes(allOrder.queryText.toLowerCase()) ||
    eachItem['aptNotes'].toLowerCase().includes(allOrder.queryText.toLowerCase()) 
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

                <Router>
                <Home path="/" user={intialState.user}/>
                <Login path="/login" />
                <ListProject path="/listproject" appointments= {filteredItems} />
                <Register path="/register" registerUser={registerUser}/>
                </Router>
                     
                {/*
                <AddProject  formDisplay ={formDisplay}
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
