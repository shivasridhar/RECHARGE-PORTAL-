import React from 'react';

const Navigation = ({ currentPage }) => {
  const NavForm = ({ action, label }) => (
    <form method="get" action={action}>
      <button
        type="submit"
        className={`hover:text-orange-500 transition-colors ${currentPage === action.replace('/', '') || (action === '/' && currentPage === 'home') ? 'text-orange-500' : 'text-white'}`}
      >
        {label}
      </button>
    </form>
  );

  return (
    <nav className="fixed w-full top-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <form method="get" action="/" className="flex items-center space-x-2 cursor-pointer">
          <button type="submit" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <span className="text-xl font-bold text-white">
            Recharge<span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent">Portal</span>
          </span>
          </button>
        </form>
        <div className="flex items-center space-x-8">
          <NavForm action="/" label="Home" />
          <NavForm action="/about" label="About" />
          <NavForm action="/plans" label="Plans" />
          <form method="get" action="/login">
          <button 
              type="submit"
            className="relative px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-orange-500 via-yellow-500 to-purple-500 overflow-hidden group"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-yellow-500 to-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
