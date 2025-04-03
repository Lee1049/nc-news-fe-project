import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomeDisplay from "./components/HomePage";
import AllArticles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";
import AllTopics from "./components/AllTopics";
import SingleTopic from "./components/SingleTopic";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeDisplay />} />
            <Route path="/articles" element={<AllArticles />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/topics" element={<AllTopics />} />
            <Route path="/topics/:topic_slug" element={<SingleTopic />} />
            <Route
              path="*"
              element={<h2>Page not found. Click the logo to go back home.</h2>}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
