import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PostIndex from './Components/Post/PostIndex';

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/index" element={<PostIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;