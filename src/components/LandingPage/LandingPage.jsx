import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome To Professional Launch");
  const history = useHistory();

  const onLogin = () => {
    history.push("/login");
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="grid">
          <div className="grid-col grid-col_8">
            <div className="about-container">
              <div className="about-section">
                <h1 className="about-title">What Is Professional Launch?</h1>
                <p className="about-text">
                  The Professional Launch Mentorship management system is a
                  web-based, mobile-first application designed to facilitate and
                  manage mentorship relationships. The system allows mentors and
                  mentees to create profiles, establish connections, and propose
                  meetings. This will allow mentees to develop their skills, build
                  a professional network, and receive guidance on career
                  advancement to achieve career goals.
                </p>
              </div>
              <div className="about-section">
                <h1 className="about-title">What Is Our Mission?</h1>
                <p className="about-text">
                  We are positively connecting the less connected, bridging gaps,
                  and building futures in the community. Our mentorship program is
                  dedicated to fostering meaningful relationships, empowering
                  individuals, and creating a supportive community where everyone
                  can thrive.
                </p>
              </div>
            </div>
          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
      <footer className="site-footer">
        <nav className="footer-navigation" aria-label="Footer Menu">
          <ul className="footer-menu">
            <li className="footer-menu-item">
              <a href="https://www.youtube.com/@prolunchwithricotaladin" target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </li>
            <li className="footer-menu-item">
              <a href="https://www.facebook.com/professionallunch/" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li className="footer-menu-item">
              <a href="https://www.instagram.com/professionallunch/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li className="footer-menu-item">
              <a href="https://www.linkedin.com/company/professional-lunch" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li className="footer-menu-item">
              <a href="https://www.tiktok.com/@professionallunch" target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

export default LandingPage;
