import { useState } from 'react';
import { Link } from 'react-router-dom';

import { logIn } from '../api';

function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async () => {
    if (!email || !password) return;

    await logIn(email, password);

    // setEmail('');
    // setPassword('');
  }

  return (
    <div className="log-in-container">
      <p>Log In</p>

      <div className="log-in-form">
        <label htmlFor="email">
          Email
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
  
        <label htmlFor="password">
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogIn}>Log In</button>
      </div>

      <Link to="/create-account">
        <p>Create Account</p>
      </Link>
    </div>
  );
}

export default LogInPage;