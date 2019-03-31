import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero">
      <h2 className="hero-title">Make your voice count</h2>
      <p className="hero-paragraph">
        iReporter is a platform that enables citizens report cases of corruption
        to appropriate authorities and also report issues that need government
        intervention. As a user of the platform, you can also view reports and
        interventions created by other users.
      </p>
      <div className="hero-cta">
        <Router>
          <Link className="btn btn-white" to="/create-report">
            {'Get Started '}
            <i className="fas fa-arrow-right" />
          </Link>
        </Router>
      </div>
    </section>
  );
};

const HowToSection = () => {
  return (
    <section className="how-to">
      <h2 className="section-title">How it works</h2>
      <p className="section-text">
        In 3 easy steps you can easily report corruption cases and seek
        government intervention.
      </p>
      <div className="features">
        <div className="column feature-item">
          <span className="circle-icon">1</span>
          <p className="section-text">
            Create and submit a red flag or intervention record. Set a title,
            attach images/videos and input your location.
          </p>
        </div>
        <div className="column feature-item">
          <span className="circle-icon">2</span>
          <p className="section-text">
            Your record gets submitted to the appropriate authority and process
            is put in place to start reviewing your record.
          </p>
        </div>
        <div className="column feature-item">
          <span className="circle-icon">3</span>
          <p className="section-text">
            Your record gets reviewed and you get a real time email feedback
            upon completion of the reviews.
          </p>
        </div>
      </div>
    </section>
  );
};

const FeaturedSection = () => {
  return (
    <section className="featured section-dark">
      <h2 className="section-title">Top Features</h2>
      <div className="features">
        <div className="column feature-item">
          <p className="circle-icon">
            <i className="fas fa-bell" />
          </p>
          <p className="section-text">
            Receive real time email and SMS notifications immediately your
            report has been resolved. You get updated as soon as your report has
            been reviewed and attended to.
          </p>
        </div>
        <div className="column feature-item">
          <p className="circle-icon">
            <i className="fas fa-map-marked-alt" />
          </p>
          <p className="section-text">
            Set the location you are reporting from. You can either choose to
            enter an address or select you current location.
          </p>
        </div>
        <div className="column feature-item">
          <p className="circle-icon">
            <i className="fas fa-images" />
          </p>
          <p className="section-text">
            Ability to add media (photos and videos) attachments to help
            validate your report.
          </p>
        </div>
      </div>
    </section>
  );
};

const MainSection = () => {
  return (
    <main>
      <HeroSection />
      <HowToSection />
      <FeaturedSection />
    </main>
  );
};

export default MainSection;
