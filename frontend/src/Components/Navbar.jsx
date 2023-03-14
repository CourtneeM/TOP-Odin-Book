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
      <Link to="/index">
        <p className="container-title">Odin-Book</p>
      </Link>
      <div>
        {
          currentUser ?
          <div>
            <Link to={`/users/${currentUser.id}`}>
              <p>{currentUser.firstName} {currentUser.lastName}</p>
            </Link>
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