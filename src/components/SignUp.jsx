import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Navigation from './Navigation';

const SignUp = ({ navigateTo }) => {
  const [signupForm, setSignupForm] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = signupForm;
    
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      console.log('Sending signup request to /api/signup', { email });
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      console.log('Signup response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Sign up failed. Please try again.');
      }
      
      const data = await response.json();
      console.log('Signup response data:', data);

      if (data.success) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isAdmin', data.isAdmin);
        // Dispatch custom event to notify Navigation component
        window.dispatchEvent(new Event('authChange'));
        
        toast.success('Account created successfully!');
        navigateTo('home');
      } else {
        toast.error(data.message || 'Sign up failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Sign up failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="signup" navigateTo={navigateTo} />

      <div className="pt-24 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-purple-900 to-purple-700 w-16 h-16 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">R</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">Create Account</h2>
              <p className="text-gray-400">Sign up to start your recharge journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email or Mobile</label>
                <input 
                  type="text"
                  name="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                  placeholder="Enter your email or mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input 
                  type="password"
                  name="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                  placeholder="Enter your password (min. 6 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input 
                  type="password"
                  name="confirmPassword"
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm text-gray-400">I agree to the Terms & Conditions</span>
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => navigateTo('login')}
                  className="text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Login
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
    </div>
  );
};

export default SignUp;

