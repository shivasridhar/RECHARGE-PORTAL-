const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const { User, Plan, Recharge, defaultPlans } = require('./db');

const router = express.Router();

// Helper function to hash passwords
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Helper function to verify passwords
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// ========== API ROUTES ==========

// NOTE: These routes are mounted under /api in server.js
// So this path '/login' becomes '/api/login' externally, etc.

// POST /api/login - User login/registration
router.post('/login', async (req, res) => {
  try {
    console.log('POST /api/login - Request body:', JSON.stringify(req.body));
    const { email, password } = req.body;

    if (!email || !password) {
      console.error('Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Check for admin login
    if (email === 'admin@portal.com' && password === 'admin123') {
      console.log('Admin login successful');
      return res.json({
        success: true,
        isAdmin: true,
        message: 'Admin login successful',
        user: { email: 'admin@portal.com', isAdmin: true }
      });
    }

    try {
      // Check if user exists
      console.log('Looking up user with email:', email.toLowerCase());
      let user = await User.findOne({ email: email.toLowerCase() }).lean();

      if (user) {
        console.log('User found, verifying password...');
        // Verify password
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          console.error('Invalid password for user:', email);
          return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
          });
        }
        console.log('Login successful for user:', email);
        return res.json({
          success: true,
          isAdmin: user.isAdmin || false,
          message: 'Login successful',
          user: {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin || false
          }
        });
      } else {
        // Create new user
        console.log('User not found, creating new account for:', email);
        const hashedPassword = await hashPassword(password);
        user = new User({
          email: email.toLowerCase(),
          password: hashedPassword,
          isAdmin: false
        });
        await user.save();
        console.log('New user created:', user.email);
        return res.json({
          success: true,
          isAdmin: false,
          message: 'Account created and login successful',
          user: {
            id: user._id,
            email: user.email,
            isAdmin: false
          }
        });
      }
    } catch (dbError) {
      console.error('Database error during login:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error?.message || 'Login failed. Please try again.'
    });
  }
});

// GET /api/plans - Get all active plans
router.get('/plans', async (req, res) => {
  try {
    console.log('GET /api/plans - Fetching plans');
    let plans = [];
    try {
      if (require('mongoose').connection.readyState === 1) {
        plans = await Plan.find({ active: true }).sort({ createdAt: -1 });
      }
    } catch (dbError) {
      console.error('Database query error, using fallback plans:', dbError.message);
    }

    if (!plans || plans.length === 0) {
      console.log('Using default fallback plans');
      plans = defaultPlans;
    }

    console.log(`Returning ${plans.length} plans`);
    res.json({ success: true, plans });
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plans', error: error.message });
  }
});

// POST /api/recharge - Activate a plan for user
router.post('/recharge', async (req, res) => {
  try {
    const { userId, planId, paymentMethod, paymentDetails } = req.body;

    if (!userId || !planId || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    // Calculate expiry date based on validity
    const validityDays = parseInt(plan.validity) || 28;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + validityDays);

    const recharge = new Recharge({
      userId,
      planId,
      planName: plan.name,
      planPrice: plan.price,
      paymentMethod,
      paymentDetails: paymentDetails || {},
      status: 'active',
      activatedAt: new Date(),
      expiresAt
    });

    await recharge.save();
    res.json({
      success: true,
      message: 'Plan activated successfully',
      recharge
    });
  } catch (error) {
    console.error('Recharge error:', error);
    res.status(500).json({ success: false, message: 'Failed to activate plan' });
  }
});

// GET /api/my-recharges/:userId - Get user's recharges
router.get('/my-recharges/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const recharges = await Recharge.find({ userId })
      .populate('planId')
      .sort({ createdAt: -1 });
    res.json({ success: true, recharges });
  } catch (error) {
    console.error('Error fetching recharges:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recharges' });
  }
});

// ========== ADMIN API ROUTES ==========

// GET /api/admin/plans - Get all plans (admin)
router.get('/admin/plans', async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json({ success: true, plans });
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plans' });
  }
});

// POST /api/admin/plans - Create new plan (admin)
router.post('/admin/plans', async (req, res) => {
  try {
    const { name, price, validity, data, calls, sms, features, popular } = req.body;

    if (!name || !price || !validity || !data) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const plan = new Plan({
      name,
      price,
      validity,
      data,
      calls: calls || 'Unlimited',
      sms: sms || 'Unlimited',
      features: features || [],
      popular: popular || false,
      active: true
    });

    await plan.save();
    res.json({ success: true, message: 'Plan created successfully', plan });
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ success: false, message: 'Failed to create plan' });
  }
});

// PUT /api/admin/plans/:id - Update plan (admin)
router.put('/admin/plans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    updateData.updatedAt = new Date();

    const plan = await Plan.findByIdAndUpdate(id, updateData, { new: true });
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    res.json({ success: true, message: 'Plan updated successfully', plan });
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({ success: false, message: 'Failed to update plan' });
  }
});

// DELETE /api/admin/plans/:id - Delete plan (admin)
router.delete('/admin/plans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByIdAndDelete(id);
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    res.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({ success: false, message: 'Failed to delete plan' });
  }
});

module.exports = router;