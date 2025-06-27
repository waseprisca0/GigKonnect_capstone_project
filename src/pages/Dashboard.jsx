import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [profile, setProfile] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // If user is a client, redirect to home (clients don't have a dashboard)
    if (user.user_type && user.user_type.toLowerCase() === 'client') {
      navigate('/');
      return;
    }
    
    const workerProfile = JSON.parse(localStorage.getItem('workerProfile'));
    if (!workerProfile) {
      // If no worker profile exists, stay on dashboard but show create profile message
      setProfile(null);
      return;
    }
    setProfile(workerProfile);
  }, [navigate, user]);

  // Edit Profile Modal logic (reuse form fields)
  const [form, setForm] = useState({ name: '', skills: [], phone: '', bio: '' });
  const [errors, setErrors] = useState({});

  const handleEditProfileClick = () => {
    setForm(profile);
    setShowEdit(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'skills') {
      setForm((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((s) => s !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (form.skills.length === 0) newErrors.skills = 'Select at least one skill';
    if (!form.phone.trim()) newErrors.phone = 'Phone/WhatsApp is required';
    if (!form.bio.trim()) newErrors.bio = 'Bio is required';
    if (form.bio.length > 300) newErrors.bio = 'Bio must be 300 characters or less';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    localStorage.setItem('workerProfile', JSON.stringify(form));
    setProfile(JSON.parse(localStorage.getItem('workerProfile')));
    setShowEdit(false);
  };

  if (!user) return null;
  if (user.user_type && user.user_type.toLowerCase() === 'client') return null;

  // If no worker profile exists, show create profile message
  if (!profile) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Worker Dashboard</h2>
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Welcome to your worker dashboard! To get started, you need to create your worker profile.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            This will allow clients to find and contact you for work opportunities.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate('/profile')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Create Worker Profile
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Worker Dashboard</h2>
      <div className="mb-4">
        <div><strong>Name:</strong> {profile.name}</div>
        <div><strong>Skills:</strong> {profile.skills.join(', ')}</div>
        <div><strong>Phone/WhatsApp:</strong> {profile.phone}</div>
        <div><strong>Bio:</strong> {profile.bio}</div>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleEditProfileClick}
      >
        Edit Profile
      </button>
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
              </div>
              <div>
                <label className="block font-medium mb-1">Select Your Skills</label>
                <div className="flex flex-wrap gap-4">
                  {['nanny', 'cook', 'driver', 'mechanics', 'electrician'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="skills"
                        value={cat}
                        checked={form.skills.includes(cat)}
                        onChange={handleChange}
                      />
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </label>
                  ))}
                </div>
                {errors.skills && <div className="text-red-500 text-sm">{errors.skills}</div>}
              </div>
              <div>
                <label className="block font-medium">Phone/WhatsApp</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
              </div>
              <div>
                <label className="block font-medium">Short Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  maxLength={300}
                  className="w-full border rounded px-3 py-2"
                  rows={4}
                />
                <div className="text-gray-500 text-xs">{form.bio.length}/300 characters</div>
                {errors.bio && <div className="text-red-500 text-sm">{errors.bio}</div>}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 