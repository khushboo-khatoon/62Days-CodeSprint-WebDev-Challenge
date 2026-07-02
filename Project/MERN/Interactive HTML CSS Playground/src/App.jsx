import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Playground from "./pages/Playground";
import About from "./pages/About";
import Settings from "./pages/Settings";
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/playground" replace />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
