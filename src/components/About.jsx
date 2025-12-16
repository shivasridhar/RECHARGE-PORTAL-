import React from 'react';
import Navigation from './Navigation';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="about" />

      <div className="pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-2xl p-10 shadow-2xl shadow-purple-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-orange-400 mb-3">About us</p>
            <h1 className="text-4xl font-bold mb-6">Built for fast, reliable recharges</h1>
            <p className="text-gray-300 leading-relaxed mb-6">
              We started with one goal: make digital recharges instant, transparent, and delightful. 
              Today, thousands trust us every day for mobile recharges, DTH services, and seamless bill payments.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { title: '99.9% uptime', desc: 'Always-on platform with proactive monitoring.' },
                { title: 'Secure payments', desc: 'Trusted gateways with encrypted transactions.' },
                { title: 'Human support', desc: 'Priority help when you need it the most.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <form method="get" action="/plans">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white hover:opacity-90 transition"
                >
                  Browse Plans
                </button>
              </form>
              <form method="get" action="/">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg border border-gray-700 hover:border-orange-500 hover:bg-orange-500/10 transition"
                >
                  Back to Home
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








