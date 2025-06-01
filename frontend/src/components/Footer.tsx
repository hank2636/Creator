import './footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-contact">
          <h4>聯絡我們</h4>
          <p>Tel: +886 2 1234 5678</p>
          <p>Email: xxxx@gmail.com</p>
          <p>台北市OO區OOO路O段OOO號O樓</p>
        </div>

        <div className="footer-social">
          <h4>FOLLOW US</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/qianjing_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
              <img src="/icon/ig.svg" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/share/g/1E4MMKeFFB/" target="_blank" rel="noopener noreferrer">
              <img src="/icon/fb.svg" alt="Facebook" />
            </a>
            <a href="https://youtube.com/@qianjing_studio?si=2C-OdQ21ZMema0rT" target="_blank" rel="noopener noreferrer">
              <img src="/icon/yt.svg" alt="YouTube" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        ©2023 乾靖攝影 | 乾靖娛樂工作室
      </div>
    </footer>
  );
};

export default Footer;
