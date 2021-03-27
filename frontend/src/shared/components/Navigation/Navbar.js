import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import './Navbar.scss';

const Navbar = () => {
  const context = useContext(AuthContext);

  let authLinks;
  if (context.isAuth) {
    authLinks = (
      <>
        <li>
          <NavLink
            exact
            activeClassName={"active"}
            to={`/${context.userId}/profile`}
          >
            Profile
          </NavLink>
        </li>
      </>
    );
  } else {
    authLinks = (
      <>
        <li>
          <NavLink
            exact
            activeClassName={"active"}
            to="/auth"
          >
            Auth
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">
        Verbose Octo Blog
      </NavLink>
      <ul>
        <li>
          <NavLink
            exact
            activeClassName={"active"}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={"active"}
            to="/blogs"
          >
            Blogs
          </NavLink>
        </li>
        {authLinks}
      </ul>
    </nav>
  );
};

export default Navbar;
