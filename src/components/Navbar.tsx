import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Menu, X, User, LogOut } from 'lucide-react';
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
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Mail size={32} />
          <span>Sri Lanka Post</span>
        </Link>
        
        <ul className="nav-menu">
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