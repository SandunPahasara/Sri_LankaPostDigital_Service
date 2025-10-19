import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

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
    <nav className="navbar">
      {/* First Line - Header with Logo and Department Name */}
      <div className="nav-header" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '1rem 2rem',
        backgroundColor: '#fff',
        borderBottom: '2px solid #ddd'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src="/src/images/pngegg.png"
            alt="Sri Lanka Post Icon"
            className="nav-icon"
            style={{ width: '80px', height: '80px' }}
          />
          <div>
            <h1 style={{ 
              fontSize: '1.5rem', 
              color: '#c8102e', 
              margin: 0,
              fontWeight: 'bold'
            }}>
              ශ්‍රී ලංකා තැපැල් දෙපාර්තමේන්තුව
            </h1>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#c8102e', 
              margin: 0,
              fontWeight: 'normal'
            }}>
              இலங்கை அஞ்சல் திணைக்களம்
            </h2>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#c8102e', 
              margin: 0,
              fontWeight: 'bold'
            }}>
              Department of Posts - Sri Lanka
            </h2>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="#" style={{ color: '#c8102e', textDecoration: 'none', fontWeight: 'bold' }}>සිංහල</Link>
          <Link to="#" style={{ color: '#c8102e', textDecoration: 'none', fontWeight: 'bold' }}>தமிழ்</Link>
          <Link to="#" style={{ color: '#c8102e', textDecoration: 'none', fontWeight: 'bold' }}>English</Link>
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
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className={`nav-link ${isActive('/services')}`}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/track" className={`nav-link ${isActive('/track')}`}>
              Track Parcel
            </Link>
          </li>
          <li>
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
              Contact
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/pickup-request" className={`nav-link ${isActive('/pickup-request')}`}>
                  Pickup Request
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
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={`nav-link ${isActive('/login')}`}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className={`nav-link ${isActive('/register')}`}>
                  Sign Up
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