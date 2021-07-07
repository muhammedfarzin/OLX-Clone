import React from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import './Home.css';
import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import LoadingPage from './LoadingPage';

function Home() {
  return (
    <div className="homeParentDiv">
      <LoadingPage />
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;