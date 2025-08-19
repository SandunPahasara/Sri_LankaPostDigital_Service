import React, { useState } from 'react';
import { Search, Package, MapPin, Clock, CheckCircle } from 'lucide-react';

const TrackParcel: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock tracking data
      const mockData = {
        trackingNumber: trackingNumber,
        status: 'in-transit',
        estimatedDelivery: 'Tomorrow, 2:00 PM - 5:00 PM',
        currentLocation: 'Colombo Central Sorting Facility',
        recipient: 'John Perera',
        sender: 'Amazon.lk',
        timeline: [
          {
            status: 'Package received',
            location: 'Kelaniya Post Office',
            date: 'Jan 15, 2025 - 9:30 AM',
            completed: true
          },
          {
            status: 'In transit to sorting facility',
            location: 'Colombo Central',
            date: 'Jan 15, 2025 - 2:15 PM',
            completed: true
          },
          {
            status: 'Out for delivery',
            location: 'Dehiwala Post Office',
            date: 'Jan 16, 2025 - 8:00 AM',
            completed: true
          },
          {
            status: 'Delivered',
            location: 'Recipient address',
            date: 'Estimated: Jan 16, 2025 - 3:00 PM',
            completed: false
          }
        ]
      };
      
      setTrackingResult(mockData);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'status-delivered';
      case 'in-transit':
        return 'status-in-transit';
      default:
        return 'status-pending';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in-transit':
        return 'In Transit';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="fade-in">
      <section className="section">
        <div className="container">
          <h2>Track Your Parcel</h2>
          <p className="section-subtitle">
            Enter your tracking number below to get real-time updates on your delivery.
          </p>
          
          <div className="form-container">
            <form onSubmit={handleTrack}>
              <div className="form-group">
                <label htmlFor="tracking" className="form-label">
                  Tracking Number
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="tracking"
                    className="form-input"
                    placeholder="Enter your tracking number (e.g., SLP123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    required
                    style={{ paddingRight: '3rem' }}
                  />
                  <Search 
                    size={20} 
                    style={{ 
                      position: 'absolute', 
                      right: '1rem', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: '#6b7280'
                    }} 
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="form-button"
                disabled={isLoading}
                style={{ width: '100%' }}
              >
                {isLoading ? 'Tracking...' : 'Track Package'}
              </button>
            </form>
          </div>
          
          {trackingResult && (
            <div className="tracking-result">
              <div className="tracking-header">
                <div>
                  <div className="tracking-number">#{trackingResult.trackingNumber}</div>
                  <p>From: {trackingResult.sender} → To: {trackingResult.recipient}</p>
                </div>
                <div className={`tracking-status ${getStatusClass(trackingResult.status)}`}>
                  {getStatusText(trackingResult.status)}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={20} />
                  <strong>Current Location:</strong> {trackingResult.currentLocation}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <strong>Estimated Delivery:</strong> {trackingResult.estimatedDelivery}
                </div>
              </div>
              
              <div className="tracking-timeline">
                <h4 className="mb-4">Tracking History</h4>
                {trackingResult.timeline.map((item: any, index: number) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot" style={{ 
                      background: item.completed ? 'var(--success-green)' : 'var(--border-color)' 
                    }}></div>
                    <div className="timeline-content">
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {item.completed && <CheckCircle size={16} color="var(--success-green)" />}
                        {item.status}
                      </h4>
                      <p>{item.location}</p>
                      <span className="timeline-date">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Additional Tracking Services */}
      <section className="section good-facts">
        <div className="container">
          <h2>Enhanced Tracking Features</h2>
          <p className="section-subtitle">
            Get the most out of our tracking system with these additional features.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Package />
              </div>
              <h3>Photo Proof of Delivery</h3>
              <p>
                Receive photo confirmation when your package is delivered, 
                showing exactly where it was left.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Clock />
              </div>
              <h3>Delivery Time Predictions</h3>
              <p>
                AI-powered delivery time estimates based on traffic, weather, 
                and historical delivery data.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <MapPin />
              </div>
              <h3>Live GPS Tracking</h3>
              <p>
                Follow your delivery vehicle in real-time once it's out 
                for delivery in your area.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Search />
              </div>
              <h3>Bulk Tracking</h3>
              <p>
                Track multiple packages at once with our bulk tracking 
                feature for businesses and frequent users.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackParcel;