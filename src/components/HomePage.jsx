import { Link } from "react-router-dom";

function HomeDisplay() {
  function handleClick() {}

  return (
    <nav className="home-display">
      <Link to="/articles" onClick={handleClick} className="home-link">
        All Articles
      </Link>
      <Link to="/topics" onClick={handleClick} className="home-link">
        All Topics
      </Link>
    </nav>
  );
}

export default HomeDisplay;
