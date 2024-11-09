import { Link } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";

import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { kullanici } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>NotPad</h1>
        </Link>
        <nav>
          {kullanici && (
            <div>
              <span>{kullanici.email}</span>&nbsp;
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}
          {!kullanici && (
            <div>
              <Link to="/login">Sing In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
