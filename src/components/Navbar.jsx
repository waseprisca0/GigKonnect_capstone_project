import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const workerProfile = JSON.parse(localStorage.getItem('workerProfile'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('workerProfile');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  // Determine user type (keeping for potential future use)
  const isClient = user && user.user_type && user.user_type.toLowerCase() === 'client';
  const isWorker = user && user.user_type && user.user_type.toLowerCase() === 'worker';
  const hasWorkerProfile = !!workerProfile;
  const isAdmin = user && user.is_admin;

  // Show worker registration link if user is logged in but doesn't have a worker profile
  const showWorkerRegistration = user && !hasWorkerProfile;

  return (
    <nav className="bg-blue-600 p-1 md:p-3 flex justify-between items-center">
      <div className="flex items-center gap-1 md:gap-2">
        {/* Creative G Logo - even smaller on mobile */}
        <span className="relative flex items-center justify-center">
          <span className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg border-2 border-yellow-400">
            <span className="text-base md:text-2xl font-extrabold font-serif text-yellow-900 tracking-wide drop-shadow-lg" style={{ fontFamily: 'serif', letterSpacing: '0.05em' }}>G</span>
          </span>
          {/* Decorative ring - even smaller on mobile */}
          <span className="absolute w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-yellow-300 opacity-60 animate-pulse" style={{ top: '-2px', left: '-2px', zIndex: 0 }}></span>
        </span>
        <Link to="/" className="text-white text-base md:text-xl font-bold">GigKonnect</Link>
      </div>
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-3 md:space-x-4">
        <Link to="/" className="text-white text-base md:text-lg">Home</Link>
        {showWorkerRegistration && (
          <Link to="/profile" className="text-yellow-300 text-base md:text-lg hover:text-yellow-200 font-medium">
            Want to register as a worker?
          </Link>
        )}
        {user && <Link to="/dashboard" className="text-white text-base md:text-lg">Dashboard</Link>}
        {isAdmin && <Link to="/admin" className="text-red-300 text-base md:text-lg hover:text-red-200 font-medium">Admin</Link>}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((open) => !open)}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-base md:text-lg focus:outline-none"
              title="Profile"
            >
              {user.first_name ? user.first_name.charAt(0).toUpperCase() : 'U'}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
                {hasWorkerProfile && (
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                )}
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-blue-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="text-white text-base md:text-lg">Login</Link>
            <Link to="/register" className="bg-white text-blue-600 px-2 py-1 rounded text-base md:text-lg">Sign Up</Link>
          </>
        )}
      </div>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="text-white focus:outline-none"
          aria-label="Open menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-blue-600 z-50 flex flex-col items-center py-3 space-y-3 md:hidden shadow-lg">
          <Link to="/" className="text-white text-base" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          {showWorkerRegistration && (
            <Link to="/profile" className="text-yellow-300 text-base hover:text-yellow-200 font-medium" onClick={() => setMobileMenuOpen(false)}>
              Want to register as a worker?
            </Link>
          )}
          {user && <Link to="/dashboard" className="text-white text-base" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>}
          {isAdmin && <Link to="/admin" className="text-red-300 text-base hover:text-red-200 font-medium" onClick={() => setMobileMenuOpen(false)}>Admin</Link>}
          {user ? (
            <>
              <button
                onClick={() => setDropdownOpen((open) => !open)}
                className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-base focus:outline-none"
                title="Profile"
              >
                {user.first_name ? user.first_name.charAt(0).toUpperCase() : 'U'}
              </button>
              {dropdownOpen && (
                <div className="w-40 bg-white rounded shadow-lg py-2 z-50 mt-2">
                  {hasWorkerProfile && (
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                      onClick={() => { setDropdownOpen(false); setMobileMenuOpen(false); }}
                    >
                      Profile
                    </Link>
                  )}
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                    onClick={() => { setDropdownOpen(false); setMobileMenuOpen(false); }}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-blue-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="text-white text-base" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/register" className="bg-white text-blue-600 px-2 py-1 rounded text-base" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 