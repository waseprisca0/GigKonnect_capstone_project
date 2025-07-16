import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    skill_category: '', // Only for worker
    bio: '' // Only for worker
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const SKILL_OPTIONS = [
    'nanny',
    'driver',
    'cook',
    'electrician',
    'mechanic'
  ];

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Clear API error when user starts typing
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.skill_category.trim()) {
      newErrors.skill_category = 'Skill category is required';
    }
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setApiError('');
    try {
      // Always register as worker
      const workerData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        skill_category: formData.skill_category,
        contact_info: formData.phone,
        bio: formData.bio
      };
      const response = await authAPI.register(workerData);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      if (response.worker) {
        localStorage.setItem('user', JSON.stringify(response.worker));
      } else if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      } else {
        localStorage.removeItem('user');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-purple-100 flex flex-col justify-center py-8 sm:px-4 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            GigKonnect
          </Link>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900">
            Worker
          </h2>
          <p className="mt-1 text-base text-gray-600 font-semibold">
            Registering to offer services
          </p>
          <p className="mt-1 text-xs text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-3 shadow sm:rounded-lg sm:px-6">
          {apiError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {apiError}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* First Name and Last Name on the same row */}
            <div className="flex gap-2">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-150 shadow-sm placeholder-gray-400"
                />
                {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-150 shadow-sm placeholder-gray-400"
                />
                {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-150 shadow-sm placeholder-gray-400"
              />
              {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-150 shadow-sm placeholder-gray-400"
              />
              {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
            </div>

            {/* Phone/Contact Info */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-150 shadow-sm placeholder-gray-400"
              />
              {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
            </div>

            {/* Skill Category */}
            <div>
              <label htmlFor="skill_category" className="block text-sm font-medium text-gray-700">
                Skill Category
              </label>
              <select
                id="skill_category"
                name="skill_category"
                value={formData.skill_category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-150 shadow-sm placeholder-gray-400"
              >
                <option value="" disabled className="text-gray-400 bg-gray-100">Select a skill</option>
                {SKILL_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                ))}
              </select>
              {errors.skill_category && <div className="text-red-500 text-sm">{errors.skill_category}</div>}
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Biography
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                maxLength={300}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-150 shadow-sm placeholder-gray-400"
                rows={4}
              />
              <div className="text-gray-500 text-xs">{formData.bio.length}/300 characters</div>
              {errors.bio && <div className="text-red-500 text-sm">{errors.bio}</div>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 