import React from 'react';

const AboutPage = () => {
  return (
    <div id="about-page">
      <div id="project-description">
        <div id="project-text">
          Project-I of MCA- 2nd Sem (Session 2021-22)
          <br />
          <strong>Developed by</strong>- Amit Kharod
          <br />
          <strong>Roll No.</strong>- 21121
          <br />
          <strong>Supervisor</strong>- Dr. Preeti Gulia
          <br />
        </div>
        <div id="developer">
          <img src="./img/homepage/profile.png" alt="profilePhoto" />
          <span id="developer-text">
            <span>Student MCA </span>
            <span>M.D. University Rohtak, Haryana</span>
          </span>
        </div>
        <div id="links" className="img-link">
          <div id="imp-link" className="heading-red">Important Links</div>
          <div id="github">
            <img src="./img/icons/GITHUB.png" alt="github" />
            <span className="text">Github</span>
          </div>
          <div id="youtube">
            <img src="./img/homepage/youtube.png" alt="github" />
            <span className="text">Project Summary</span>
          </div>
        </div>
      </div>
      <div id="tech">
        <div className="heading-white">Technologies Used</div>
        <div id="tech-imgs">
          <img src="./img/icons/html5.png" alt="" className="tech-img" />
          <img src="./img/icons/react.png" alt="" className="tech-img" />
          <img src="./img/icons/css3.png" alt="" className="tech-img" />
          <img src="./img/icons/expressjs.png" alt="" className="tech-img" />
          <img src="./img/icons/nodejs.png" alt="" className="tech-img" />
          <img src="./img/icons/mongodb.png" alt="" className="tech-img" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
