import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUser, logIn } from '../api';

import Navbar from './Navbar';

import googleIcon from '../assets/icons/google.png';

function LogInPage({ currentUser, setCurrentUser, setAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState(null);
  // const [displayEmailError, setDisplayEmailError] = useState(false);
  // const [displayPasswordError, setDisplayPasswordError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/index');
  }, [currentUser]);

  const handleLogIn = async () => {
    displayErrorMessage();
    if (email === '' || password === '') return;

    await logIn(email, password, setErrorMessages);

    if (errorMessages?.length > 0) return;

    await getLoggedInUser(setCurrentUser, setAuthenticated);
  }

  const displayErrorMessage = () => {
    const errorMessagesCopy = Object.assign({}, errorMessages);
    email === '' ? errorMessagesCopy.email = true : errorMessagesCopy.email = null
    password === '' ? errorMessagesCopy.password = true : errorMessagesCopy.password = null;

    if (email === '' || password === '') delete errorMessagesCopy.user;
    setErrorMessages(errorMessagesCopy);
  }

  return (
    <div className="log-in-page">
      <Navbar />
      <div className="log-in-container">

        <p className="container-title">Log In</p>

        <div className="log-in-form">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {
            errorMessages?.email ? <p className="error-message">Email must not be empty</p> : null
          }
    
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {
            errorMessages?.password ? <p className="error-message">Password must not be empty</p> : null
          }

          {
            errorMessages?.user ? <p className="error-message">{errorMessages.user}</p> : null
          }

          <button onClick={handleLogIn}>Log In</button>
        </div>

        <a href="http://localhost:8080/api/auth/google" className="google-sign-in-link">
          <img src={googleIcon} alt="" />
          Sign in with Google
        </a>
      </div>

      <Link to="/create-account">
        <p className="create-account-link">Create Account</p>
      </Link>
    </div>
  );
}

export default LogInPage;