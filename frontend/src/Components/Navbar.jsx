import { Link, useNavigate } from 'react-router-dom';

import { logOut } from '../api';

function Navbar({ currentUser, setCurrentUser, setAuthenticated }) {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut(setCurrentUser, setAuthenticated);
    navigate('/');
  }

  return (
    <nav>
      <p className="container-title">Odin-Book</p>
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