import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getLoggedInUser } from './api';
import CreateAccountPage from './Components/CreateAccountPage';

import LogInPage from './Components/LogInPage';
import PostIndex from './Components/Post/PostIndex';
import UserIndex from './Components/User/UserIndex';
import UserProfile from './Components/User/UserProfile';

function RouteSwitch() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (currentUser) return;

    getLoggedInUser(setCurrentUser);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/create-account" element={<CreateAccountPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/index" element={<PostIndex currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/users" element={<UserIndex currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/users/:userId" element={<UserProfile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;