import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="fade-in">
        <section className="section">
          <div className="container">
            <div className="form-container text-center">
              <div className="feature-icon" style={{ margin: '0 auto 2rem' }}>
                <Send />
              </div>
              <h2>Thank You!</h2>
              <p className="section-subtitle">
                Your message has been received. Our customer service team will 
                respond to you within 24 hours.
              </p>
              <button 
                className="cta-button"
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <section className="section">
        <div className="container">
          <h2>Contact Us</h2>
          <p className="section-subtitle">
            Get in touch with our customer service team. We're here to help with 
            any questions about our services or your deliveries.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Phone />
              </div>
              <h3>Call Us</h3>
              <p><strong>Hotline:</strong> +94 11 2 326 203</p>
              <p><strong>Customer Service:</strong> +94 11 2 421 271</p>
              <p>Mon-Fri: 8:00 AM - 4:30 PM<br />Saturday: 8:00 AM - 12:30 PM</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Mail />
              </div>
              <h3>Email Us</h3>
              <p><strong>General:</strong> info@slpost.gov.lk</p>
              <p><strong>Customer Service:</strong> support@slpost.gov.lk</p>
              <p><strong>Digital Services:</strong> digital@slpost.gov.lk</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <MapPin />
              </div>
              <h3>Visit Us</h3>
              <p><strong>Head Office:</strong></p>
              <p>310, D.R. Wijewardene Mawatha<br />Colombo 10, Sri Lanka</p>
              <p><strong>Postal Code:</strong> 01000</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Clock />
              </div>
              <h3>Business Hours</h3>
              <p><strong>Weekdays:</strong> 8:00 AM - 4:30 PM</p>
              <p><strong>Saturday:</strong> 8:00 AM - 12:30 PM</p>
              <p><strong>Sunday:</strong> Closed</p>
              <p><strong>Digital Services:</strong> 24/7 Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section good-facts">
        <div className="container">
          <div className="form-container">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle size={32} color="var(--primary-red)" />
              <h2>Send us a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+94 77 123 4567"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="category" className="form-label">Inquiry Category</label>
                  <select
                    id="category"
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="tracking">Parcel Tracking</option>
                    <option value="digital-letters">Digital Letter Services</option>
                    <option value="delivery">Delivery Issues</option>
                    <option value="payment">Payment Support</option>
                    <option value="complaint">Complaint</option>
                    <option value="suggestion">Suggestion</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief description of your inquiry"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Please provide details about your inquiry or issue. Include tracking numbers if relevant."
                />
              </div>
              
              <button type="submit" className="form-button" style={{ width: '100%' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>How long does delivery take?</h3>
              <p>
                Standard delivery within Colombo takes 1-2 business days. 
                Island-wide delivery typically takes 3-5 business days depending 
                on the destination.
              </p>
            </div>
            
            <div className="feature-card">
              <h3>Can I change my delivery address?</h3>
              <p>
                Yes! Use our Smart Delivery service to redirect packages to 
                your nearest post office or schedule a new delivery time that 
                suits you.
              </p>
            </div>
            
            <div className="feature-card">
              <h3>How much does digital letter scanning cost?</h3>
              <p>
                Digital letter scanning costs LKR 150 per letter, including 
                high-resolution scanning, secure storage, and email delivery 
                within 24 hours.
              </p>
            </div>
            
            <div className="feature-card">
              <h3>What payment methods do you accept?</h3>
              <p>
                We accept all major credit/debit cards, mobile wallets, 
                bank transfers, and cash payments at our post office locations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;