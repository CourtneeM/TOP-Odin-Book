import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { createUser, logIn, getLoggedInUser } from '../api';
import Navbar from "./Navbar";

function CreateAccountPage({ currentUser, setCurrentUser, setAuthenticated }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({first_name: null, last_name: null, email: null, password: null, confirm_password: null});
  const [newUser, setNewUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/index');
  }, [currentUser]);

  useEffect(() => {
    const handleLogIn = async () => {
      await logIn(email, password);
      await getLoggedInUser(setCurrentUser, setAuthenticated);
    }

    if (newUser) {
      handleLogIn();
    }
  }, [newUser]);

  const handleCreateAccount = async () => {
    displayErrorMessage();

    if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') return;
    if (password !== confirmPassword) return;

    const newUser = { firstName, lastName, email, password, confirmPassword }
    await createUser(newUser, setNewUser, setErrorMessages);
  }

  const displayErrorMessage = () => {
    const errorMessagesCopy = Object.assign({}, errorMessages);
    firstName === '' ? errorMessagesCopy.first_name = 'First name must not be empty' : errorMessagesCopy.first_name = null
    lastName === '' ? errorMessagesCopy.last_name = 'Last name must not be empty' : errorMessagesCopy.last_name = null
    email === '' ? errorMessagesCopy.email = 'Email must not be empty' : errorMessagesCopy.email = null
    password === '' ? errorMessagesCopy.password = 'Password must not be empty' : errorMessagesCopy.password = null;
    confirmPassword === '' ? errorMessagesCopy.confirm_password = 'Confirm password must not be empty.' : errorMessagesCopy.confirm_password = null;
    password !== confirmPassword ? errorMessagesCopy.confirm_password = 'Password and confirm password must match.' : errorMessagesCopy.confirm_password = null;

    if (email === '' || password === '') delete errorMessagesCopy.user;
    setErrorMessages(errorMessagesCopy);
  }

  return (
    <div className="create-account-page">
      <Navbar />

      <div className="create-account-container">
        <p className="container-title">Create Account</p>

        <div className="create-account-form">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          {
            errorMessages?.first_name ? <p className="error-message">{errorMessages.first_name}</p> : null
          }
          
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          {
            errorMessages?.last_name ? <p className="error-message">{errorMessages.last_name}</p> : null
          }

          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {
            errorMessages?.email ? <p className="error-message">{errorMessages.email}</p> : null
          }

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {
            errorMessages?.password ? <p className="error-message">{errorMessages.password}</p> : null
          }

          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {
            errorMessages?.confirm_password ? <p className="error-message">{errorMessages.confirm_password}</p> : null
          }

          {
            errorMessages?.user ? <p className="error-message">{errorMessages.user}</p> : null
          }

          <button onClick={handleCreateAccount}>Create Account</button>
        </div>
      </div>

      <Link to="/">
        <p className="log-in-link">Have an account? Log In</p>
      </Link>
    </div>
  );
}

export default CreateAccountPage;