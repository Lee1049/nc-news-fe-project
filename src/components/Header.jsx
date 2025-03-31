import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">
        <img className="logo" src={Logo} />
      </Link>
    </header>
  );
}

export default Header;
