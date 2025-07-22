import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workersAPI } from "../services/api";

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

const Services = () => {
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
    } catch {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-purple-100 font-sans pt-24">
      <section className="py-8">
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
        </div>
      </section>
    </div>
  );
};

export default Services;
