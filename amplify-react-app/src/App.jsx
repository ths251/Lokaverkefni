import './App.css';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react';
import {  useState } from 'react';
import * as React from 'react';
import reiknivel from './Reiknivel';
import rankings from './Rankings';
import playerAPI from './PlayerAPI';
import NavBar from './NavBar';
import {Route} from "react-router-dom";


Amplify.configure(awsconfig)

/*Vantar að tengja amp Auth pakkan til að sækja user state*/ 
function App() {
  const [user, setUser] = useState([]);
  const fetchUsername = async() => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const userName = attributes.email;
    setUser (userName);
  }

  fetchUsername();

  //Það sem birtist á öllum síðum
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <h2>Fantasy</h2>
        <div className = "username">
          <p>Notandi </p>
          {user} 
        </div>
        <AmplifySignOut/>
      </header>



      {/* Tengja slóðirnar við síður*/}
      <Route exact path="/reiknivel" component = {reiknivel}/>
      <Route exact path="/" component = {rankings}/>
      <Route exact path ="/playerAPI" component ={playerAPI}/>
    </div>
  );
  
      
}

export default withAuthenticator(App);
