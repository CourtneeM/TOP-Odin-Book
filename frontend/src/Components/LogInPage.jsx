import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getLoggedInUser, logIn } from '../api';

function LogInPage({ currentUser, setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/index');
  }, [currentUser]);

  const handleLogIn = async () => {
    if (!email || !password) return;

    await logIn(email, password);
    // await getLoggedInUser(setCurrentUser);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="log-in-container">
      <p>Log In</p>

      {/* <div className="log-in-form">
        <label htmlFor="email">
          Email
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
  
        <label htmlFor="password">
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogIn}>Log In</button>
      </div> */}

      <a href="http://localhost:8080/api/auth/google">Sign in with Google</a>

      <Link to="/create-account">
        <p>Create Account</p>
      </Link>
    </div>
  );
}

export default LogInPage;