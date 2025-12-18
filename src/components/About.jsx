import React from 'react';
import Navigation from './Navigation';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="about" />

      <div className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 font-bold mb-4">
              About Us
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Revolutionizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500">Digital Recharges</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              We started with a simple vision: to make staying connected effortless. Today, we empower millions of users with a seamless, secure, and intuitive platform for all their recharging needs.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[
              { label: 'Happy Users', value: '10M+' },
              { label: 'Daily Transactions', value: '500k+' },
              { label: 'Service Providers', value: '50+' },
              { label: 'Support Agents', value: '24/7' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800 backdrop-blur-sm">
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Detailed Content */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                To build the world's most reliable and user-friendly digital payments ecosystem. We believe that technology should simplify life, not complicate it. That's why we've built a platform that's as fast as it is secure.
              </p>
              <ul className="space-y-4">
                {[
                  'Simplifying complex payment flows',
                  'Ensuring 100% transaction security',
                  'Providing transparency in pricing',
                  'Building trust through reliability'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/50 transition duration-300">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-gray-400 leading-relaxed">
                  Our advanced infrastructure ensures that your recharges are processed in milliseconds, not minutes. We value your time.
                </p>
              </div>

              <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/50 transition duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Bank-Grade Security</h3>
                <p className="text-gray-400 leading-relaxed">
                  We allow end-to-end encryption and comply with global security standards to keep your financial data safe and private.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 border border-gray-800 rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to experience the future?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join millions of satisfied users who have switched to a smarter, faster way to recharge.
            </p>
            <div className="flex justify-center gap-4">
              <form method="get" action="/plans">
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Explore Plans
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;








