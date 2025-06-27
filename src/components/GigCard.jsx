import React from 'react';

const GigCard = ({ worker }) => {
  const {
    id,
    name,
    category,
    image,
    rating,
    reviewCount,
    hourlyRate,
    location,
    description,
    isAvailable
  } = worker;

  const getCategoryIcon = (category) => {
    const icons = {
      nanny: '👶',
      cook: '👨‍🍳',
      mechanic: '🔧',
      driver: '🚗',
      electrician: '⚡'
    };
    return icons[category.toLowerCase()] || '👤';
  };

  const getCategoryColor = (category) => {
    const colors = {
      nanny: 'bg-pink-100 text-pink-800',
      cook: 'bg-orange-100 text-orange-800',
      mechanic: 'bg-blue-100 text-blue-800',
      driver: 'bg-green-100 text-green-800',
      electrician: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-4xl">{getCategoryIcon(category)}</span>
          </div>
        )}
        
        {/* Availability Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isAvailable 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isAvailable ? 'Available' : 'Busy'}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm text-gray-600 ml-1">{rating}</span>
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>

        {/* Location */}
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {location}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {description}
        </p>

        {/* Rate and Action */}
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-blue-600">
            ${hourlyRate}/hr
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default GigCard; 