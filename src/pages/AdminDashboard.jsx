import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/workers');
      const data = await res.json();
      if (res.ok) {
        setWorkers(data);
      } else {
        setError(data.error || 'Failed to fetch workers');
      }
    } catch (err) {
      setError('Failed to fetch workers');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorker = async (workerId) => {
    if (!window.confirm('Are you sure you want to delete this worker?')) return;
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`http://localhost:5000/api/workers/${workerId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setWorkers(workers.filter(w => w.id !== workerId));
        setSuccess('Worker deleted successfully!');
      } else {
        setError(data.error || 'Failed to delete worker');
      }
    } catch (err) {
      setError('Failed to delete worker');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="p-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </button>
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Workers ({workers.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workers.map((worker) => (
                  <tr key={worker.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{worker.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{worker.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{worker.skill_category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{worker.contact_info}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{worker.bio}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDeleteWorker(worker.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {workers.length === 0 && <div className="text-center py-8">No workers found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 