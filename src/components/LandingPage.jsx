import React from 'react';
import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

/**
 * @method LandingPage
 * @description LandingPage component
 * @returns {JSX} JSX Markup
 */
const LandingPage = () => (
  <React.Fragment>
    <Header />
    <MainSection />
    <Footer />
  </React.Fragment>
);

export default LandingPage;
