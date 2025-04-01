import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomeDisplay from "./components/HomePage";
import AllArticles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeDisplay />} />
            <Route path="/articles" element={<AllArticles />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
