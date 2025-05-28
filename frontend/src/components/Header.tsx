import { useState } from 'react';
import './header.css';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">乾靖娛樂工作室</div>
      </div>

      <nav className="header-center">
        <a href="#" className="nav-item">首頁</a>

        <div 
          className="nav-item dropdown" 
          onMouseEnter={() => setDropdownOpen(true)} 
          onMouseLeave={() => setDropdownOpen(false)}
        >
          作品集
          <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
            <a href="#" className="dropdown-item">光影形象誌</a>
            <a href="#" className="dropdown-item">光影寫真</a>
            <a href="#" className="dropdown-item">主題寫真</a>
            <a href="#" className="dropdown-item">外拍作品</a>
          </div>
        </div>

        <a href="#" className="nav-item">聯絡我們</a>
      </nav>

      <div className="header-right">
        <button className="btn-reserve">立即預約</button>
      </div>
    </header>
  );
};

export default Header;
