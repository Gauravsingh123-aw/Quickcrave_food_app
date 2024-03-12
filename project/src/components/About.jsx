import React from 'react';
import '../css/AboutUsComponent.css';
import deliveryImage from '../assets/res10.jpg';

function About() {
  return (
    <div className="about-us-container">
      <h2>About Us</h2>
      <img src={deliveryImage} alt="Delivery" className="delivery-image" />
      <p>Welcome to our food delivery app! We are passionate about delivering delicious meals right to your doorstep.</p>
      <p>Our mission is to provide convenient, high-quality food delivery service that exceeds your expectations.</p>
      <p>With a wide variety of cuisines and speedy delivery, we aim to make every meal a delightful experience for you.</p>
      <p>Join us on this culinary journey and elevate your dining experience with our app!</p>
    </div>
  );
}

export default About;