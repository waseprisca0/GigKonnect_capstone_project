const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  // Register user
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get current user
  getCurrentUser: async () => {
    return apiCall('/auth/me');
  },
};

// Workers API calls
export const workersAPI = {
  // Get all workers
  getAll: async () => {
    return apiCall('/workers');
  },

  // Get workers by category
  getByCategory: async (categoryId) => {
    return apiCall(`/workers/category/${categoryId}`);
  },

  // Get worker by ID
  getById: async (workerId) => {
    return apiCall(`/workers/${workerId}`);
  },
};

// Categories API calls
export const categoriesAPI = {
  // Get all categories
  getAll: async () => {
    return apiCall('/categories');
  },
};

// Messages API calls
export const messagesAPI = {
  // Get messages between users
  getConversation: async (otherUserId) => {
    return apiCall(`/messages/conversation/${otherUserId}`);
  },

  // Send message
  send: async (messageData) => {
    return apiCall('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiCall('/health');
}; 