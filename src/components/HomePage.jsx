import { Link } from "react-router-dom";

function HomeDisplay() {
  function handleClick() {
    console.log("clicked");
  }

  return (
    <nav>
      <Link
        to="/articles"
        onClick={handleClick}
        className="all-articles-header"
      >
        All Articles
      </Link>
    </nav>
  );
}

export default HomeDisplay;
