import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    user_type: 'client',
    is_admin: false
  });
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Get current user info
        const currentUser = await authAPI.getCurrentUser();
        setUser(currentUser.user);
        if (!currentUser.user || currentUser.user.is_admin !== true) {
          setError('You are not authorized to view this page.');
          setTimeout(() => navigate('/'), 2000);
          return;
        }
        
        // Fetch all users
        await fetchUsers();
      } catch (err) {
        setError('Failed to load admin dashboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateError('');
    setCreateSuccess('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(createForm),
      });
      const data = await res.json();
      
      if (res.ok) {
        setCreateSuccess('User created successfully!');
        setCreateForm({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          phone: '',
          user_type: 'client',
          is_admin: false
        });
        setShowCreateForm(false);
        await fetchUsers(); // Refresh users list
      } else {
        setCreateError(data.message || 'Failed to create user');
      }
    } catch (err) {
      setCreateError('Failed to create user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      
      if (res.ok) {
        setUsers(users.filter(user => user.id !== userId));
        setCreateSuccess('User deleted successfully!');
      } else {
        setCreateError(data.message || 'Failed to delete user');
      }
    } catch (err) {
      setCreateError('Failed to delete user');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error && error.length > 0) return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!user) return <div className="text-center mt-8">Not authorized or not logged in.</div>;

  return (
    <div className="p-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </button>
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showCreateForm ? 'Cancel' : 'Create New User'}
          </button>
        </div>

        {/* Admin Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h2 className="text-lg font-semibold mb-2">Admin Information</h2>
          <div><strong>Name:</strong> {user.first_name} {user.last_name}</div>
          <div><strong>Email:</strong> {user.email}</div>
        </div>

        {/* Create User Form */}
        {showCreateForm && (
          <div className="mb-6 p-4 border rounded">
            <h2 className="text-xl font-semibold mb-4">Create New User</h2>
            {createError && <div className="text-red-500 mb-4">{createError}</div>}
            {createSuccess && (
              <div className="mb-4">
                <div className="text-green-500 mb-2">{createSuccess}</div>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </button>
              </div>
            )}
            
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name *</label>
                  <input
                    type="text"
                    name="first_name"
                    value={createForm.first_name}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="last_name"
                    value={createForm.last_name}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={createForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={createForm.password}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={createForm.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">User Type</label>
                  <select
                    name="user_type"
                    value={createForm.user_type}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="client">Client</option>
                    <option value="worker">Worker</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_admin"
                      checked={createForm.is_admin}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium">Admin User</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  Create User
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Users ({users.length})</h2>
          {createSuccess && <div className="text-green-500 mb-4">{createSuccess}</div>}
          {createError && <div className="text-red-500 mb-4">{createError}</div>}
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((userItem) => (
                  <tr key={userItem.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {userItem.first_name} {userItem.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{userItem.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{userItem.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        userItem.user_type === 'worker' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {userItem.user_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {userItem.is_admin ? (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Admin
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(userItem.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {userItem.id !== user.id && (
                        <button
                          onClick={() => handleDeleteUser(userItem.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                      {userItem.id === user.id && (
                        <span className="text-gray-400">Current User</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 