import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import MainSection from './components/MainSection.jsx';
import Footer from './components/Footer.jsx';
import './assets/scss/styles.scss';

const LandingPage = () => {
  return (
    <React.Fragment>
      <Header />
      <MainSection />
      <Footer />
    </React.Fragment>
  );
};

ReactDOM.render(<LandingPage />, document.getElementById('app'));
