import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from 'react-router-dom';


function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const clickLogin = async () => {
    axios.post('http://localhost:7000/api/v1/user/login' , {
        email: email,
        password: password
    }).then((response) => {
      localStorage.setItem("token" ,  response.data.data);
      history.push('/home')
    }).catch((err) => {
      alert(err.response.data.message)
    })
  }

  

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);


    clickLogin();

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input onChange={(e) => setEmail(e.target.value)} type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input  onChange={(e) => setPassword(e.target.value)} type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input  type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;