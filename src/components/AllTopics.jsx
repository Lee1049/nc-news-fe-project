import { useEffect, useState } from "react";
import { fetchTopics } from "../../app";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <div className="all-topics-header">
        <h2>All Topics</h2>
        <div className="all-topics-info">
          {loading && <p>Loading topics...</p>}
          {topics.length === 0 && !loading && <p>No topics found.</p>}

          {!loading && topics.length > 0 && (
            <ul>
              {topics.map((topic) => (
                <li key={topic.slug} className="single-article-card">
                  <Link to={`/topics/${topic.slug}`}>
                    <h3>
                      {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                    </h3>
                  </Link>
                  <p>{topic.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllTopics;
