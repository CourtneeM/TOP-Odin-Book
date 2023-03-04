import { useState } from "react";
import { Link } from 'react-router-dom';

import { createUser } from '../api';

function CreateAccountPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) return;

    const newUser = { firstName, lastName, email, password, confirmPassword }

    await createUser(newUser);

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
          Password
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