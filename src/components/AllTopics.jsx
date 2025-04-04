import { useEffect, useState } from "react";
import { fetchTopics } from "../../app";
import { Link } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";

function AllTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTopics()
      .then((topics) => {
        setTopics(topics);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  if (topics.length === 0) return <p>No topics found.</p>;

  return (
    <div>
      <div className="all-topics-header">
        <h2>All Topics</h2>
        <div>
          <ul>
            {topics.map((topic) => (
              <li key={topic.slug} className="single-article-card">
                <Link className="link" to={`/topics/${topic.slug}`}>
                  <h3>
                    {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                  </h3>
                </Link>
                <p>{topic.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AllTopics;
