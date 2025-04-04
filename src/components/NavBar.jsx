import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
