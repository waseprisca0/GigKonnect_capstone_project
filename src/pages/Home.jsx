import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workersAPI } from "../services/api";

const Home = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr && userStr !== 'undefined' && userStr !== 'null' ? JSON.parse(userStr) : null;
  const workerProfileStr = localStorage.getItem('workerProfile');
  const workerProfile = workerProfileStr && workerProfileStr !== 'undefined' && workerProfileStr !== 'null' ? JSON.parse(workerProfileStr) : null;
  
  const categories = [
    {
      id: 'nanny',
      name: 'Nannies',
      icon: '👶',
      description: 'Professional childcare providers for your family. Experienced nannies offering safe, nurturing care for children of all ages.',
      features: ['CPR Certified', 'Background Checked', 'Flexible Hours', 'Educational Activities']
    },
    {
      id: 'cook',
      name: 'Cooks',
      icon: '👨‍🍳',
      description: 'Skilled chefs and home cooks ready to prepare delicious meals. From daily cooking to special events and dietary requirements.',
      features: ['Meal Planning', 'Dietary Restrictions', 'Event Catering', 'Fresh Ingredients']
    },
    {
      id: 'mechanic',
      name: 'Mechanics',
      icon: '🔧',
      description: 'Certified auto mechanics providing reliable vehicle maintenance and repair services. Expert diagnostics and quality workmanship.',
      features: ['Diagnostic Services', 'Preventive Maintenance', 'Emergency Repairs', 'Warranty Work']
    },
    {
      id: 'driver',
      name: 'Drivers',
      icon: '🚗',
      description: 'Professional drivers for all your transportation needs. Safe, reliable service for commuting, events, and special occasions.',
      features: ['Airport Transfers', 'Event Transportation', 'Daily Commuting', 'Luxury Vehicles']
    },
    {
      id: 'electrician',
      name: 'Electricians',
      icon: '⚡',
      description: 'Licensed electricians for residential and commercial electrical work. Safety-focused professionals for all electrical needs.',
      features: ['Installation', 'Repairs', 'Safety Inspections', 'Emergency Service']
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-blue-50 border-b">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-4">
            Find Trusted Gig Workers. Get the Job Done
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connecting You with Best Gig Workers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow"
            >
              Browse Services
            </a>
            {!user && (
              <Link
                to="/register"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors shadow"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Discover a wide range of professional services tailored to meet your needs. All our workers are verified, experienced, and ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              const noWorker = isSelected && workers.length === 0;
              return (
                <div
                  key={category.id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer flex flex-col items-center border ${isSelected ? 'border-blue-600' : 'border-gray-200'}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  </div>
                  <p className="text-gray-500 mb-4 text-center">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 text-sm">What's included:</h4>
                    <ul className="space-y-1">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 text-center flex items-center justify-center gap-2">
                    <button className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow">
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
            <div className="mt-12">
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
                      <span className="text-gray-700">{worker.skill_category}</span>
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
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About GigKonnect</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Workers</h3>
              <p className="text-gray-600">
                All workers undergo background checks and verification to ensure your safety and peace of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick & Easy</h3>
              <p className="text-gray-600">
                Find and book workers in minutes. Our streamlined process saves you time and hassle.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Service</h3>
              <p className="text-gray-600">
                We maintain high standards for all workers to ensure you receive exceptional service every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - this should be the last section before the footer */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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