import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, MapPin, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Register: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
      district: '',
      postalCode: ''
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sriLankanDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  return (
    <div className="fade-in">
      <section className="section">
        <div className="container">
          <div className="form-container" style={{ maxWidth: '600px' }}>
            <div className="text-center mb-4">
              <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
                <UserPlus />
              </div>
              <h2>{t('register.title')}</h2>
              <p className="section-subtitle">
                Join Sri Lanka Post digital services today
              </p>
            </div>

            {error && (
              <div style={{
                background: '#fee2e2',
                color: '#dc2626',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    <User size={16} style={{ marginRight: '0.5rem' }} />
                    {t('register.firstName')} *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-input"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    <User size={16} style={{ marginRight: '0.5rem' }} />
                    {t('register.lastName')} *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-input"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <Mail size={16} style={{ marginRight: '0.5rem' }} />
                    Email Address *
                  </label>
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

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <Phone size={16} style={{ marginRight: '0.5rem' }} />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+94 77 123 4567"
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="form-group">
                <label htmlFor="address.street" className="form-label">
                  <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                  Street Address *
                </label>
                <input
                  type="text"
                  id="address.street"
                  name="address.street"
                  className="form-input"
                  value={formData.address.street}
                  onChange={handleChange}
                  required
                  placeholder="Enter your street address"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="address.city" className="form-label">City *</label>
                  <input
                    type="text"
                    id="address.city"
                    name="address.city"
                    className="form-input"
                    value={formData.address.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter your city"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address.district" className="form-label">District *</label>
                  <select
                    id="address.district"
                    name="address.district"
                    className="form-select"
                    value={formData.address.district}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select District</option>
                    {sriLankanDistricts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="address.postalCode" className="form-label">Postal Code *</label>
                  <input
                    type="text"
                    id="address.postalCode"
                    name="address.postalCode"
                    className="form-input"
                    value={formData.address.postalCode}
                    onChange={handleChange}
                    required
                    placeholder="12345"
                    pattern="[0-9]{5}"
                    title="Please enter a 5-digit postal code"
                  />
                </div>
              </div>

              {/* Password Information */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    <Lock size={16} style={{ marginRight: '0.5rem' }} />
                    Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      className="form-input"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Create a password"
                      style={{ paddingRight: '3rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-light)'
                      }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    <Lock size={16} style={{ marginRight: '0.5rem' }} />
                    Confirm Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirm your password"
                      style={{ paddingRight: '3rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-light)'
                      }}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="form-button"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="text-center mt-4">
              <p style={{ color: 'var(--text-light)' }}>
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: 'var(--primary-red)', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;