const mongoose = require('mongoose');
const dns = require('dns');

// Force Node.js to use Google DNS to bypass local ISP/Network DNS issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

// MongoDB connection URL
const MONGODB_URI = 'mongodb+srv://shiva:shivasri@cluster0.ovtgk2b.mongodb.net/recharge_portal?retryWrites=true&w=majority';

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4
    });
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.warn('Continuing without MongoDB connection. Some features may not work.');
    return false;
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  mobile: { type: String, trim: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Plan Schema (for recharge plans)
const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  validity: { type: String, required: true },
  data: { type: String, required: true },
  calls: { type: String, default: 'Unlimited' },
  sms: { type: String, default: 'Unlimited' },
  features: [{ type: String }],
  popular: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Recharge/Transaction Schema (for user's active plans)
const rechargeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  planName: { type: String, required: true },
  planPrice: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  paymentDetails: { type: Object },
  status: { type: String, enum: ['pending', 'active', 'expired', 'cancelled'], default: 'pending' },
  activatedAt: { type: Date },
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', userSchema);
const Plan = mongoose.model('Plan', planSchema);
const Recharge = mongoose.model('Recharge', rechargeSchema);

const defaultPlans = [
  {
    name: 'Basic',
    price: '₹199',
    validity: '28 days',
    data: '1.5 GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    features: ['Free subscription', 'Local & STD calls', 'Roaming'],
    popular: false,
    active: true
  },
  {
    name: 'Popular',
    price: '₹299',
    validity: '56 days',
    data: '2 GB/day',
    calls: 'Unlimited',
    sms: 'Unlimited',
    features: ['Free subscription', 'Local & STD calls', 'Roaming', 'Priority support'],
    popular: true,
    active: true
  },
  {
    name: 'Premium',
    price: '₹499',
    validity: '84 days',
    data: '3 GB/day',
    calls: 'Unlimited',
    sms: 'Unlimited',
    features: ['Free subscription', 'Local & STD calls', 'Roaming', 'Priority support', 'Extra data rollover'],
    popular: false,
    active: true
  },
  {
    name: 'Family',
    price: '₹749',
    validity: '90 days',
    data: '4 GB/day',
    calls: 'Unlimited',
    sms: 'Unlimited',
    features: ['Free subscription', 'International roaming pack', 'Data sharing', 'Dedicated support'],
    popular: false,
    active: true
  },
  {
    name: 'Unlimited Pro',
    price: '₹999',
    validity: '120 days',
    data: 'Unlimited*',
    calls: 'Unlimited',
    sms: 'Unlimited',
    features: ['OTT bundle', '5G priority speeds', 'International roaming pack', 'Data rollover', 'Premium support'],
    popular: true,
    active: true
  }
];

// Seed default plans
const seedPlans = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('DB not connected, skipping seed');
      return;
    }
    const planCount = await Plan.countDocuments();
    if (planCount === 0) {
      await Plan.insertMany(defaultPlans);
      console.log('Default plans seeded successfully');
    } else {
      console.log(`Database already has ${planCount} plans`);
    }
  } catch (error) {
    console.error('Error seeding plans:', error);
  }
};

module.exports = {
  connectDB,
  User,
  Plan,
  Recharge,
  seedPlans,
  defaultPlans
};

