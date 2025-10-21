import React from 'react';
import { Package, Smartphone, Clock, CreditCard, Bell, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="fade-in">
      {/* Header */}
      <section className="section">
        <div className="container">
          <h2>{t('services.title')}</h2>
          <p className="section-subtitle">
            Comprehensive postal solutions designed for the digital age, combining 
            traditional reliability with modern convenience.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="service-grid">
            {/* Digital Letter Scanning */}
            <div className="service-card">
              <div className="service-header">
                <Smartphone size={48} />
                <h3>{t('services.digitalLetter')}</h3>
              </div>
              <div className="service-content">
                <div className="service-price">LKR 150<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/letter</span></div>
                <p>{t('services.digitalLetter.desc')}</p>
                
                <ul className="service-features">
                  <li>✓ High-resolution scanning (600 DPI)</li>
                  <li>✓ Secure cloud storage</li>
                  <li>✓ Email delivery within 24 hours</li>
                  <li>✓ OCR text extraction available</li>
                  <li>✓ 5-year digital preservation guarantee</li>
                </ul>
                
                <button className="form-button" style={{ width: '100%' }}>
                  Request Scanning Service
                </button>
              </div>
            </div>

            {/* Smart Delivery Options */}
            <div className="service-card">
              <div className="service-header">
                <Clock size={48} />
                <h3>Smart Delivery Options</h3>
              </div>
              <div className="service-content">
                <div className="service-price">Free<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/basic</span></div>
                <p>Take control of your deliveries with flexible scheduling and redirection options.</p>
                
                <ul className="service-features">
                  <li>✓ Schedule specific delivery times</li>
                  <li>✓ Redirect to nearest branch</li>
                  <li>✓ Safe place delivery instructions</li>
                  <li>✓ Neighbor delivery authorization</li>
                  <li>✓ Weekend delivery (premium: LKR 250)</li>
                </ul>
                
                <button className="form-button" style={{ width: '100%' }}>
                  Manage Deliveries
                </button>
              </div>
            </div>

            {/* Track & Trace Service */}
            <div className="service-card">
              <div className="service-header">
                <Package size={48} />
                <h3>Advanced Tracking</h3>
              </div>
              <div className="service-content">
                <div className="service-price">Free<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/all parcels</span></div>
                <p>Real-time tracking with detailed status updates and delivery predictions.</p>
                
                <ul className="service-features">
                  <li>✓ Real-time location updates</li>
                  <li>✓ Estimated delivery time</li>
                  <li>✓ Photo proof of delivery</li>
                  <li>✓ Delivery history archive</li>
                  <li>✓ Share tracking with others</li>
                </ul>
                
                <button className="form-button" style={{ width: '100%' }}>
                  Track Your Parcel
                </button>
              </div>
            </div>

            {/* Premium Notifications */}
            <div className="service-card">
              <div className="service-header">
                <Bell size={48} />
                <h3>Premium Notifications</h3>
              </div>
              <div className="service-content">
                <div className="service-price">LKR 99<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/month</span></div>
                <p>Enhanced notification system with multiple channels and preferences.</p>
                
                <ul className="service-features">
                  <li>✓ SMS + Email + Push notifications</li>
                  <li>✓ Custom notification schedules</li>
                  <li>✓ Family member notifications</li>
                  <li>✓ Voice call alerts</li>
                  <li>✓ Priority customer support</li>
                </ul>
                
                <button className="form-button" style={{ width: '100%' }}>
                  Upgrade Notifications
                </button>
              </div>
            </div>

            {/* Goods Transportation */}
            <div className="service-card">
              <div className="service-header">
                <Truck size={48} />
                <h3>Goods Transportation</h3>
              </div>
              <div className="service-content">
                <div className="service-price">From LKR 500<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/kg</span></div>
                <p>Reliable transportation services for businesses and individuals across Sri Lanka.</p>
                
                <ul className="service-features">
                  <li>✓ Island-wide delivery network</li>
                  <li>✓ Express delivery options</li>
                  <li>✓ Bulk shipping discounts</li>
                  <li>✓ Fragile item handling</li>
                  <li>✓ Insurance coverage available</li>
                </ul>
                
                <button className="form-button" style={{ width: '100%' }}>
                  Calculate Shipping
                </button>
              </div>
            </div>

            {/* Payment Gateway */}
            <div className="service-card">
              <div className="service-header">
                <CreditCard size={48} />
                <h3>Digital Payments</h3>
              </div>
              <div className="service-content">
                <div className="service-price">Secure<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/encrypted</span></div>
                <p>Safe and convenient payment options for all postal services.</p>
                
                <ul className="service-features">
                  <li>✓ Credit/Debit card payments</li>
                  <li>✓ Mobile wallet integration</li>
                  <li>✓ Bank transfer options</li>
                  <li>✓ Auto-payment subscriptions</li>
                  <li>✓ Digital receipts</li>
                </ul>
                
                <button className="form-button" style={{ width: '100%' }}>
                  Payment Options
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="section good-facts">
        <div className="container">
          <h2>Traditional vs Digital Services</h2>
          <p className="section-subtitle">
            See how our digital transformation benefits you and the environment.
          </p>
          
          <div className="facts-grid">
            <div className="fact-card">
              <span className="fact-number">24/7</span>
              <span className="fact-label">Digital Availability</span>
              <p>Access services anytime vs limited office hours</p>
            </div>
            
            <div className="fact-card">
              <span className="fact-number">5 min</span>
              <span className="fact-label">Average Process Time</span>
              <p>Digital requests vs 30+ minutes in-person</p>
            </div>
            
            <div className="fact-card">
              <span className="fact-number">Zero</span>
              <span className="fact-label">Paper Waste</span>
              <p>Completely paperless digital services</p>
            </div>
            
            <div className="fact-card">
              <span className="fact-number">100%</span>
              <span className="fact-label">Accuracy</span>
              <p>Digital forms eliminate handwriting errors</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;