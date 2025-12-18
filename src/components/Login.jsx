import React, { useState } from 'react';
import Navigation from './Navigation';

const Login = ({ navigateTo }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const ADMIN_EMAIL = 'admin@portal.com';
  const ADMIN_PASS = 'admin123';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginForm;
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      console.log('Sending login request to /api/login', { email });
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed. Please try again.');
      }
      
      const data = await response.json();
      console.log('Login response data:', data);

      if (data.success) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isAdmin', data.isAdmin);

        if (data.isAdmin) {
          alert('Login successful (admin)');
          navigateTo('admin');
        } else {
          alert('Login successful');
          navigateTo('home');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="login" />

      <div className="pt-24 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-purple-900 to-purple-700 w-16 h-16 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">R</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-400">Login to continue your recharge</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email or Mobile</label>
                <input 
                  type="text"
                  name="email"
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
                  name="password"
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
                <button type="button" className="text-sm text-purple-400 hover:text-purple-300">
                  Forgot password?
                </button>
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <form method="get" action="/">
                  <button type="submit" className="text-purple-400 hover:text-purple-300 font-semibold">
                  Sign up
                </button>
                </form>
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

export default Login;
