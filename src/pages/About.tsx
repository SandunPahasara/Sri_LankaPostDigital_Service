import React from 'react';
import { Calendar, Users, Award, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="fade-in">
      {/* Header */}
      <section className="section">
        <div className="container">
          <h2>About Sri Lanka Post</h2>
          <p className="section-subtitle">
            Over 200 years of trusted service, now modernized for the digital age. 
            Discover our journey from traditional mail to cutting-edge postal solutions.
          </p>
        </div>
      </section>

      {/* History Timeline */}
      <section className="section">
        <div className="container">
          <h2>Our Journey Through Time</h2>
          
          <div className="tracking-timeline" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>1815 - The Beginning</h4>
                <p>
                  Sri Lanka Post was established during the British colonial period, 
                  becoming one of the oldest postal services in Asia.
                </p>
                <span className="timeline-date">Over 200 years ago</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>1948 - Independence Era</h4>
                <p>
                  Continued to serve the nation through independence, expanding 
                  services to rural areas and connecting communities.
                </p>
                <span className="timeline-date">77 years ago</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>2000s - Digital Transition</h4>
                <p>
                  Began modernization efforts with computerized systems and 
                  tracking capabilities for improved efficiency.
                </p>
                <span className="timeline-date">2000 onwards</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>2025 - Digital Revolution</h4>
                <p>
                  Launched comprehensive digital services including letter scanning, 
                  smart delivery, and mobile-first customer experiences.
                </p>
                <span className="timeline-date">Today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section good-facts">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Target />
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide reliable, efficient, and innovative postal services that 
                connect people, preserve memories, and support economic growth 
                throughout Sri Lanka.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Award />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the leading postal service provider in South Asia, known for 
                digital innovation, environmental responsibility, and exceptional 
                customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section">
        <div className="container">
          <h2>Our Impact in Numbers</h2>
          <div className="facts-grid">
            <div className="fact-card">
              <span className="fact-number">200+</span>
              <span className="fact-label">Years of Service</span>
              <p>Trusted by generations of Sri Lankans since 1815</p>
            </div>
            
            <div className="fact-card">
              <span className="fact-number">500+</span>
              <span className="fact-label">Post Offices</span>
              <p>Comprehensive network covering every district</p>
            </div>
            
            <div className="fact-card">
              <span className="fact-number">10M+</span>
              <span className="fact-label">Annual Deliveries</span>
              <p>Letters, packages, and digital services delivered yearly</p>
            </div>
            
            <div className="fact-card">
              <span className="fact-number">98.5%</span>
              <span className="fact-label">Delivery Success Rate</span>
              <p>Industry-leading reliability and customer satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modernization Efforts */}
      <section className="section">
        <div className="container">
          <h2>Modernization Initiatives</h2>
          <p className="section-subtitle">
            Our commitment to innovation while preserving the values that have 
            made us Sri Lanka's most trusted postal service.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Calendar />
              </div>
              <h3>Digital Transformation</h3>
              <p>
                Comprehensive digitization of services including online tracking, 
                digital letter scanning, and mobile payment integration for 
                modern convenience.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users />
              </div>
              <h3>Staff Training Programs</h3>
              <p>
                Continuous professional development ensures our team is equipped 
                with the latest skills in customer service and technology.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Award />
              </div>
              <h3>Quality Assurance</h3>
              <p>
                ISO-certified processes and regular quality audits maintain our 
                high standards of service delivery and customer satisfaction.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Target />
              </div>
              <h3>Sustainability Focus</h3>
              <p>
                Environmental initiatives including electric delivery vehicles, 
                paperless operations, and carbon-neutral delivery options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="section good-facts">
        <div className="container">
          <div className="form-container text-center">
            <h2>A Message from Our Leadership</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8', margin: '2rem 0' }}>
              "As we enter our third century of service, Sri Lanka Post remains committed 
              to evolving with the times while maintaining the trust and reliability our 
              customers have come to expect. Our digital transformation represents not 
              just technological advancement, but our dedication to serving Sri Lanka's 
              communication needs for generations to come."
            </p>
            <p style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>
              — Postmaster General, Sri Lanka Post
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;