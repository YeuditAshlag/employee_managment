import React from 'react';
import { Link } from 'react-router-dom';
import '../style/homePage.css';
import { useState } from 'react';
import Footer from '../components/Header/footer';

import company1 from '../images/company1.jpg'; // כנס כאן את נתיבי התמונות של החברות הייטק
import company2 from '../images/company2.jpg';
import company3 from '../images/company3.jpg';
import company4 from '../images/company4.jpg';
import company5 from '../images/company5.jpg';
import company6 from '../images/company6.jpg';
import company7 from '../images/company7.jpg';
import company8 from '../images/company8.jpg';
import company9 from '../images/company9.jpg';






// וכן הלאה עבור כל חברה

function HomePage() {

  // הוספת מערך של התמונות של החברות הייטק
  const images = [company1, company2 ,company3,company4,company5,company6,company7,company8,company9/* וכן הלאה עבור כל חברה */];

  return (
    <>
      <section id="one">
        <div className="content">
          <div className="text-content">
            <h1 className="white">Employee management <strong>the lever for success!</strong></h1>
            <h4 className="blackish">Maximizing Your Business Success with Unique Management Tools!</h4>
            <div className="two-button">
              <Link to="/employee" className="t-btn btn">all employees</Link>
              <Link to="/" className="t-btn btn">Sign In</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="one-half" className="goblack">
        <span><img src="C:\Users\user1\Downloads\Investment data-amico.svg" alt="" /></span>
        <div className="half-content">
          <div className="half__text">
            <h1>About Us</h1>
            <p>
              We help those who build the future to make it amazing.
              In an era where new technologies are born every minute, and the demand for meaningful digital experiences has never been so intense, we unlock our customers’ innovative potential, empowering them to transform their boldest ideas into reality, and make billions of people feel like VIPs.

              Our approximately 30,000 employees around the globe are here to accelerate our customers’ migration to the cloud, differentiate in the 5G era, digitalize and automate their operations, and provide end users with the next-generation communication and media experiences that make the world say wow.</p>
          </div>
          <div className="half__boxes">
            <div className="box">
              <br />
              <span href="#"><i className="fas fa-compass" style={{ color: 'blue' }}></i></span>
              <h2>Our Mission</h2>
              <p>We are committed to making a difference in society by prioritizing inclusion and diversity, supporting communities, and creating sustainable products and services.
              </p>
            </div>
            <div className="box">
              <br />
              <span href="#"><i className="fas fa-flag" style={{ color: 'blue' }}></i></span>
              <h2>Our approach</h2>
              <p>We are approaching sustainability holistically and embedding it in our overall strategy.</p>
            </div>
          </div>
        </div>
      </section>
      <h2 style={{ textAlign: "center", color: "black" }}>Companies that work with us</h2>

      <section id="company-logos">
        
        <div className="company-logos-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Company Logo ${index + 1}`}
              className="company-logo"
              
            />
          ))}
        </div>
      </section>

      <div style={{ backgroundColor: '#ffff', height: '30vh' }}></div>
      <section id="business_about">
      </section>
      <Footer />
    </>
  );
}

export default HomePage;
