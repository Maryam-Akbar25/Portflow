const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

export const api = {
  // Ships API
  getShips: () => apiCall("/ships/"),
  getShip: (id) => apiCall(`/ships/${id}/`),
  createShip: (data) =>
    apiCall("/ships/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateShip: (id, data) =>
    apiCall(`/ships/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteShip: (id) =>
    apiCall(`/ships/${id}/`, {
      method: "DELETE",
    }),

  // Berths API
  getBerths: () => apiCall("/berths/"),
  getBerth: (id) => apiCall(`/berths/${id}/`),
  createBerth: (data) =>
    apiCall("/berths/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateBerth: (id, data) =>
    apiCall(`/berths/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteBerth: (id) =>
    apiCall(`/berths/${id}/`, {
      method: "DELETE",
    }),

  // Ports API
  getPorts: () => apiCall("/ports/"),
  getPort: (id) => apiCall(`/ports/${id}/`),
  createPort: (data) =>
    apiCall("/ports/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updatePort: (id, data) =>
    apiCall(`/ports/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deletePort: (id) =>
    apiCall(`/ports/${id}/`, {
      method: "DELETE",
    }),

  // Users API
  getUsers: () => apiCall("/users/"),
  getUser: (id) => apiCall(`/users/${id}/`),
  createUser: (data) =>
    apiCall("/users/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateUser: (id, data) =>
    apiCall(`/users/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteUser: (id) =>
    apiCall(`/users/${id}/`, {
      method: "DELETE",
    }),

  // Roles API
  getRoles: () => apiCall("/roles/"),
  getRole: (id) => apiCall(`/roles/${id}/`),
  createRole: (data) =>
    apiCall("/roles/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateRole: (id, data) =>
    apiCall(`/roles/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteRole: (id) =>
    apiCall(`/roles/${id}/`, {
      method: "DELETE",
    }),

  // Schedules API
  getSchedules: () => apiCall("/schedules/"),
  getSchedule: (id) => apiCall(`/schedules/${id}/`),
  createSchedule: (data) =>
    apiCall("/schedules/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateSchedule: (id, data) =>
    apiCall(`/schedules/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteSchedule: (id) =>
    apiCall(`/schedules/${id}/`, {
      method: "DELETE",
    }),

  // Assignments API
  getAssignments: () => apiCall("/assignments/"),
  getAssignment: (id) => apiCall(`/assignments/${id}/`),
  createAssignment: (data) =>
    apiCall("/assignments/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateAssignment: (id, data) =>
    apiCall(`/assignments/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteAssignment: (id) =>
    apiCall(`/assignments/${id}/`, {
      method: "DELETE",
    }),
  getDashboardSummary: async () => {
    const res = await fetch(`${API_BASE_URL}/summary/`);
    if (!res.ok) throw new Error(`Summary request failed: ${res.status}`);
    return res.json();
  },
  getSchedules: async () => {
    const res = await fetch(`${API_BASE_URL}/schedules/`);
    if (!res.ok) throw new Error(`Schedules request failed: ${res.status}`);
    return res.json();
  },
  getAssignments: async () => {
    const res = await fetch(`${API_BASE_URL}/assignments/`);
    if (!res.ok) throw new Error(`Assignments request failed: ${res.status}`);
    return res.json();
  },
  createAssignment: async (data) => {
    const res = await fetch(`${API_BASE_URL}/assignments/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Create assignment failed: ${res.status}`);
    return res.json();
  },
  updateAssignment: async (id, data) => {
    const res = await fetch(`${API_BASE_URL}/assignments/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Update assignment failed: ${res.status}`);
    return res.json();
  },
  createOverrideLog: async (data) => {
    const res = await fetch(`${API_BASE_URL}/override-logs/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Create override log failed: ${res.status}`);
    return res.json();
  },
  // Health check
  healthCheck: () => apiCall("/health"),
};
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    return response.json();
  },

  register: async (username, email, password, role) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    return response.json();
  },

  getRoles: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/roles/`);

    if (!response.ok) {
      throw new Error("Failed to fetch roles");
    }

    return response.json();
  },
};
export default api;
