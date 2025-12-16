import React from 'react';

const Footer = ({ currentPage }) => {
  return (
    <footer className="border-t border-gray-800 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6 items-center text-sm text-gray-400">
        <div>
          <p className="text-lg font-bold text-white">RechargePortal</p>
          <p className="mt-2">Fast, secure, and reliable digital recharges.</p>
        </div>
        <div className="flex space-x-6 justify-center">
          {[
            { id: 'home', label: 'Home', action: '/' },
            { id: 'about', label: 'About', action: '/about' },
            { id: 'plans', label: 'Plans', action: '/plans' },
            { id: 'login', label: 'Login', action: '/login' }
          ].map((item) => (
            <form key={item.id} method="get" action={item.action}>
              <button
                type="submit"
                className={`hover:text-orange-400 transition ${
                  currentPage === item.id ? 'text-orange-400' : ''
                }`}
              >
                {item.label}
              </button>
            </form>
          ))}
        </div>
        <div className="text-right">
          <p>Need help? support@rechargeportal.com</p>
          <p className="mt-1 text-gray-500 text-xs">© {new Date().getFullYear()} RechargePortal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;








