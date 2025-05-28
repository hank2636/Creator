// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import UserForm from "./pages/UserForm";
import './App.css'; // 自己的 CSS 檔案

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reserve" element={<UserForm />} />
          </Routes>
            
        </main>
      </div>
    </Router>
  );
};

export default App;
