import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PostIndex from './Components/Post/PostIndex';
import UserIndex from './Components/User/UserIndex';
import UserProfile from './Components/User/UserProfile';

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/index" element={<PostIndex />} />
        <Route path="/users" element={<UserIndex />} />
        <Route path="/users/:userId" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;