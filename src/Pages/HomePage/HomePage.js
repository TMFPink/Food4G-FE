import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 
import member1 from '../../Asset/homepage/nguyentoankhang.jpg'
import member2 from '../../Asset/homepage/tranminhnguyenhong.jpg'
import cbum from'../../Asset/homepage/cbum.jpg'


function homepage() {
  return (
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Your Fitness Journey</h1>
          <p>Start your fitness journey with personalized meal plans and calorie tracking.</p>
          <Link to="/tdee" className="cta-button">Calculate Your TDEE</Link>
        </div>
      </section>

      <section className="features-section">
        <div className="feature">
          <h2>Personalized Meal Plans</h2>
          <p>Access a variety of meal plans tailored to your dietary preferences and fitness goals.</p>
        </div>
        <div className="feature">
          <h2>Track Your Progress</h2>
          <p>Monitor your calorie intake and track your progress towards your fitness goals.</p>
        </div>
        <div className="feature">
          <h2>Expert Blog</h2>
          <p>Stay informed with our expert blog featuring fitness tips, recipes, and success stories.</p>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial">
          <div className="avatar">
            <img src= {cbum} alt="Avatar" className="avatar-img" />
          </div>
          <div className="testimonial-content">
            <p>"This website has transformed the way I approach fitness. The meal plans are delicious and easy to follow, and the calorie tracking feature helps me stay on track with my goals."</p>
            <p className="author">- Christopher Adam Bumstead, Fitness Enthusiast</p>
          </div>
        </div>
      </section>

      <section className="about-us-section">
        <div className="section-content">
          <h2>About Us</h2>
          <p>Our mission is to help you achieve your fitness goals through personalized meal plans and effective calorie tracking.</p>
          <h3 style={{color:'#FFFFFF'}}>Meet the Team</h3>
          <div className="team-members">
            <div className="team-member">
              <img src= {member2} alt="Tran Minh Nguyen Hong" />
              <h4>Tran Minh Nguyen Hong</h4>
            </div>
            <div className="team-member">
              <img src={member1} alt="Nguyen Toan Khang" />
              <h4>Nguyen Toan Khang</h4>
            </div>
          </div>
        </div>
      </section>
        
      <section className="cta-section">
        <div className="section-content">
          <h2 style={{marginLeft:'25px'}}>Ready to Start Your Journey?</h2>
          <div className='ready-section'>
            <p>Take the first step towards your fitness goals.</p>
            <Link to="/signup" className="cta-button">Sign Up Now</Link>
            <p>Have questions? Contact us at <span className="contact-email">food4g@gmail.com</span></p>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-content">
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><div style={{color:'#FFFFFF'}}> Terms of Service </div></li>
            <li><div style={{color:'#FFFFFF'}}> Privacy Policy </div></li>
            <li><a href="mailto:food4g@gmail.com">Contact Us</a></li>
          </ul>
          <p style={{color:'#FFFFFF'}}>&copy; 2024 Fitness Journey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default homepage;
