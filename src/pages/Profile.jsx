import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workersAPI } from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr && userStr !== 'undefined' && userStr !== 'null' ? JSON.parse(userStr) : null;
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    skill_category: user?.skill_category || '',
    contact_info: user?.contact_info || '',
    bio: user?.bio || '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.skill_category.trim()) newErrors.skill_category = 'Skill category is required';
    if (!form.contact_info.trim()) newErrors.contact_info = 'Contact info is required';
    if (!form.bio.trim()) newErrors.bio = 'Bio is required';
    if (form.bio.length > 300) newErrors.bio = 'Bio must be 300 characters or less';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccess(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSuccess(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({
      name: user?.name || '',
      skill_category: user?.skill_category || '',
      contact_info: user?.contact_info || '',
      bio: user?.bio || '',
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const updatedWorker = await workersAPI.update(user.id, form);
      localStorage.setItem('user', JSON.stringify(updatedWorker));
      setIsEditing(false);
      setSuccess(true);
      window.location.reload();
    } catch (error) {
      setErrors({ api: 'Failed to update profile. Please try again.' });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white font-sans">
        <div className="max-w-xl w-full p-8 bg-white rounded-2xl shadow-xl border border-blue-100 text-center">
          <h2 className="text-3xl font-extrabold mb-4 text-blue-800">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white font-sans">
      <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-blue-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-6">
          {/* Avatar */}
          <div className="flex-shrink-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-purple-300 to-blue-200 flex items-center justify-center text-5xl font-bold text-white shadow-md border-4 border-blue-200">
            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-xl font-bold mb-4 text-blue-800">My Profile</h2>
            {success && (
              <div className="mb-4 text-green-600 font-semibold">Profile updated successfully!</div>
            )}
            {!isEditing ? (
              <>
                <div className="mb-4 text-lg text-gray-800">
                  <div><span className="font-semibold text-blue-700">Name:</span> {user.name}</div>
                  <div className="mt-1"><span className="font-semibold text-purple-700">Skill Category:</span> <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">{user.skill_category}</span></div>
                  <div className="mt-1"><span className="font-semibold text-blue-700">Contact Info:</span> {user.contact_info || <span className="text-gray-400">Not set</span>}</div>
                  <div className="mt-1"><span className="font-semibold text-blue-700">Bio:</span> {user.bio || <span className="text-gray-400">Not set</span>}</div>
                </div>
                {/* Only show WhatsApp link if not viewing own profile */}
                {user.contact_info && false && (
                  <a
                    href={`https://wa.me/${user.contact_info.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors duration-150 mt-2"
                  >
                    <span role="img" aria-label="WhatsApp">💬</span> Chat me on WhatsApp
                  </a>
                )}
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-colors ml-4"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium text-blue-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>
                <div>
                  <label className="block font-medium text-purple-700">Skill Category</label>
                  <input
                    type="text"
                    name="skill_category"
                    value={form.skill_category}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-300"
                  />
                  {errors.skill_category && <div className="text-red-500 text-sm">{errors.skill_category}</div>}
                </div>
                <div>
                  <label className="block font-medium text-blue-700">Contact Info</label>
                  <input
                    type="text"
                    name="contact_info"
                    value={form.contact_info}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.contact_info && <div className="text-red-500 text-sm">{errors.contact_info}</div>}
                </div>
                <div>
                  <label className="block font-medium text-blue-700">Short Bio</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    maxLength={300}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
                    rows={4}
                  />
                  <div className="text-gray-500 text-xs">{form.bio.length}/300 characters</div>
                  {errors.bio && <div className="text-red-500 text-sm">{errors.bio}</div>}
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 