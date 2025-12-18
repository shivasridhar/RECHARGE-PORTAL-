import React from 'react';

const Footer = ({ currentPage }) => {
  return (
    <footer className="border-t border-gray-800 bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our offerings</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              {['Mobile', 'Home', 'Business', 'Mobile Apps', 'Mobile Devices', '5G Network', 'JioHome Apps', 'JioHome Devices'].map((item) => (
                <li key={item} className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 cursor-pointer transition-colors duration-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              {['Explore Support', 'Locate us', 'FAQ', 'Track order', 'Contact us', 'Do not disturb'].map((item) => (
                <li key={item} className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 cursor-pointer transition-colors duration-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our company</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              {['About us', 'Reliance Industries', 'Reliance Foundation', 'JioLife', 'Careers', 'Investor relations'].map((item) => (
                <li key={item} className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 cursor-pointer transition-colors duration-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold mb-6">Useful links</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              {['Get JioHome', 'Get Jio SIM', 'Matching number', 'Recharge', 'Pay Bills', 'Login', 'Jio Customer Associates', 'Coverage map', 'Service Quality', 'Sitemap'].map((item) => (
                <li key={item} className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 cursor-pointer transition-colors duration-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 - Connect & Download */}
          <div>
            <h3 className="text-lg font-bold mb-6">Connect with Us</h3>
            <div className="flex space-x-4 mb-8">
              {/* Social placeholders */}
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:opacity-80">X</div>
              <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center cursor-pointer hover:opacity-80">IG</div>
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center cursor-pointer hover:opacity-80">FB</div>
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:opacity-80">YT</div>
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center cursor-pointer hover:opacity-80">IN</div>
            </div>

            <h3 className="text-lg font-bold mb-6">Download MyJio</h3>
            <div className="flex flex-col space-y-3">
              <button className="bg-black border border-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2 hover:border-gray-500">
                <div className="text-left">
                  <p className="text-[10px] text-gray-400">GET IT ON</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </button>
              <button className="bg-black border border-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2 hover:border-gray-500">
                <div className="text-left">
                  <p className="text-[10px] text-gray-400">Download on the</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} RechargePortal. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Fast, secure, and reliable digital recharges.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;








