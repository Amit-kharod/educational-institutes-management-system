import React from 'react';

const HomePage = () => {
  return (
    <div id="homepage">
      <div id="project-name">
        <div id="eims1" className="eims">
          E<span>ducational</span>
        </div>
        <div id="eims2" className="eims">
          I<span>nstitutes</span>
        </div>
        <div id="eims3" className="eims">
          M<span>anagement</span>
        </div>
        <div id="eims4" className="eims">
          S<span>ystem</span>
        </div>
      </div>
      <div id="headline">
        <div className="headline-text">
          A one-stop system for managing and processing
        </div>
        <div className="headline-text">
          academic data about students and staff
        </div>
        <div className="headline-text">with additional features.</div>
      </div>
      <div id="key-features">
        <div className="big-heading-white">Key Features</div>
        <ul id="features">
          <li className="feature"><span>&#11044;</span> Attendence Record</li>
          <li className="feature"><span>&#11044;</span> Syllabus Manager</li>
          <li className="feature"><span>&#11044;</span> Polls</li>
          <li className="feature"><span>&#11044;</span> Student Verification</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;