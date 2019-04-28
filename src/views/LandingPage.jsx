import React from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

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
