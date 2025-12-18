import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';

const Plans = ({ navigateTo }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedSim, setSelectedSim] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState({ name: '', upi: '', card: '' });

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        console.log('Fetching plans from /api/plans');
        const response = await fetch('/api/plans');
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Plans data:', data);
        if (data.success && data.plans) {
          setPlans(data.plans);
          console.log('Plans set:', data.plans.length);
        } else {
          console.error('Failed to fetch plans:', data.message);
          // Set default plans if API fails
          setPlans([
            {
              _id: '1',
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
              _id: '2',
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
              _id: '3',
              name: 'Premium',
              price: '₹499',
              validity: '84 days',
              data: '3 GB/day',
              calls: 'Unlimited',
              sms: 'Unlimited',
              features: ['Free subscription', 'Local & STD calls', 'Roaming', 'Priority support', 'Extra data rollover'],
              popular: false
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        // Set default plans on error
        setPlans([
          {
            _id: '1',
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
            _id: '2',
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
            _id: '3',
            name: 'Premium',
            price: '₹499',
            validity: '84 days',
            data: '3 GB/day',
            calls: 'Unlimited',
            sms: 'Unlimited',
            features: ['Free subscription', 'Local & STD calls', 'Roaming', 'Priority support', 'Extra data rollover'],
            popular: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Handle recharge/payment
  const handleRecharge = async () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Please login first');
      navigateTo('login');
      return;
    }

    if (!selectedPlan) {
      alert('Please select a plan');
      return;
    }

    const user = JSON.parse(userStr);
    const plan = plans.find(p => p._id === selectedPlan);

    try {
      const response = await fetch('/api/recharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          planId: plan._id,
          paymentMethod,
          paymentDetails: {
            name: paymentDetails.name,
            upi: paymentDetails.upi,
            card: paymentDetails.card
          }
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Plan activated successfully!');
        navigateTo('home');
      } else {
        alert(data.message || 'Failed to activate plan');
      }
    } catch (error) {
      console.error('Recharge error:', error);
      alert('Failed to activate plan. Please try again.');
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
      setIsPhoneValid(value.length === 10);
    }
  };

  const paymentOptions = [
    { id: 'upi', label: 'UPI (GPay/PhonePe/Paytm)' },
    { id: 'card', label: 'Credit / Debit Card' },
    { id: 'wallet', label: 'Wallet' },
    { id: 'netbanking', label: 'Net Banking' }
  ];

  const selectedPlanData = plans.find((plan) => plan._id === selectedPlan);
  const totalWithFees = selectedPlanData
    ? parseInt(selectedPlanData.price.replace(/[^\d]/g, ''), 10) + 29
    : 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation navigateTo={navigateTo} currentPage="plans" />

      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Perfect{' '}
            <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Plan
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Select the plan that fits your needs and budget</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading plans...</p>
          </div>
        ) : (
          <>
            {/* SIM Selection Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-300">Verify your SIM to view plans</h2>
              <div className="flex flex-wrap justify-center gap-6">
                {['Jio', 'Airtel', 'BSNL'].map((sim) => (
                  <button
                    key={sim}
                    onClick={() => setSelectedSim(sim)}
                    className={`px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all hover:-translate-y-1 ${selectedSim === sim
                      ? 'border-orange-500 bg-orange-500/20 text-white shadow-lg shadow-orange-500/20'
                      : 'border-gray-700 hover:border-orange-500 hover:bg-orange-500/10 text-gray-300'
                      }`}
                  >
                    {sim}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Number Selection Section */}
            {selectedSim && (
              <div className="mb-12 max-w-md mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-300">Enter Mobile Number</h2>
                <div className="relative">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full px-6 py-4 rounded-xl bg-gray-900 border border-gray-700 focus:border-orange-500 focus:outline-none text-white text-lg tracking-widest text-center transition-all shadow-lg shadow-purple-500/5 placeholder:tracking-normal placeholder:text-gray-500"
                    maxLength={10}
                  />
                  {isPhoneValid && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!selectedSim || !isPhoneValid ? (
              <div className="text-center py-16 bg-gray-900/50 rounded-2xl border border-gray-800 border-dashed">
                <p className="text-xl text-gray-400">
                  {!selectedSim
                    ? '⚠️ Please select your SIM provider above'
                    : '📱 Please enter a valid 10-digit mobile number to view plans'}
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 transition-transform duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 ${selectedPlan === plan._id
                      ? 'border-purple-500 scale-105'
                      : plan.popular
                        ? 'border-purple-700'
                        : 'border-gray-700 hover:border-gray-600'
                      }`}
                    onClick={() => setSelectedPlan(plan._id)}
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

                    {plan.features && plan.features.length > 0 && (
                      <div className="space-y-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      className={`w-full py-3 rounded-lg font-semibold transition ${selectedPlan === plan._id
                        ? 'bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {selectedPlanData && (
          <div className="mt-12 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Payment Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span>Selected Plan</span>
                  <span className="text-white font-semibold">{selectedPlanData.name}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Validity</span>
                  <span className="text-white font-semibold">{selectedPlanData.validity}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Benefits</span>
                  <span className="text-white font-semibold">{selectedPlanData.data} • {selectedPlanData.calls}</span>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between text-gray-400 mb-2">
                    <span>Plan price</span>
                    <span className="text-white font-semibold">{selectedPlanData.price}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 mb-2">
                    <span>Taxes & fees</span>
                    <span className="text-white font-semibold">₹29</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total payable</span>
                    <span>₹{totalWithFees}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Payment Options</h3>
                <span className="text-sm text-gray-400">Secure & encrypted</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPaymentMethod(option.id)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition ${paymentMethod === option.id
                      ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                      }`}
                  >
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-sm text-gray-400 mt-1">Instant confirmation</p>
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm text-gray-400">Account / Card holder</label>
                  <input
                    type="text"
                    value={paymentDetails.name}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                    placeholder="Enter name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                  />
                  {paymentMethod === 'card' && (
                    <>
                      <label className="block text-sm text-gray-400 mt-2">Card number</label>
                      <input
                        type="text"
                        value={paymentDetails.card}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, card: e.target.value })}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                      />
                    </>
                  )}
                  {paymentMethod === 'upi' && (
                    <>
                      <label className="block text-sm text-gray-400 mt-2">UPI ID</label>
                      <input
                        type="text"
                        value={paymentDetails.upi}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, upi: e.target.value })}
                        placeholder="username@bank"
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                      />
                    </>
                  )}
                </div>

                <div className="flex flex-col justify-between bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Recharge instantly</p>
                    <h4 className="text-2xl font-bold mb-4">One-click checkout</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Instant activation after payment</li>
                      <li>• Secure payments powered by trusted gateways</li>
                      <li>• Download receipt from your account</li>
                    </ul>
                  </div>
                  <button
                    onClick={handleRecharge}
                    className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
                  >
                    Pay now & recharge
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default Plans;
