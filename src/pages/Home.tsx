import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Smartphone, Clock, Shield, Leaf, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1>{t('home.hero.title')}</h1>
          <p>
            {t('home.hero.subtitle')}
          </p>
          <Link to="/services" className="cta-button">
            {t('home.hero.cta')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2>{t('services.title')}</h2>
          <p className="section-subtitle">
            Experience the future of postal services with our innovative digital solutions 
            designed to make your life easier and more connected.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Package />
              </div>
              <h3>{t('services.trackTrace')}</h3>
              <p>
                {t('services.trackTrace.desc')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Smartphone />
              </div>
              <h3>{t('services.digitalLetter')}</h3>
              <p>
                {t('services.digitalLetter.desc')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Clock />
              </div>
              <h3>{t('services.smartDelivery')}</h3>
              <p>
                {t('services.smartDelivery.desc')}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Shield />
              </div>
              <h3>{t('services.secureNotifications')}</h3>
              <p>
                {t('services.secureNotifications.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Good Facts Section */}
      <section className="section good-facts">
        <div className="container">
          <h2>Why Choose Digital Sri Lanka Post?</h2>
          <p className="section-subtitle">
            Discover the benefits of our modernized postal services and our commitment 
            to sustainability and efficiency.
          </p>
          
          <div className="facts-grid">
            <div className="fact-card">
              <Leaf className="feature-icon" style={{ margin: '0 auto 1rem' }} />
              <span className="fact-number">75%</span>
              <span className="fact-label">Reduced Paper Usage</span>
              <p>Digital letters and receipts significantly reduce our environmental impact.</p>
            </div>
            
            <div className="fact-card">
              <Zap className="feature-icon" style={{ margin: '0 auto 1rem' }} />
              <span className="fact-number">3x</span>
              <span className="fact-label">Faster Processing</span>
              <p>Digital services process requests 3 times faster than traditional methods.</p>
            </div>
            
            <div className="fact-card">
              <Package className="feature-icon" style={{ margin: '0 auto 1rem' }} />
              <span className="fact-number">10,000+</span>
              <span className="fact-label">Letters Preserved</span>
              <p>Historical letters digitally preserved for future generations.</p>
            </div>
            
            <div className="fact-card">
              <Shield className="feature-icon" style={{ margin: '0 auto 1rem' }} />
              <span className="fact-number">99.9%</span>
              <span className="fact-label">Security Rate</span>
              <p>Bank-level security ensures your documents and data are protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="section">
        <div className="container">
          <div className="form-container">
            <h2>Stay Updated</h2>
            <p className="section-subtitle">
              Subscribe to receive notifications about your deliveries and updates 
              about our services.
            </p>
            
            <form>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-input" 
                  placeholder="Enter your email address"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Mobile Number (Optional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="form-input" 
                  placeholder="+94 77 123 4567"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Notification Preferences</label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" defaultChecked />
                    Email Notifications
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" />
                    SMS Notifications
                  </label>
                </div>
              </div>
              
              <button type="submit" className="form-button">
                Subscribe to Updates
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;