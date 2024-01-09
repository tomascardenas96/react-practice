import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <header className="nav-bar__container">
        <ul>
          <li>
            <NavLink to="/">Login</NavLink>
          </li>
          <li>
            <NavLink to="home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/analytics">Analytics</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
