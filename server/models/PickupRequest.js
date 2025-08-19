const mongoose = require('mongoose');

const pickupRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trackingNumber: {
    type: String,
    unique: true,
    required: true
  },
  serviceType: {
    type: String,
    enum: ['letter', 'package', 'document', 'goods'],
    required: true
  },
  pickupAddress: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    district: {
      type: String,
      required: true,
      trim: true
    },
    postalCode: {
      type: String,
      required: true,
      trim: true
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true
    },
    contactPhone: {
      type: String,
      required: true,
      trim: true
    }
  },
  deliveryAddress: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    district: {
      type: String,
      required: true,
      trim: true
    },
    postalCode: {
      type: String,
      required: true,
      trim: true
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true
    },
    contactPhone: {
      type: String,
      required: true,
      trim: true
    }
  },
  itemDetails: {
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    weight: {
      type: Number,
      required: true,
      min: [0.1, 'Weight must be at least 0.1 kg']
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    value: {
      type: Number,
      required: true,
      min: [0, 'Value cannot be negative']
    },
    fragile: {
      type: Boolean,
      default: false
    }
  },
  preferredPickupDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Pickup date must be in the future'
    }
  },
  preferredPickupTime: {
    type: String,
    required: true,
    enum: ['morning', 'afternoon', 'evening']
  },
  specialInstructions: {
    type: String,
    maxlength: [1000, 'Special instructions cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'picked_up', 'in_transit', 'delivered', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['standard', 'express', 'urgent'],
    default: 'standard'
  },
  cost: {
    baseCost: {
      type: Number,
      required: true,
      min: 0
    },
    additionalCharges: {
      type: Number,
      default: 0
    },
    totalCost: {
      type: Number,
      required: true,
      min: 0
    }
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'bank_transfer', 'mobile_wallet']
  },
  timeline: [{
    status: {
      type: String,
      required: true
    },
    location: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  estimatedDelivery: Date,
  actualDelivery: Date
}, {
  timestamps: true
});

// Generate tracking number before saving
pickupRequestSchema.pre('save', async function(next) {
  if (!this.trackingNumber) {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.trackingNumber = `SLP${timestamp.slice(-6)}${random}`;
  }
  
  // Calculate total cost
  this.cost.totalCost = this.cost.baseCost + this.cost.additionalCharges;
  
  next();
});

// Add initial timeline entry
pickupRequestSchema.pre('save', function(next) {
  if (this.isNew) {
    this.timeline.push({
      status: 'Request submitted',
      location: 'Online Portal',
      notes: 'Pickup request submitted successfully'
    });
  }
  next();
});

// Index for efficient queries
pickupRequestSchema.index({ user: 1, createdAt: -1 });
pickupRequestSchema.index({ trackingNumber: 1 });
pickupRequestSchema.index({ status: 1 });

module.exports = mongoose.model('PickupRequest', pickupRequestSchema);