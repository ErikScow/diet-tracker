import React from "react";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer>
        <div className="personal-links footer-links-container">
          <h3>Personal Links:</h3>
          <a
            className="footer-links"
            href="https://github.com/ErikScow"
            target="_blank"
          >
            Github
          </a>
          <a
            className="footer-links"
            href="https://www.linkedin.com/in/erik-scow-134b8116b"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            className="footer-links"
            href="https://erikscow.com"
            target="_blank"
          >
            Portfolio
          </a>
        </div>
        <div className="project-links footer-links-container">
          <h3>Project Links:</h3>
          <a
            className="footer-links"
            href="https://github.com/ErikScow/diet-tracker"
            target="_blank"
          >
            Project Repo
          </a>
          <a className="footer-links" href="" target="_blank"></a>
        </div>
        <div className="contact-links footer-links-container">
          <h3>Contact:</h3>
          <a className="footer-links" href="mailto: erikscow@gmail.com">
            Email
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
