import React from 'react';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

// Import your components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Plans from './components/Plans';
import About from './components/About';
import Admin from './components/Admin';
import Footer from './components/Footer';

// Main App Component with Router
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Sync with URL on mount and when URL changes
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/login') setCurrentPage('login');
    else if (path === '/signup') setCurrentPage('signup');
    else if (path === '/plans') setCurrentPage('plans');
    else if (path === '/about') setCurrentPage('about');
    else if (path === '/admin') setCurrentPage('admin');
    else setCurrentPage('home');
  }, []);

  // Listen for popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/login') setCurrentPage('login');
      else if (path === '/signup') setCurrentPage('signup');
      else if (path === '/plans') setCurrentPage('plans');
      else if (path === '/about') setCurrentPage('about');
      else if (path === '/admin') setCurrentPage('admin');
      else setCurrentPage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    // Update URL without page reload
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', path);
  };

  const renderPage = () => {
    if (currentPage === 'login') return <Login navigateTo={navigateTo} />;
    if (currentPage === 'signup') return <SignUp navigateTo={navigateTo} />;
    if (currentPage === 'plans') return <Plans navigateTo={navigateTo} />;
    if (currentPage === 'about') return <About navigateTo={navigateTo} />;
    if (currentPage === 'admin') return <Admin navigateTo={navigateTo} />;
    return <Home navigateTo={navigateTo} />;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="flex-1">{renderPage()}</div>
      <Footer navigateTo={navigateTo} currentPage={currentPage} />
    </div>
  );
};

export default App;
