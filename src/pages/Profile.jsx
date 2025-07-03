import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Update user in localStorage (simulate backend update)
    const updatedUser = { ...user, ...form };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    setSuccess(true);
    window.location.reload(); // Ensure UI updates everywhere
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Worker Profile</h2>
      {success && (
        <div className="mb-4 text-green-600 font-semibold">
          Profile updated successfully!
        </div>
      )}
      {!isEditing ? (
        <>
          <div className="mb-4">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Skill Category:</strong> {user.skill_category}</div>
            <div><strong>Contact Info:</strong> {user.contact_info || 'Not set'}</div>
            <div><strong>Bio:</strong> {user.bio || 'Not set'}</div>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block font-medium">Skill Category</label>
            <input
              type="text"
              name="skill_category"
              value={form.skill_category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.skill_category && <div className="text-red-500 text-sm">{errors.skill_category}</div>}
          </div>
          <div>
            <label className="block font-medium">Contact Info</label>
            <input
              type="text"
              name="contact_info"
              value={form.contact_info}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.contact_info && <div className="text-red-500 text-sm">{errors.contact_info}</div>}
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
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile; 