import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getLoggedInUser } from './api';
import CreateAccountPage from './Components/CreateAccountPage';

import LogInPage from './Components/LogInPage';
import PostIndex from './Components/Post/PostIndex';
import UserIndex from './Components/User/UserIndex';
import UserProfile from './Components/User/UserProfile';

function RouteSwitch() {
  const initializeAuthenticated = () => localStorage.getItem('userId') === 'null' ? false : localStorage.getItem('userId');

  const [authenticated, setAuthenticated] = useState(initializeAuthenticated);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getLoggedInUser(setCurrentUser, setAuthenticated);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!authenticated ? <LogInPage currentUser={currentUser} setCurrentUser={setCurrentUser}/> : <Navigate to="/index" />} />
        <Route path="/create-account" element={!authenticated ? <CreateAccountPage currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/index" />} />
        <Route path="/index" element={authenticated ? <PostIndex currentUser={currentUser} setCurrentUser={setCurrentUser} setAuthenticated={setAuthenticated} /> : <Navigate to="/" />} />
        <Route path="/users" element={authenticated ? <UserIndex currentUser={currentUser} setCurrentUser={setCurrentUser} setAuthenticated={setAuthenticated} /> : <Navigate to="/" />} />
        <Route path="/users/:userId" element={authenticated ? <UserProfile currentUser={currentUser} setCurrentUser={setCurrentUser} setAuthenticated={setAuthenticated} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;