// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
// import BookingForm from "./pages/BookingForm";
// import Contact from "./pages/Contact";
import './App.css'; // 自己的 CSS 檔案

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/booking" element={<BookingForm />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
            
        </main>
      </div>
    </Router>
  );
};

export default App;
