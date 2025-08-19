import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, Clock, CheckCircle, XCircle, TrendingUp, User, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userAPI, pickupAPI } from '../services/api';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [dashboardResponse, requestsResponse] = await Promise.all([
          userAPI.getDashboard(),
          pickupAPI.getMyRequests(1, 5)
        ]);

        setDashboardData(dashboardResponse.data.data);
        setRecentRequests(requestsResponse.data.data.requests);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#10b981';
      case 'in_transit':
      case 'picked_up':
        return '#3b82f6';
      case 'confirmed':
        return '#f59e0b';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="fade-in">
        <section className="section">
          <div className="container">
            <div className="text-center">
              <div className="feature-icon" style={{ margin: '0 auto 2rem' }}>
                <Package />
              </div>
              <h2>Loading Dashboard...</h2>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Welcome Header */}
      <section className="hero" style={{ padding: '2rem 0' }}>
        <div className="hero-container">
          <h1>Welcome back, {user?.firstName}!</h1>
          <p>Manage your pickup requests and track your deliveries from your personal dashboard.</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section">
        <div className="container">
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <Link to="/pickup-request" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <Plus />
              </div>
              <h3>New Pickup Request</h3>
              <p>Schedule a pickup for your letters, packages, or goods</p>
            </Link>

            <Link to="/my-requests" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <Package />
              </div>
              <h3>My Requests</h3>
              <p>View and manage all your pickup requests</p>
            </Link>

            <Link to="/track" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <Clock />
              </div>
              <h3>Track Delivery</h3>
              <p>Track your packages in real-time</p>
            </Link>

            <Link to="/profile" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <Settings />
              </div>
              <h3>Account Settings</h3>
              <p>Update your profile and preferences</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      {dashboardData && (
        <section className="section good-facts">
          <div className="container">
            <h2>Your Activity Summary</h2>
            <div className="facts-grid">
              <div className="fact-card">
                <Package className="feature-icon" style={{ margin: '0 auto 1rem' }} />
                <span className="fact-number">{dashboardData.stats.total}</span>
                <span className="fact-label">Total Requests</span>
              </div>

              <div className="fact-card">
                <CheckCircle className="feature-icon" style={{ margin: '0 auto 1rem' }} />
                <span className="fact-number">{dashboardData.stats.delivered}</span>
                <span className="fact-label">Delivered</span>
              </div>

              <div className="fact-card">
                <Clock className="feature-icon" style={{ margin: '0 auto 1rem' }} />
                <span className="fact-number">{dashboardData.stats.in_transit + dashboardData.stats.picked_up}</span>
                <span className="fact-label">In Progress</span>
              </div>

              <div className="fact-card">
                <TrendingUp className="feature-icon" style={{ margin: '0 auto 1rem' }} />
                <span className="fact-number">LKR {dashboardData.stats.totalSpent.toLocaleString()}</span>
                <span className="fact-label">Total Spent</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Requests */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Recent Pickup Requests</h2>
            <Link to="/my-requests" className="cta-button">View All</Link>
          </div>

          {recentRequests.length > 0 ? (
            <div className="service-grid">
              {recentRequests.map((request) => (
                <div key={request._id} className="service-card">
                  <div className="service-header" style={{ background: getStatusColor(request.status) }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getStatusIcon(request.status)}
                      <span>{request.trackingNumber}</span>
                    </div>
                  </div>
                  <div className="service-content">
                    <h3 style={{ textTransform: 'capitalize', marginBottom: '0.5rem' }}>
                      {request.serviceType} Service
                    </h3>
                    <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
                      Status: <strong style={{ textTransform: 'capitalize' }}>{request.status.replace('_', ' ')}</strong>
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>
                        LKR {request.cost?.totalCost?.toLocaleString() || 0}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Link 
                      to={`/track?number=${request.trackingNumber}`}
                      className="form-button"
                      style={{ width: '100%', marginTop: '1rem', textDecoration: 'none', textAlign: 'center', display: 'block' }}
                    >
                      Track Request
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ padding: '3rem 0' }}>
              <Package size={64} style={{ color: 'var(--text-light)', marginBottom: '1rem' }} />
              <h3>No pickup requests yet</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                Create your first pickup request to get started with our services.
              </p>
              <Link to="/pickup-request" className="cta-button">
                Create Pickup Request
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Account Actions */}
      <section className="section good-facts">
        <div className="container">
          <div className="form-container text-center">
            <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
              <User />
            </div>
            <h2>Account Management</h2>
            <p style={{ marginBottom: '2rem' }}>
              Keep your account information up to date and manage your preferences.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/profile" className="cta-button">
                Update Profile
              </Link>
              <button 
                onClick={logout}
                className="form-button"
                style={{ background: 'var(--text-light)' }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;