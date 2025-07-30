<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 303b04b7ef91e11f998c7aa8868bb87b059cd6d3
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
<<<<<<< HEAD
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Profile */}
=======
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`z-50 fixed top-0 left-0 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-blue-600/60 shadow-lg scale-95 rounded-2xl mx-2 mt-2 backdrop-blur-md'
          : 'bg-blue-500 shadow-none scale-100 rounded-none mx-0 mt-0'
      } text-white`}
      style={{
        transform: scrolled ? 'scale(0.97)' : 'scale(1)',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
>>>>>>> 303b04b7ef91e11f998c7aa8868bb87b059cd6d3
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold">
              GigKonnect
            </Link>
<<<<<<< HEAD
            {user && (
              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/profile')
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-400 hover:text-white'
                }`}
              >
                Profile
              </Link>
            )}
          </div>

          {/* Desktop Navigation (now empty) */}
          <div className="hidden md:block"></div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {user ? (
                <>
                  <span
                    className="px-3 py-1 rounded bg-white text-blue-600 flex items-center justify-center font-bold text-base md:text-lg"
                    title="Profile"
                  >
                    {user.first_name
                      ? user.first_name + (user.last_name ? ' ' + user.last_name : '')
                      : user.name
                        ? user.name
                        : 'User'}
                  </span>
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.href = '/login';
                    }}
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
=======
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-400 hover:text-white'}`}>Home</Link>
            <Link to="/services" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/services') ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-400 hover:text-white'}`}>Services</Link>
            {user && (
              <Link to="/profile" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/profile') ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-400 hover:text-white'}`}>Profile</Link>
            )}
            {!user && (
              <Link to="/login" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/login') ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-400 hover:text-white'}`}>Login</Link>
            )}
            {!user && (
              <Link to="/register" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/register') ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-400 hover:text-white'}`}>Sign Up</Link>
            )}
            {user && (
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            )}
            {user && (
              <span className="px-3 py-2 rounded-md bg-white text-blue-600 flex items-center justify-center font-bold text-base md:text-lg" title="Profile">
                {user.first_name
                  ? user.first_name + (user.last_name ? ' ' + user.last_name : '')
                  : user.name
                    ? user.name
                    : 'User'}
              </span>
            )}
>>>>>>> 303b04b7ef91e11f998c7aa8868bb87b059cd6d3
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-100 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
<<<<<<< HEAD
            <div className="px-2 pt-1 pb-[5rem] space-y-1 sm:px-3">
              {/* {user && (
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/profile')
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              )} */}
              <div className="pt-4 pb-3 bg-red">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="w-auto px-2 h-8 md:w-9 md:h-9 rounded bg-white text-blue-600 flex items-center justify-center font-bold text-base md:text-lg focus:outline-none"
                      title="Profile"
                    >
                      {user.first_name
                        ? user.first_name + (user.last_name ? ' ' + user.last_name : '')
                        : user.name
                          ? user.name
                          : 'User'}
                    </button>
                    {isMenuOpen && (
                      <div className="absolute left-0 mt-2 w-80 bg-white rounded shadow-lg py-2 z-50">
                        <button
                          onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            setIsMenuOpen(false);
                            window.location.href = '/login';
                          }}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-blue-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-500 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-500 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
=======
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-500 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-500 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              {user && (
                <Link to="/profile" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/profile') ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-500 hover:text-white'}`} onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
              )}
              {!user && (
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-500 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
              {!user && (
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-500 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              )}
              {user && (
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setIsMenuOpen(false);
                    window.location.href = '/login';
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-blue-100"
                >
                  Logout
                </button>
              )}
>>>>>>> 303b04b7ef91e11f998c7aa8868bb87b059cd6d3
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 