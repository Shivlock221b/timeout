import React from 'react';
import Header from '../../components/layout/Header';
import '../../styles/InfoPages.css';

// Following Single Responsibility Principle - BusinessPage only handles display of business information
const BusinessPage = () => {
  return (
    <div className="info-page-container">
      <Header />
      <div className="info-content-wrapper">
        <div className="info-content">
          <h1>Business</h1>
          <section className="info-section">
            <h2>Partner with Tymout</h2>
            <p>
              Tymout offers businesses a unique opportunity to connect with local customers through authentic experiences.
              Whether you're a restaurant, activity provider, or venue, our platform can help you increase visibility and build customer loyalty.
            </p>
          </section>
          
          <section className="info-section">
            <h2>Benefits for Businesses</h2>
            <ul className="feature-list">
              <li>
                <h3>Increased Local Visibility</h3>
                <p>Connect with customers specifically interested in your type of business.</p>
              </li>
              <li>
                <h3>Host Featured Experiences</h3>
                <p>Create special events that showcase what makes your business unique.</p>
              </li>
              <li>
                <h3>Customer Insights</h3>
                <p>Gain valuable data about customer preferences and interests.</p>
              </li>
              <li>
                <h3>Community Building</h3>
                <p>Develop a loyal community around your brand and offerings.</p>
              </li>
            </ul>
          </section>
          
          <section className="info-section">
            <h2>How It Works</h2>
            <ol className="steps-list">
              <li>
                <p><strong>Register your business</strong> on our platform.</p>
              </li>
              <li>
                <p><strong>Create experiences</strong> that showcase your offerings.</p>
              </li>
              <li>
                <p><strong>Connect with customers</strong> who are interested in what you offer.</p>
              </li>
              <li>
                <p><strong>Build relationships</strong> that extend beyond single transactions.</p>
              </li>
            </ol>
          </section>
          
          <section className="info-section">
            <h2>Get Started</h2>
            <p>
              Ready to grow your business with Tymout? Contact our business team to learn more about partnership opportunities.
            </p>
            <button className="primary-button mt-4">Contact Business Team</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
