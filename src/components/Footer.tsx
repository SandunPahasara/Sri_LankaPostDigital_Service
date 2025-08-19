import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sri Lanka Post</h3>
            <p>Modernizing postal services for a digital future while preserving our rich heritage of connecting people across Sri Lanka.</p>
            <div className="flex items-center gap-2 mt-4">
              <Mail size={20} />
              <span>Connecting Sri Lanka Since 1815</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/track">Track Your Parcel</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><a href="#digital-letters">Digital Letter Scanning</a></li>
              <li><a href="#smart-delivery">Smart Delivery</a></li>
              <li><a href="#parcel-tracking">Parcel Tracking</a></li>
              <li><a href="#notifications">SMS/Email Alerts</a></li>
              <li><a href="#payment">Online Payments</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="flex items-center gap-2 mb-2">
              <Phone size={16} />
              <span>+94 11 2 326 203</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} />
              <span>info@slpost.gov.lk</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} />
              <span>310, D.R. Wijewardene Mawatha, Colombo 10</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Mon-Fri: 8:00 AM - 4:30 PM</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Sri Lanka Post. All rights reserved. | Digital transformation for better postal services.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;