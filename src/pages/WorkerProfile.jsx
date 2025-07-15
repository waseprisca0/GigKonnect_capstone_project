import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workersAPI } from '../services/api';

const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorker = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await workersAPI.getById(id);
        setWorker(data);
      } catch (err) {
        setError('Failed to load worker profile');
      } finally {
        setLoading(false);
      }
    };
    fetchWorker();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!worker) return <div className="text-center mt-8">Worker not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-white flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-blue-100">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition-colors"
        >
          ← Back
        </button>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-purple-300 to-blue-200 flex items-center justify-center text-5xl font-bold text-white shadow-md border-4 border-blue-200">
            {worker.name ? worker.name.charAt(0).toUpperCase() : '?'}
          </div>
          {/* Profile Details */}
          <div className="flex-1 w-full">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-2 tracking-tight">{worker.name}</h2>
            <div className="mb-3 text-lg text-gray-700">
              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold mr-2">
                {worker.skill_category || 'No category'}
              </span>
            </div>
            <div className="mb-2 text-base text-gray-800">
              <strong className="text-blue-700">Contact:</strong> {worker.contact_info || <span className="text-gray-400">Not set</span>}
            </div>
            <div className="mb-4 text-base text-gray-800">
              <strong className="text-blue-700">Bio:</strong> {worker.bio || <span className="text-gray-400">Not set</span>}
            </div>
            {worker.contact_info && (
              <a
                href={`https://wa.me/${worker.contact_info.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors duration-150 mt-2"
              >
                💬 Chat me on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile; 