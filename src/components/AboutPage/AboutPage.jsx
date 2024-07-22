import React from "react";
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="container">
      <div className="section">
        <img src="../images/PLaunch.png" alt="Professional Launch Logo" className="logo"/>
        <h1>What Is Professional Launch?</h1>
        <p>
          The Professional Launch Mentorship management system is a web-based,
          mobile-first application designed to facilitate and manage mentorship
          relationships. The system allows mentors and mentees to create
          profiles, establish connections, and propose meetings. This will allow
          mentees to develop their skills, build a professional network, and
          receive guidance on career advancement to achieve career goals.
        </p>
      </div>
      <div className="section">
        <h1>What Is Our Mission?</h1>
        <p>
          We are positively connecting the less connected, bridging gaps, and building
          futures in the community. Our mentorship program is dedicated to
          fostering meaningful relationships, empowering individuals, and
          creating a supportive community where everyone can thrive.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
