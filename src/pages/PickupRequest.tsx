import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, Calendar, Clock, DollarSign, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { pickupAPI } from '../services/api';

const PickupRequest: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const [formData, setFormData] = useState({
    serviceType: 'package',
    pickupAddress: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      district: user?.address?.district || '',
      postalCode: user?.address?.postalCode || '',
      contactPerson: user?.fullName || '',
      contactPhone: user?.phone || ''
    },
    deliveryAddress: {
      street: '',
      city: '',
      district: '',
      postalCode: '',
      contactPerson: '',
      contactPhone: ''
    },
    itemDetails: {
      description: '',
      weight: 1,
      dimensions: {
        length: 0,
        width: 0,
        height: 0
      },
      value: 0,
      fragile: false
    },
    preferredPickupDate: '',
    preferredPickupTime: 'morning',
    specialInstructions: '',
    priority: 'standard'
  });

  const sriLankanDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  const calculateEstimatedCost = () => {
    let baseCost = 0;
    
    switch (formData.serviceType) {
      case 'letter':
        baseCost = 150;
        break;
      case 'document':
        baseCost = 250;
        break;
      case 'package':
        baseCost = 500;
        break;
      case 'goods':
        baseCost = 800;
        break;
    }
    
    const weightCost = Math.ceil(formData.itemDetails.weight) * 100;
    
    let priorityMultiplier = 1;
    switch (formData.priority) {
      case 'express':
        priorityMultiplier = 1.5;
        break;
      case 'urgent':
        priorityMultiplier = 2;
        break;
    }
    
    return Math.round((baseCost + weightCost) * priorityMultiplier);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (name.startsWith('pickupAddress.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        pickupAddress: {
          ...formData.pickupAddress,
          [field]: value
        }
      });
    } else if (name.startsWith('deliveryAddress.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        deliveryAddress: {
          ...formData.deliveryAddress,
          [field]: value
        }
      });
    } else if (name.startsWith('itemDetails.')) {
      const field = name.split('.')[1];
      if (field === 'dimensions') {
        const dimension = name.split('.')[2];
        setFormData({
          ...formData,
          itemDetails: {
            ...formData.itemDetails,
            dimensions: {
              ...formData.itemDetails.dimensions,
              [dimension]: parseFloat(value) || 0
            }
          }
        });
      } else {
        setFormData({
          ...formData,
          itemDetails: {
            ...formData.itemDetails,
            [field]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) || 0 : value)
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Recalculate cost when relevant fields change
    if (['serviceType', 'itemDetails.weight', 'priority'].some(field => name.includes(field))) {
      setTimeout(() => {
        setEstimatedCost(calculateEstimatedCost());
      }, 100);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await pickupAPI.createRequest(formData);
      const { trackingNumber } = response.data.data.pickupRequest;
      
      navigate(`/track?number=${trackingNumber}&success=true`);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create pickup request');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fade-in">
      <section className="section">
        <div className="container">
          <div className="form-container" style={{ maxWidth: '800px' }}>
            <div className="text-center mb-4">
              <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
                <Truck />
              </div>
              <h2>Schedule Home Pickup</h2>
              <p className="section-subtitle">
                We'll pick up your items from your doorstep and deliver them safely to your chosen destination.
              </p>
            </div>

            {/* Progress Indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              {[1, 2, 3, 4].map((stepNum) => (
                <div
                  key={stepNum}
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    background: step >= stepNum ? 'var(--primary-red)' : 'var(--border-color)',
                    color: step >= stepNum ? 'white' : 'var(--text-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 0.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  {stepNum}
                </div>
              ))}
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
              {/* Step 1: Service Type & Item Details */}
              {step === 1 && (
                <div>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Package size={24} />
                    Service Type & Item Details
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Service Type *</label>
                    <select
                      name="serviceType"
                      className="form-select"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                    >
                      <option value="letter">Letter (LKR 150 base)</option>
                      <option value="document">Document (LKR 250 base)</option>
                      <option value="package">Package (LKR 500 base)</option>
                      <option value="goods">Goods (LKR 800 base)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Item Description *</label>
                    <textarea
                      name="itemDetails.description"
                      className="form-textarea"
                      value={formData.itemDetails.description}
                      onChange={handleChange}
                      required
                      placeholder="Describe the items you want to send (e.g., documents, clothing, electronics)"
                      maxLength={500}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Weight (kg) *</label>
                      <input
                        type="number"
                        name="itemDetails.weight"
                        className="form-input"
                        value={formData.itemDetails.weight}
                        onChange={handleChange}
                        required
                        min="0.1"
                        step="0.1"
                        placeholder="1.0"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Value (LKR) *</label>
                      <input
                        type="number"
                        name="itemDetails.value"
                        className="form-input"
                        value={formData.itemDetails.value}
                        onChange={handleChange}
                        required
                        min="0"
                        placeholder="1000"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Priority</label>
                      <select
                        name="priority"
                        className="form-select"
                        value={formData.priority}
                        onChange={handleChange}
                      >
                        <option value="standard">Standard</option>
                        <option value="express">Express (+50%)</option>
                        <option value="urgent">Urgent (+100%)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                    <input
                      type="checkbox"
                      id="fragile"
                      name="itemDetails.fragile"
                      checked={formData.itemDetails.fragile}
                      onChange={handleChange}
                    />
                    <label htmlFor="fragile">Mark as fragile (requires special handling)</label>
                  </div>
                </div>
              )}

              {/* Step 2: Pickup Address */}
              {step === 2 && (
                <div>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={24} />
                    Pickup Address
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Contact Person *</label>
                    <input
                      type="text"
                      name="pickupAddress.contactPerson"
                      className="form-input"
                      value={formData.pickupAddress.contactPerson}
                      onChange={handleChange}
                      required
                      placeholder="Person available for pickup"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Phone *</label>
                    <input
                      type="tel"
                      name="pickupAddress.contactPhone"
                      className="form-input"
                      value={formData.pickupAddress.contactPhone}
                      onChange={handleChange}
                      required
                      placeholder="+94 77 123 4567"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Street Address *</label>
                    <input
                      type="text"
                      name="pickupAddress.street"
                      className="form-input"
                      value={formData.pickupAddress.street}
                      onChange={handleChange}
                      required
                      placeholder="House number and street name"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        name="pickupAddress.city"
                        className="form-input"
                        value={formData.pickupAddress.city}
                        onChange={handleChange}
                        required
                        placeholder="City name"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">District *</label>
                      <select
                        name="pickupAddress.district"
                        className="form-select"
                        value={formData.pickupAddress.district}
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
                      <label className="form-label">Postal Code *</label>
                      <input
                        type="text"
                        name="pickupAddress.postalCode"
                        className="form-input"
                        value={formData.pickupAddress.postalCode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{5}"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Delivery Address */}
              {step === 3 && (
                <div>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={24} />
                    Delivery Address
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Contact Person *</label>
                    <input
                      type="text"
                      name="deliveryAddress.contactPerson"
                      className="form-input"
                      value={formData.deliveryAddress.contactPerson}
                      onChange={handleChange}
                      required
                      placeholder="Recipient name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Phone *</label>
                    <input
                      type="tel"
                      name="deliveryAddress.contactPhone"
                      className="form-input"
                      value={formData.deliveryAddress.contactPhone}
                      onChange={handleChange}
                      required
                      placeholder="+94 77 123 4567"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Street Address *</label>
                    <input
                      type="text"
                      name="deliveryAddress.street"
                      className="form-input"
                      value={formData.deliveryAddress.street}
                      onChange={handleChange}
                      required
                      placeholder="House number and street name"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        name="deliveryAddress.city"
                        className="form-input"
                        value={formData.deliveryAddress.city}
                        onChange={handleChange}
                        required
                        placeholder="City name"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">District *</label>
                      <select
                        name="deliveryAddress.district"
                        className="form-select"
                        value={formData.deliveryAddress.district}
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
                      <label className="form-label">Postal Code *</label>
                      <input
                        type="text"
                        name="deliveryAddress.postalCode"
                        className="form-input"
                        value={formData.deliveryAddress.postalCode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{5}"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Schedule & Confirmation */}
              {step === 4 && (
                <div>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={24} />
                    Schedule & Confirmation
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Preferred Pickup Date *</label>
                      <input
                        type="date"
                        name="preferredPickupDate"
                        className="form-input"
                        value={formData.preferredPickupDate}
                        onChange={handleChange}
                        required
                        min={minDate}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Preferred Time *</label>
                      <select
                        name="preferredPickupTime"
                        className="form-select"
                        value={formData.preferredPickupTime}
                        onChange={handleChange}
                        required
                      >
                        <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                        <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                        <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Special Instructions</label>
                    <textarea
                      name="specialInstructions"
                      className="form-textarea"
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      placeholder="Any special handling instructions or notes for our pickup agent"
                      maxLength={1000}
                    />
                  </div>

                  {/* Cost Summary */}
                  <div style={{
                    background: 'var(--primary-yellow)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    marginTop: '2rem'
                  }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      <DollarSign size={20} />
                      Estimated Cost
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>Base Cost ({formData.serviceType}):</span>
                      <span>LKR {formData.serviceType === 'letter' ? 150 : formData.serviceType === 'document' ? 250 : formData.serviceType === 'package' ? 500 : 800}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>Weight Cost ({formData.itemDetails.weight} kg):</span>
                      <span>LKR {Math.ceil(formData.itemDetails.weight) * 100}</span>
                    </div>
                    {formData.priority !== 'standard' && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Priority ({formData.priority}):</span>
                        <span>+{formData.priority === 'express' ? '50%' : '100%'}</span>
                      </div>
                    )}
                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: '2px solid var(--text-dark)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                      <span>Total Estimated Cost:</span>
                      <span>LKR {calculateEstimatedCost()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="form-button"
                    style={{ background: 'var(--text-light)' }}
                  >
                    Previous
                  </button>
                )}
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="form-button"
                    style={{ marginLeft: 'auto' }}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                    style={{ marginLeft: 'auto' }}
                  >
                    {loading ? 'Creating Request...' : 'Schedule Pickup'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PickupRequest;