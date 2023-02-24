function Navbar() {
  return (
    <nav>
      <p>Odin-Book</p>
      <div>
        {
          // currentUser ?
          // <div>
          //   <p>{currentUser.firstName} {currentUser.lastName}</p>
          //   <button>Log Out</button>
          // </div> :
          <button>Log In</button>
        }
      </div>
    </nav>
  );
}

export default Navbar;