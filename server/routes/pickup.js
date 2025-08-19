const express = require('express');
const PickupRequest = require('../models/PickupRequest');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Calculate pickup cost based on service type, weight, and distance
const calculateCost = (serviceType, weight, priority) => {
  let baseCost = 0;
  
  // Base cost by service type
  switch (serviceType) {
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
    default:
      baseCost = 300;
  }
  
  // Weight-based pricing (per kg)
  const weightCost = Math.ceil(weight) * 100;
  
  // Priority pricing
  let priorityMultiplier = 1;
  switch (priority) {
    case 'express':
      priorityMultiplier = 1.5;
      break;
    case 'urgent':
      priorityMultiplier = 2;
      break;
  }
  
  return Math.round((baseCost + weightCost) * priorityMultiplier);
};

// Create pickup request
router.post('/request', auth, [
  body('serviceType').isIn(['letter', 'package', 'document', 'goods']).withMessage('Invalid service type'),
  body('pickupAddress.street').trim().notEmpty().withMessage('Pickup street address is required'),
  body('pickupAddress.city').trim().notEmpty().withMessage('Pickup city is required'),
  body('pickupAddress.district').trim().notEmpty().withMessage('Pickup district is required'),
  body('pickupAddress.postalCode').matches(/^[0-9]{5}$/).withMessage('Invalid pickup postal code'),
  body('pickupAddress.contactPerson').trim().notEmpty().withMessage('Pickup contact person is required'),
  body('pickupAddress.contactPhone').matches(/^(\+94|0)[0-9]{9}$/).withMessage('Invalid pickup phone number'),
  body('deliveryAddress.street').trim().notEmpty().withMessage('Delivery street address is required'),
  body('deliveryAddress.city').trim().notEmpty().withMessage('Delivery city is required'),
  body('deliveryAddress.district').trim().notEmpty().withMessage('Delivery district is required'),
  body('deliveryAddress.postalCode').matches(/^[0-9]{5}$/).withMessage('Invalid delivery postal code'),
  body('deliveryAddress.contactPerson').trim().notEmpty().withMessage('Delivery contact person is required'),
  body('deliveryAddress.contactPhone').matches(/^(\+94|0)[0-9]{9}$/).withMessage('Invalid delivery phone number'),
  body('itemDetails.description').trim().isLength({ min: 10, max: 500 }).withMessage('Description must be 10-500 characters'),
  body('itemDetails.weight').isFloat({ min: 0.1 }).withMessage('Weight must be at least 0.1 kg'),
  body('itemDetails.value').isFloat({ min: 0 }).withMessage('Value cannot be negative'),
  body('preferredPickupDate').isISO8601().withMessage('Invalid pickup date'),
  body('preferredPickupTime').isIn(['morning', 'afternoon', 'evening']).withMessage('Invalid pickup time'),
  body('priority').optional().isIn(['standard', 'express', 'urgent']).withMessage('Invalid priority')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      serviceType,
      pickupAddress,
      deliveryAddress,
      itemDetails,
      preferredPickupDate,
      preferredPickupTime,
      specialInstructions,
      priority = 'standard'
    } = req.body;

    // Validate pickup date is in the future
    const pickupDate = new Date(preferredPickupDate);
    if (pickupDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Pickup date must be in the future'
      });
    }

    // Calculate cost
    const baseCost = calculateCost(serviceType, itemDetails.weight, priority);
    
    // Create pickup request
    const pickupRequest = new PickupRequest({
      user: req.user._id,
      serviceType,
      pickupAddress,
      deliveryAddress,
      itemDetails,
      preferredPickupDate: pickupDate,
      preferredPickupTime,
      specialInstructions,
      priority,
      cost: {
        baseCost,
        additionalCharges: 0,
        totalCost: baseCost
      }
    });

    await pickupRequest.save();
    await pickupRequest.populate('user', 'firstName lastName email phone');

    res.status(201).json({
      success: true,
      message: 'Pickup request created successfully',
      data: { pickupRequest }
    });

  } catch (error) {
    console.error('Pickup request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create pickup request',
      error: error.message
    });
  }
});

// Get user's pickup requests
router.get('/my-requests', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const requests = await PickupRequest.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'firstName lastName email phone');

    const total = await PickupRequest.countDocuments({ user: req.user._id });

    res.json({
      success: true,
      data: {
        requests,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pickup requests',
      error: error.message
    });
  }
});

// Track pickup request by tracking number
router.get('/track/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    const request = await PickupRequest.findOne({ trackingNumber })
      .populate('user', 'firstName lastName email phone')
      .populate('assignedAgent', 'firstName lastName phone');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Pickup request not found'
      });
    }

    res.json({
      success: true,
      data: { request }
    });

  } catch (error) {
    console.error('Track request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track pickup request',
      error: error.message
    });
  }
});

// Update pickup request status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location, notes } = req.body;

    // Check if user is admin (you can implement role-based access)
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const request = await PickupRequest.findById(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Pickup request not found'
      });
    }

    // Update status
    request.status = status;
    
    // Add timeline entry
    request.timeline.push({
      status,
      location,
      notes,
      timestamp: new Date()
    });

    await request.save();

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: { request }
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: error.message
    });
  }
});

// Cancel pickup request
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const request = await PickupRequest.findOne({ 
      _id: id, 
      user: req.user._id 
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Pickup request not found'
      });
    }

    // Check if request can be cancelled
    if (['picked_up', 'in_transit', 'delivered'].includes(request.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel request in current status'
      });
    }

    request.status = 'cancelled';
    request.timeline.push({
      status: 'Cancelled by customer',
      location: 'Online Portal',
      notes: 'Request cancelled by customer',
      timestamp: new Date()
    });

    await request.save();

    res.json({
      success: true,
      message: 'Pickup request cancelled successfully',
      data: { request }
    });

  } catch (error) {
    console.error('Cancel request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel pickup request',
      error: error.message
    });
  }
});

module.exports = router;