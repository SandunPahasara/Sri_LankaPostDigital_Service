import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Smartphone, Clock, Shield, Leaf, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Sri Lanka Post Digital Services',
      subtitle: 'Connecting Communities Nationwide',
      description: 'Experience modern postal services with cutting-edge technology',
      image: '/src/images/DOP_newlogo_web.jpg',
      bgColor: 'linear-gradient(135deg, #c8102e 0%, #8b0000 100%)'
    },
    {
      title: 'Express Courier Service',
      subtitle: 'Fast & Reliable Delivery',
      description: 'Same-day and next-day delivery options available across Sri Lanka',
      image: '/src/images/courier-service_10995918.png',
      bgColor: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
    },
    {
      title: 'Digital Solutions',
      subtitle: 'Modern Postal Technology',
      description: 'Track parcels, scan letters, and manage deliveries online',
      image: '/src/images/Gemini_Generated_Image_8jm8258jm8258jm8.png',
      bgColor: 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
    },
    {
      title: 'Secure & Trusted',
      subtitle: 'Over 200 Years of Service',
      description: 'Your trusted partner for all postal and courier needs',
      image: '/src/images/Gemini_Generated_Image_a28vlha28vlha28v.png',
      bgColor: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)'
    },
    {
      title: 'Smart Delivery Options',
      subtitle: 'Flexible & Convenient',
      description: 'Schedule deliveries, track in real-time, and receive instant notifications',
      image: '/src/images/Gemini_Generated_Image_idtqp9idtqp9idtq.png',
      bgColor: 'linear-gradient(135deg, #db2777 0%, #f472b6 100%)'
    },
    {
      title: 'Nationwide Coverage',
      subtitle: 'Serving All of Sri Lanka',
      description: 'From Jaffna to Galle - comprehensive postal network across the island',
      image: '/src/images/Untitled-1.png',
      bgColor: 'linear-gradient(135deg, #ea580c 0%, #fb923c 100%)'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="fade-in" style={{ marginTop: '160px' }}>
      {/* Image Slider Section */}
      <section className="slider-section" style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        overflow: 'hidden',
        marginBottom: '3rem'
      }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: slide.bgColor,
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2rem 4rem',
              gap: '3rem'
            }}
          >
            {/* Text Content */}
            <div style={{
              flex: '1',
              color: 'white',
              zIndex: 2,
              maxWidth: '600px'
            }}>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                {slide.title}
              </h1>
              <h2 style={{
                fontSize: '1.8rem',
                marginBottom: '1.5rem',
                color: '#fbbf24',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                {slide.subtitle}
              </h2>
              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.8',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}>
                {slide.description}
              </p>
            </div>

            {/* Image Content */}
            <div style={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2
            }}>
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem'
                }}
              />
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.3)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.5)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
        >
          <ChevronLeft size={30} color="white" />
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.3)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.5)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
        >
          <ChevronRight size={30} color="white" />
        </button>

        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          zIndex: 10
        }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: currentSlide === index ? '30px' : '10px',
                height: '10px',
                borderRadius: '5px',
                border: 'none',
                background: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
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