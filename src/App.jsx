import "./App.css";
import Header from "./components/Header";
import AllArticles from "./components/AllArticles";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import HomeDisplay from "./components/HomePage";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeDisplay />} />
            <Route path="/articles" element={<AllArticles />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
