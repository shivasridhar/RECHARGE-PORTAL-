import React, { useState } from 'react';
import { Menu, X, Zap, Shield, Clock, Check } from 'lucide-react';

const RechargePortal = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: 'Basic',
      price: '₹199',
      validity: '28 days',
      data: '1.5 GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      features: ['Free subscription', 'Local & STD calls', 'Roaming'],
      popular: false
    },
    {
      id: 2,
      name: 'Popular',
      price: '₹299',
      validity: '56 days',
      data: '2 GB/day',
      calls: 'Unlimited',
      sms: 'Unlimited',
      features: ['Free subscription', 'Local & STD calls', 'Roaming', 'Priority support'],
      popular: true
    },
    {
      id: 3,
      name: 'Premium',
      price: '₹499',
      validity: '84 days',
      data: '3 GB/day',
      calls: 'Unlimited',
      sms: 'Unlimited',
      features: ['Free subscription', 'Local & STD calls', 'Roaming', 'Priority support', 'Extra data rollover'],
      popular: false
    }
  ];

  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Zap className="text-purple-500" size={28} />
            <span className="text-white text-xl font-bold">RechargeHub</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`${currentPage === 'home' ? 'text-white' : 'text-gray-400'} hover:text-white transition`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('plans')}
              className={`${currentPage === 'plans' ? 'text-white' : 'text-gray-400'} hover:text-white transition`}
            >
              Plans
            </button>
            <button 
              onClick={() => setCurrentPage('login')}
              className="px-6 py-2 rounded border-2 border-purple-500 text-white hover:bg-purple-500 transition"
            >
              Login
            </button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-4 space-y-4">
            <button 
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-gray-300 hover:text-white"
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentPage('plans'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-gray-300 hover:text-white"
            >
              Plans
            </button>
            <button 
              onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-6 py-2 rounded border-2 border-purple-500 text-white hover:bg-purple-500 transition"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-gray-800 rounded-full px-4 py-2 mb-6">
              <span className="text-purple-400 text-sm font-semibold">#1 Recharge Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Recharge your mobile{' '}
              <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                instantly
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Experience seamless mobile recharges with the best plans and instant activation. 
              Choose from 100+ operators and get cashback on every transaction.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setCurrentPage('plans')}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
              >
                View All Plans
              </button>
              <button className="px-8 py-4 rounded-lg border-2 border-gray-700 text-white hover:border-gray-500 transition">
                Learn More
              </button>
            </div>

            <div className="mt-12 flex items-center space-x-4">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                alt="User" 
                className="w-12 h-12 rounded-full border-2 border-purple-500"
              />
              <div>
                <p className="text-gray-400 italic text-sm">
                  "This platform has been amazing for quick recharges. Highly recommended!"
                </p>
                <p className="text-gray-500 text-xs mt-1">- Rahul Kumar, Verified User</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition"
              >
                <div className="text-center">
                  <div className="text-white text-sm mb-2">Fast & Secure</div>
                  <Zap className="mx-auto text-purple-500" size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-900 to-purple-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Activation</h3>
            <p className="text-gray-400">Get your recharge activated within seconds</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
            <p className="text-gray-400">Bank-grade security for all transactions</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-orange-900 to-orange-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-400">Round the clock customer assistance</p>
          </div>
        </div>
      </div>
    </div>
  );

  const PlansPage = () => (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Perfect{' '}
            <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Plan
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Select the plan that fits your needs and budget</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 transition cursor-pointer ${
                selectedPlan === plan.id 
                  ? 'border-purple-500 scale-105' 
                  : plan.popular 
                    ? 'border-purple-700' 
                    : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-purple-500 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  {plan.price}
                  <span className="text-lg text-gray-400">/{plan.validity}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Data</span>
                  <span className="font-semibold">{plan.data}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Calls</span>
                  <span className="font-semibold">{plan.calls}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">SMS</span>
                  <span className="font-semibold">{plan.sms}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Check size={16} className="text-green-500" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => setCurrentPage('login')}
              className="px-12 py-4 rounded-lg bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white font-semibold text-lg hover:opacity-90 transition"
            >
              Proceed to Recharge
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-black text-white pt-16 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-purple-900 to-purple-700 w-16 h-16 rounded-full flex items-center justify-center">
                <Zap size={32} />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-400">Login to continue your recharge</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email or Mobile</label>
              <input 
                type="text"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                placeholder="Enter your email or mobile number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <button className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
              </button>
            </div>

            <button 
              onClick={(e) => {
                e.preventDefault();
                console.log('Login submitted:', loginForm);
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <button className="text-purple-400 hover:text-purple-300 font-semibold">
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-center text-gray-500 text-xs mb-4">Or continue with</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="py-2 rounded-lg bg-gray-800 border border-gray-700 hover:border-gray-600 transition text-sm">
                Google
              </button>
              <button className="py-2 rounded-lg bg-gray-800 border border-gray-700 hover:border-gray-600 transition text-sm">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'plans' && <PlansPage />}
      {currentPage === 'login' && <LoginPage />}
    </div>
  );
};

export default RechargePortal;