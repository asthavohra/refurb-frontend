import React from "react";
import "./About.css";
import aboutImage from "./assets/aboutImage.jpg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Footer from "./Footer";

function About() {
  return (
    <>
      <div className="about">
        <div className="about-me">
          <div className="about-image">
            <img src={aboutImage} alt="my display"></img>
          </div>
          <div className="about-detail">
            <p className="about-para">
              I am a Full-Stack Develeoper based out of London. I am a curious
              coder who is enthusiastic about learning new technologies & loves
              to work on challenging problems. My area of interest is e-commerce
              and ride hailing services.
            </p>
            <p className="about-para">
              If you liked my work and you think I will be a suitable asset for
              your Organization then shoot me an email at
              <span className="about-para-span">
                {" "}
                vohraastha.2712@gmail.com
              </span>{" "}
              or connect with me on LinkedIn and GitHub
            </p>
          </div>
        </div>

        <div className="about-contact">
          <div className="about-icons">
            <div className="about-linkedin">
              <LinkedInIcon
                onClick={(event) =>
                  window.open("https://linkedin.com/in/asthavohra", "_blank")
                }
              />
            </div>
            <div className="about-github">
              <GitHubIcon
                onClick={(event) =>
                  window.open("https://github.com/asthavohra", "_blank")
                }
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
