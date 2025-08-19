const express = require('express');
const User = require('../models/User');
const PickupRequest = require('../models/PickupRequest');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile', auth, [
  body('firstName').optional().trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').optional().trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('phone').optional().matches(/^(\+94|0)[0-9]{9}$/).withMessage('Please enter a valid Sri Lankan phone number'),
  body('address.street').optional().trim().notEmpty().withMessage('Street address cannot be empty'),
  body('address.city').optional().trim().notEmpty().withMessage('City cannot be empty'),
  body('address.district').optional().trim().notEmpty().withMessage('District cannot be empty'),
  body('address.postalCode').optional().matches(/^[0-9]{5}$/).withMessage('Please enter a valid 5-digit postal code')
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

    const updates = req.body;
    delete updates.email; // Prevent email updates
    delete updates.password; // Prevent password updates through this route

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

// Update notification preferences
router.patch('/preferences', auth, [
  body('emailNotifications').optional().isBoolean().withMessage('Email notifications must be boolean'),
  body('smsNotifications').optional().isBoolean().withMessage('SMS notifications must be boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { emailNotifications, smsNotifications } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          'preferences.emailNotifications': emailNotifications,
          'preferences.smsNotifications': smsNotifications
        }
      },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: { user }
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences',
      error: error.message
    });
  }
});

// Get user dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get pickup request statistics
    const stats = await PickupRequest.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalCost: { $sum: '$cost.totalCost' }
        }
      }
    ]);

    // Get recent requests
    const recentRequests = await PickupRequest.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('trackingNumber serviceType status createdAt cost.totalCost');

    // Format stats
    const formattedStats = {
      total: 0,
      pending: 0,
      confirmed: 0,
      picked_up: 0,
      in_transit: 0,
      delivered: 0,
      cancelled: 0,
      totalSpent: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
      formattedStats.total += stat.count;
      formattedStats.totalSpent += stat.totalCost;
    });

    res.json({
      success: true,
      data: {
        stats: formattedStats,
        recentRequests
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message
    });
  }
});

module.exports = router;