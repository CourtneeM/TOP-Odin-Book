import { Link, useNavigate } from 'react-router-dom';

import { logOut } from '../api';

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut(setCurrentUser);
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