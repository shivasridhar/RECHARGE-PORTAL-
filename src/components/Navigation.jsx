import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Navigation = ({ currentPage, navigateTo }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const checkLoginStatus = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsLoggedIn(true);
        setUserEmail(user.email || '');
      } catch (error) {
        setIsLoggedIn(false);
        setUserEmail('');
      }
    } else {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  };

  useEffect(() => {
    // Check if user is logged in on mount
    checkLoginStatus();

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === null) {
        checkLoginStatus();
      }
    };

    // Listen for custom login/logout events
    const handleAuthChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setUserEmail('');
    toast.success('Logged out successfully');
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authChange'));
    if (navigateTo) {
      navigateTo('home');
    } else {
      window.location.href = '/';
    }
  };

  const NavForm = ({ action, label }) => (
    <button
      type="button"
      onClick={() => {
        const page = action === '/' ? 'home' : action.replace('/', '');
        if (navigateTo) {
          navigateTo(page);
        } else {
          window.location.href = action;
        }
      }}
      className={`hover:text-orange-500 transition-colors ${currentPage === action.replace('/', '') || (action === '/' && currentPage === 'home') ? 'text-orange-500' : 'text-white'}`}
    >
      {label}
    </button>
  );

  return (
    <nav className="fixed w-full top-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button 
          type="button"
          onClick={() => {
            if (navigateTo) {
              navigateTo('home');
            } else {
              window.location.href = '/';
            }
          }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <span className="text-xl font-bold text-white">
            Recharge<span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent">Portal</span>
          </span>
        </button>
        <div className="flex items-center space-x-8">
          <NavForm action="/" label="Home" />
          <NavForm action="/about" label="About" />
          <NavForm action="/plans" label="Plans" />
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm hidden md:block">
                {userEmail}
              </span>
              <button 
                type="button"
                onClick={handleLogout}
                className="relative px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-red-500 via-orange-500 to-red-600 overflow-hidden group"
              >
                <span className="relative z-10">Logout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </div>
          ) : (
            <button 
              type="button"
              onClick={() => {
                if (navigateTo) {
                  navigateTo('login');
                } else {
                  window.location.href = '/login';
                }
              }}
              className="relative px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-orange-500 via-yellow-500 to-purple-500 overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-yellow-500 to-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
