import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './header.css';

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleReserve = () => {
    navigate('/reserve');
  };

  const handleHome = () => {
    navigate('/');
    setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 平滑捲動
  }, 100);
  };

  const handleContact = () => {
    navigate('/contact');
  };

  const handlePlane = () => {
    navigate('/plane');
  };

  const isPortfolioActive = location.pathname.startsWith('/portfolio');

  // 當滑鼠進入時，立即顯示下拉選單並清除任何關閉計時器
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDropdownOpen(true);
  };

  // 當滑鼠離開時，延遲 200ms 關閉下拉選單
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  return (
    <header className="header-wrapper">
      <div  className="header">
        <div className="header-left">
          <div className="logo" onClick={handleHome}>
            乾靖娛樂工作室
          </div>
        </div>

        <nav className="header-center">
          <a
            href="#"
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleHome();
            }}
          >
            首頁
          </a>

          <div
            className="dropdown-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`nav-item dropdown ${isPortfolioActive ? 'active' : ''}`}
              onClick={() => {
                navigate('/#image');
                setDropdownOpen(false);
              }}
            >
              作品集
            </div>
            {dropdownOpen && (
              <div
                className="dropdown-menu show"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/#image');
                    setDropdownOpen(false);
                  }}
                >
                  形象照
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/#photo');
                    setDropdownOpen(false);
                  }}
                >
                  光影寫真
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/#theme');
                    setDropdownOpen(false);
                  }}
                >
                  主題寫真
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/#outdoor');
                    setDropdownOpen(false);
                  }}
                >
                  外拍作品
                </div>
              </div>
            )}
          </div>
          
          {/* <a
            href="#"
            className={`nav-item ${location.pathname === '/plans' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handlePlane();
            }}
          >
            了解方案
          </a> */}

          <a
            href="#"
            className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleContact();
            }}
          >
            聯絡我們
          </a>
        </nav>

        <div className="header-right">
          <button className="btn-reserve" onClick={handleReserve}>
            立即預約
          </button>
        </div>
      </div >
    </header>
  );
};

export default Header;