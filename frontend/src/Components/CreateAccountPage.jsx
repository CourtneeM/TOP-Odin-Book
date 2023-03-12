import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { createUser, logIn, getLoggedInUser } from '../api';

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
    <div className="log-in-container">
      <p>Log In</p>

      <div className="log-in-form">
        <label htmlFor="first-name">
          First Name
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label htmlFor="first-name">
          Last Name
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label htmlFor="email">
          Email
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
  
        <label htmlFor="password">
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label htmlFor="confirm-password">
          Confirm Password
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <button onClick={handleCreateAccount}>Log In</button>
      </div>

      <Link to="/">
        <p>Have an account? Log In</p>
      </Link>
    </div>
  );
}

export default CreateAccountPage;