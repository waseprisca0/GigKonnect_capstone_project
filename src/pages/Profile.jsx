import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SKILL_CATEGORIES = [
  'nanny',
  'cook',
  'driver',
  'mechanics',
  'electrician',
];

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const existingProfile = JSON.parse(localStorage.getItem('workerProfile'));
  const [form, setForm] = useState(
    existingProfile || {
      name: user ? `${user.first_name} ${user.last_name}` : '',
      skills: [],
      phone: '',
      bio: '',
    }
  );
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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
    setSuccess(false); // Hide success message on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    localStorage.setItem('workerProfile', JSON.stringify(form));
    setSuccess(true);
    // Optionally update form state from localStorage
    // setForm(JSON.parse(localStorage.getItem('workerProfile')));
  };

  // Check if user is logged in
  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-4">Please log in to create a worker profile.</p>
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
      <h2 className="text-2xl font-bold mb-4">
        {existingProfile ? 'Edit Your Worker Profile' : 'Create Your Worker Profile'}
      </h2>
      {success && (
        <div className="mb-4 text-green-600 font-semibold">
          Profile saved successfully!
        </div>
      )}
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
          <label className="block font-medium mb-1">Select Your Skills</label>
          <div className="flex flex-wrap gap-4">
            {SKILL_CATEGORIES.map((cat) => (
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
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {existingProfile ? 'Update Profile' : 'Create Profile'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
          >
            Back to Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile; 