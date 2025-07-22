import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr && userStr !== 'undefined' && userStr !== 'null' ? JSON.parse(userStr) : null;
  const workerProfileStr = localStorage.getItem('workerProfile');
  const workerProfile = workerProfileStr && workerProfileStr !== 'undefined' && workerProfileStr !== 'null' ? JSON.parse(workerProfileStr) : null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-purple-100 font-sans relative overflow-hidden scroll-smooth">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen h-screen py-0 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#2563eb" // More vibrant blue
              fillOpacity="0.7"
              d="
                M0,224L80,208C160,192,320,160,480,154.7C640,149,800,171,960,186.7C1120,203,1280,213,1360,218.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z
              "
            />
            {/* Optionally, add a second path for more depth */}
            <path
              fill="#3b82f6"
              fillOpacity="0.5"
              d="
                M0,288L80,272C160,256,320,224,480,213.3C640,203,800,213,960,229.3C1120,245,1280,267,1360,277.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z
              "
            />
          </svg>
        </div>
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
          >
            Find Trusted Gig Workers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
            className="text-2xl md:text-3xl text-blue-100 mb-10 font-medium"
          >
            Connecting you with the best gig workers for every need.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/services"
              className="bg-white text-blue-700 px-10 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow border border-blue-200 text-lg"
            >
              Browse Services
            </Link>
            {!user && (
              <Link
                to="/register"
                className="bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow border border-blue-800 text-lg"
              >
                Sign Up
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">About GigKonnect</h2>
            <p className="text-lg text-blue-700 max-w-3xl mx-auto">
              We're revolutionizing how people connect with casual workers. 
              Our platform makes it easy to find reliable, verified workers for all needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Verified Workers</h3>
              <p className="text-blue-700">
                All workers undergo background checks and verification to ensure your safety and peace of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Quick & Easy</h3>
              <p className="text-blue-700">
                Find and book workers in minutes. Our streamlined process saves you time and hassle.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Quality Service</h3>
              <p className="text-blue-700">
                We maintain high standards for all workers to ensure you receive exceptional service every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied clients who found their perfect worker on GigKonnect
          </p>
          {user ? (
            <div className="space-y-4">
              <p className="text-gray-300">Welcome back! Browse our services or create a worker profile.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#services"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse Services
                </a>
                {!workerProfile && (
                  <Link
                    to="/profile"
                    className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                  >
                    Become a Worker
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 