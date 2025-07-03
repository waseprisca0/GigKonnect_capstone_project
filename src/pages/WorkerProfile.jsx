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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Worker Profile</h2>
      <div className="mb-4">
        <div><strong>Name:</strong> {worker.name}</div>
        <div><strong>Skill Category:</strong> {worker.skill_category}</div>
        <div><strong>Contact Info:</strong> {worker.contact_info || 'Not set'}</div>
        <div><strong>Bio:</strong> {worker.bio || 'Not set'}</div>
      </div>
      {worker.contact_info && (
        <a
          href={`https://wa.me/${worker.contact_info.replace(/[^\d]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow transition-colors duration-150 mt-2"
        >
          Chat me on WhatsApp
        </a>
      )}
    </div>
  );
};

export default WorkerProfile; 