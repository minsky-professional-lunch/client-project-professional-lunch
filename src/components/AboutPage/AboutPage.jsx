import React from "react";
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-container">
      <div className="about-section">
        <img src="../images/PLaunch.png" alt="Professional Launch Logo" className="about-logo" />
        <h1 className="about-title">What Is Professional Launch?</h1>
        <p className="about-text">
          The Professional Launch Mentorship management system is a web-based,
          mobile-first application designed to facilitate and manage mentorship
          relationships. The system allows mentors and mentees to create
          profiles, establish connections, and propose meetings. This will allow
          mentees to develop their skills, build a professional network, and
          receive guidance on career advancement to achieve career goals.
        </p>
      </div>
      <div className="about-section">
        <h1 className="about-title">What Is Our Mission?</h1>
        <p className="about-text">
          We are positively connecting the less connected, bridging gaps, and building
          futures in the community. Our mentorship program is dedicated to
          fostering meaningful relationships, empowering individuals, and
          creating a supportive community where everyone can thrive.
        </p>
      </div>
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
    </div>
  );
}

export default AboutPage;
