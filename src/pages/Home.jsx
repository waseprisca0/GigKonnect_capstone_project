<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workersAPI } from "../services/api";
=======
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
>>>>>>> 303b04b7ef91e11f998c7aa8868bb87b059cd6d3

const Home = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr && userStr !== 'undefined' && userStr !== 'null' ? JSON.parse(userStr) : null;
  const workerProfileStr = localStorage.getItem('workerProfile');
  const workerProfile = workerProfileStr && workerProfileStr !== 'undefined' && workerProfileStr !== 'null' ? JSON.parse(workerProfileStr) : null;
  
<<<<<<< HEAD
  const categories = [
    {
      id: 'nanny',
      name: 'Nannies',
      icon: '👶',
      description: 'Nannies offer safe, nurturing care for children of all ages.',
      features: ['CPR Certified', 'Background Checked', 'Flexible Hours', 'Educational Activities']
    },
    {
      id: 'cook',
      name: 'Cooks',
      icon: '👨‍🍳',
      description: 'Cooks prepare delicious meals for daily needs or special events.',
      features: ['Meal Planning', 'Dietary Restrictions', 'Event Catering', 'Fresh Ingredients']
    },
    {
      id: 'mechanic',
      name: 'Mechanics',
      icon: '🔧',
      description: 'Mechanics help with vehicle maintenance, repairs, and diagnostics.',
      features: ['Diagnostic Services', 'Preventive Maintenance', 'Emergency Repairs', 'Warranty Work']
    },
    {
      id: 'driver',
      name: 'Drivers',
      icon: '🚗',
      description: 'Drivers provide safe, reliable transportation for commuting and events.',
      features: ['Airport Transfers', 'Event Transportation', 'Daily Commuting', 'Luxury Vehicles']
    },
    {
      id: 'electrician',
      name: 'Electricians',
      icon: '⚡',
      description: 'Electricians handle installations, repairs, and electrical work for homes and businesses.',
      features: ['Installation', 'Repairs', 'Safety Inspections', 'Emergency Service']
    },
    {
      id: 'cleaner',
      name: 'Cleaners',
      icon: '🧹',
      description: 'Cleaners keep homes, offices, and events spotless and organized.',
      features: ['Deep Cleaning', 'Move-in/Move-out', 'Eco-friendly Products', 'Flexible Scheduling']
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [loadingWorkers, setLoadingWorkers] = useState(false);
  const [error, setError] = useState("");

  // Fetch workers by category from backend
  const fetchWorkersByCategory = async (categoryId) => {
    setLoadingWorkers(true);
    setError("");
    try {
      const data = await workersAPI.getByCategory(categoryId);
      setWorkers(data);
    } catch (err) {
      setError("Failed to fetch workers");
      setWorkers([]);
    } finally {
      setLoadingWorkers(false);
    }
  };

  // When a category is selected, fetch workers for that category
  useEffect(() => {
    if (selectedCategory) {
      fetchWorkersByCategory(selectedCategory);
    } else {
      setWorkers([]);
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-purple-100 font-sans">
      {/* Hero Section */}
      <section className="py-10 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300">
        <div className="max-w-4xl mx-auto px-4 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">Find Trusted Gig Workers</h1>
          <p className="text-lg md:text-2xl text-blue-100 mb-8 font-medium">Connecting you with the best gig workers for every need.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow border border-blue-200"
            >
              Browse Services
            </a>
            {!user && (
              <Link
                to="/register"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow border border-blue-800"
=======
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-300 to-purple-100 font-sans relative overflow-hidden scroll-smooth">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen h-screen py-0 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-80 z-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#2563eb" fillOpacity="0.7">
              <animate attributeName="d" dur="8s" repeatCount="indefinite"
                values="
                  M0,224L80,208C160,192,320,160,480,154.7C640,149,800,171,960,186.7C1120,203,1280,213,1360,218.7L1440,224L1440,320L0,320Z;
                  M0,192L80,186.7C160,181,320,171,480,154.7C640,139,800,117,960,128C1120,139,1280,181,1360,202.7L1440,224L1440,320L0,320Z;
                  M0,224L80,208C160,192,320,160,480,154.7C640,149,800,171,960,186.7C1120,203,1280,213,1360,218.7L1440,224L1440,320L0,320Z
                "
              />
            </path>
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
>>>>>>> 303b04b7ef91e11f998c7aa8868bb87b059cd6d3
              >
                Sign Up
              </Link>
            )}
<<<<<<< HEAD
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Services</h2>
            <p className="text-lg text-blue-700 max-w-3xl mx-auto">
              Discover a wide range of professional services tailored to meet your needs. All our workers are verified, experienced, and ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              const noWorker = isSelected && workers.length === 0;
              return (
                <div
                  key={category.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 cursor-pointer flex flex-col items-center border-2 ${isSelected ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">{category.name}</h3>
                  </div>
                  <p className="text-blue-700 mb-4 text-center">
                    {category.description}
                  </p>
                  <div className="mt-6 text-center flex items-center justify-center gap-2 w-full">
                    <button className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors shadow">
                      Find {category.name}
                    </button>
                    {noWorker && (
                      <span className="ml-2 bg-red-100 text-red-700 font-semibold rounded-full px-3 py-1 text-xs shadow-sm">
                        No available worker
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Worker List for Selected Category */}
          {selectedCategory && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-700">
                {categories.find((cat) => cat.id === selectedCategory)?.name} Workers
              </h3>
              {loadingWorkers ? (
                <div className="text-center text-blue-600 font-semibold">Loading workers...</div>
              ) : error ? (
                <div className="text-center text-red-600 font-semibold">{error}</div>
              ) : workers.length > 0 ? (
                <ul className="space-y-4 max-w-lg mx-auto">
                  {workers.map((worker, idx) => (
                    <li key={idx} className="bg-white rounded-xl shadow p-4 border border-blue-100 flex items-center justify-between">
                      <Link
                        to={`/profile/${worker.id}`}
                        className="font-bold text-lg text-blue-700 hover:underline hover:text-blue-900 transition-colors px-4 py-2 rounded bg-blue-50 hover:bg-blue-100"
                      >
                        {worker.name}
                      </Link>
                      <span className="text-blue-700">{worker.skill_category}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-red-600 font-semibold">No available worker</div>
              )}
              <div className="text-center mt-6">
                <button
                  className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 border border-gray-300"
                  onClick={() => setSelectedCategory(null)}
                >
                  Back to Categories
                </button>
              </div>
            </div>
          )}
=======
          </motion.div>
>>>>>>> 303b04b7ef91e11f998c7aa8868bb87b059cd6d3
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

<<<<<<< HEAD
      {/* CTA Section - this should be the last section before the footer */}
      <section className="bg-gray-900 text-white py-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300">
=======
      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
>>>>>>> 303b04b7ef91e11f998c7aa8868bb87b059cd6d3
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