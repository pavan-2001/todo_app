import React, {useEffect, useState} from 'react'; 
import SignIn from './LoginForm';
import {BrowserRouter as  Router, Route, Switch } from "react-router-dom";
import Todo from './Todo';
import Homepage from './Homepage';
import SignUp from './Signup';
import firebase from '../functions/firebase';
import {generateUserDocument} from '../functions/api';


export default function Application() {
  const [user,setUser] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async userAuth => {
    const user = await generateUserDocument(userAuth);
    setUser(user);
  });
});

    return (
      <div>
        { user ?
          <Homepage user={user} setUser={setUser} />
        :
          <Router>
            <Switch>
              <Route path="/signUp"> 
                <SignUp user={user} setUser={setUser}/>
              </Route>
              <Route path="/">
                <SignIn user={user} setUser={setUser}/>
              </Route>
            </Switch>
          </Router>}
      </div>
    );
  
}