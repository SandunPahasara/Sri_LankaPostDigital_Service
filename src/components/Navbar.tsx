import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.3s ease-in-out',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      {/* Animated Gradient Styles */}
      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animated-gradient {
          background: linear-gradient(270deg, #dc143c, #c8102e, #8b0000, #ff6347, #c8102e);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
      `}</style>
      
      {/* First Line - Header with Logo and Department Name */}
      <div className="nav-header animated-gradient" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '1rem 2rem',
        borderBottom: '2px solid #8b0000',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 2 }}>
          <img
            src="/src/images/pngegg.png"
            alt="Sri Lanka Post Icon"
            className="nav-icon"
            style={{ width: '110px', height: '110px', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}
          />
          <div>
            <h1 style={{ 
              fontSize: '1.5rem', 
              color: '#ffffff', 
              margin: 0,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              {language === 'si' ? 'ශ්‍රී ලංකා තැපැල් දෙපාර්තමේන්තුව' : 
               language === 'ta' ? 'இலங்கை அஞ்சல் திணைக்களம்' : 
               'Department of Posts - Sri Lanka'}
            </h1>
            {language === 'en' && (
              <>
                <h2 style={{ 
                  fontSize: '1.2rem', 
                  color: '#ffeb3b', 
                  margin: 0,
                  fontWeight: 'normal',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                  ශ්‍රී ලංකා තැපැල් දෙපාර්තමේන්තුව
                </h2>
                <h2 style={{ 
                  fontSize: '1.2rem', 
                  color: '#ffeb3b', 
                  margin: 0,
                  fontWeight: 'normal',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                  இலங்கை அஞ்சல் திணைக்களம்
                </h2>
              </>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 2 }}>
          <button 
            onClick={() => setLanguage('si')} 
            style={{ 
              color: language === 'si' ? '#ffeb3b' : '#ffffff', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            සිංහල
          </button>
          <button 
            onClick={() => setLanguage('ta')} 
            style={{ 
              color: language === 'ta' ? '#ffeb3b' : '#ffffff', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            தமிழ்
          </button>
          <button 
            onClick={() => setLanguage('en')} 
            style={{ 
              color: language === 'en' ? '#ffeb3b' : '#ffffff', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            English
          </button>
        </div>
      </div>

      {/* Second Line - Navigation Menu */}
      <div className="nav-container" style={{ backgroundColor: '#c8102e' }}>
        <ul className="nav-menu" style={{ 
          display: 'flex', 
          listStyle: 'none', 
          margin: 0, 
          padding: '0.5rem 2rem',
          gap: '2rem'
        }}>
          <li>
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              {t('nav.home')}
            </Link>
          </li>
          <li>
            <Link to="/services" className={`nav-link ${isActive('/services')}`}>
              {t('nav.services')}
            </Link>
          </li>
          <li>
            <Link to="/track" className={`nav-link ${isActive('/track')}`}>
              {t('nav.trackParcel')}
            </Link>
          </li>
          <li>
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              {t('nav.aboutUs')}
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
              {t('nav.contactUs')}
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                  {t('nav.dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/pickup-request" className={`nav-link ${isActive('/pickup-request')}`}>
                  {t('nav.pickupRequest')}
                </Link>
              </li>
              <li style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', padding: '0.5rem 1rem' }}>
                  <User size={16} />
                  <span>{user?.firstName}</span>
                </div>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="nav-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <LogOut size={16} />
                  {t('nav.signOut')}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={`nav-link ${isActive('/login')}`}>
                  {t('nav.signIn')}
                </Link>
              </li>
              <li>
                <Link to="/register" className={`nav-link ${isActive('/register')}`}>
                  {t('nav.signUp')}
                </Link>
              </li>
            </>
          )}
        </ul>

        <button 
          className="mobile-menu-toggle"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;