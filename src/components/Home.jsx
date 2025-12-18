import React from 'react';
import Navigation from './Navigation';

const Home = ({ navigateTo }) => {
  return (
    <div className="min-h-screen text-white">
      <Navigation currentPage="home" navigateTo={navigateTo} />

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Instant recharge<br />
                <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent">
                  made simple
                </span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Experience lightning-fast mobile recharges, DTH services, and bill payments. 
                Join over 10,000+ satisfied customers who trust us for their daily recharge needs.
              </p>
              <div className="flex space-x-4">
                <form method="get" action="/plans">
                <button 
                    type="submit"
                  className="relative px-8 py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-orange-500 via-yellow-500 to-purple-500 overflow-hidden group hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1"
                >
                  <span className="relative z-10">Browse Plans</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-yellow-500 to-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>
                </form>
                <form method="get" action="/about">
                  <button 
                    type="submit"
                    className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-700 hover:border-orange-500 hover:bg-orange-500/10 transition-all hover:-translate-y-1"
                  >
                  Learn More
                </button>
                </form>
              </div>

              <div className="mt-12 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-800"></div>
                <div>
                  <p className="text-sm text-gray-400 italic">
                    "Fast, reliable, and incredibly easy to use. Best recharge platform I've ever used!"
                  </p>
                  <p className="text-sm font-semibold mt-1">Sarah Johnson, Premium User</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { 
                  title: 'Mobile Recharge', 
                  height: 'h-56',
                  image: '/images/card1.png'
                },
                { 
                  title: 'DTH Recharge', 
                  height: 'h-64',
                  image: '/images/card2.png'
                },
                { 
                  title: 'Data / Internet Packs', 
                  height: 'h-64',
                  image: '/images/card3.png'
                },
                { 
                  title: 'Recharge History', 
                  height: 'h-56',
                  image: '/images/card4.png'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.height} relative overflow-hidden border border-gray-800 rounded-2xl flex items-center justify-center hover:border-orange-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer px-6 text-center`}
                  style={{
                    backgroundImage: item.image
                      ? `linear-gradient(135deg, rgba(0,0,0,0.55), rgba(0,0,0,0.7)), url(${item.image})`
                      : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="text-center drop-shadow-lg">
                    <p className="font-semibold text-xl">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Offers */}
      <div className="bg-gray-900/40 border-y border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Offers rolling out</h2>
              <form method="get" action="/plans">
                <button
                  type="submit"
                  className="text-sm text-orange-400 hover:text-orange-300 underline"
                >
                  View plans
                </button>
              </form>
            </div>
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-black/60">
            <div className="offer-scroll flex space-x-4 py-6">
              {[
                { title: 'Unlimited calls + 2GB/day', price: '₹299', tag: 'Popular' },
                { title: 'OTT combo + 3GB/day', price: '₹499', tag: 'Bestseller' },
                { title: 'Data booster + 5G priority', price: '₹199', tag: 'Top-up' },
                { title: 'Annual saver 1.5GB/day', price: '₹2199', tag: 'Long-term' },
                { title: 'Weekend binge extra 20GB', price: '₹129', tag: 'Limited' },
                { title: 'Student pack 84 days', price: '₹699', tag: 'Value' }
              ].flatMap((offer, repeatIdx) => [
                { ...offer, key: `${offer.title}-${repeatIdx}-a` },
                { ...offer, key: `${offer.title}-${repeatIdx}-b` }
              ]).map((offer, idx) => (
                <div
                  key={offer.key + idx}
                  className="min-w-[260px] bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-xl p-5 shadow-lg shadow-purple-500/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/30">
                      {offer.tag}
                    </span>
                    <span className="text-lg font-bold">{offer.price}</span>
                  </div>
                  <p className="font-semibold text-lg mb-2">{offer.title}</p>
                  <p className="text-xs text-gray-400">Instant activation • Zero paperwork</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
