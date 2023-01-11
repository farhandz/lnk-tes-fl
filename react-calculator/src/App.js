import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import GuardedRoute from './component/RouteGuard';
import Home from './page/Home';
import Login from './page/Login';

function App() {
    const[isAutheticated, setisAutheticated] = useState(false);

  function isLogin(){
    const token = localStorage.getItem('token')
    console.log(token);
    console.log();
    if(token || typeof token != 'undefined' || token != null) {
      setisAutheticated(true)
    } else {
      setisAutheticated(false)
    }
  }


  useEffect(() => {
    isLogin()
  }, [])
  

  
  return (
    <Router>
      <Switch>
       <Route exact path='/' component={Login} />
      <GuardedRoute path='/home' component={Home} auth={isAutheticated} />
      </Switch>
    </Router>

  );
}

export default App;