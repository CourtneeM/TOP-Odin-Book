import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getLoggedInUser, logOut } from '../api';

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInUser(setCurrentUser);
  }, []);

  const handleLogOut = async () => {
    await logOut();
    navigate('/');
  }

  return (
    <nav>
      <p>Odin-Book</p>
      <div>
        {
          currentUser ?
          <div>
            <p>{currentUser.firstName} {currentUser.lastName}</p>
            <button onClick={handleLogOut}>Log Out</button>
          </div> :
          <Link to="/">
            <button>Log In</button>
          </Link>
        }
      </div>
    </nav>
  );
}

export default Navbar;