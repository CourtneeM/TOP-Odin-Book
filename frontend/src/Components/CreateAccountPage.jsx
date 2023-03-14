import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { createUser, logIn, getLoggedInUser } from '../api';
import Navbar from "./Navbar";

function CreateAccountPage({ currentUser, setCurrentUser }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/index');
  }, [currentUser]);

  const handleCreateAccount = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) return;
    if (password !== confirmPassword) return;

    const newUser = { firstName, lastName, email, password, confirmPassword }

    await createUser(newUser);
    await logIn(email, password);
    // await getLoggedInUser(setCurrentUser);

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="create-account-page">
      <Navbar />

      <div className="create-account-container">
        <p className="container-title">Create Account</p>

        <div className="create-account-form">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          
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