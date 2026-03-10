// frontend/src/services/api.service.js

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.csrfToken = null;
  }

  // Fetch CSRF token from backend with retry logic
  async fetchCSRFToken(retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(
          `${this.baseURL.replace("/api/v1", "")}/csrf-token`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.ok) {
          const data = await response.json();
          this.csrfToken = data.csrfToken;
          return this.csrfToken;
        } else if (response.status === 429 && i < retries - 1) {
          // Rate limited - wait and retry
          console.warn(
            `Rate limited. Retrying in ${delay}ms... (${i + 1}/${retries})`,
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
          continue;
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error("CSRF token fetch failed:", response.status, errorData);
          throw new Error(
            errorData.message ||
              `Failed to fetch CSRF token: ${response.status}`,
          );
        }
      } catch (error) {
        if (i === retries - 1) {
          console.error("CSRF Token fetch error:", error);
          throw error;
        }
        // Wait before retry on network error
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(this.csrfToken && { "X-CSRF-Token": this.csrfToken }),
        ...options.headers,
      },
      credentials: "include", // Important for cookies
    };

    try {
      const response = await fetch(url, config);

      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401) {
        // Try to refresh the token
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the original request
          return await fetch(url, config).then((r) => this.handleResponse(r));
        } else {
          // Redirect to login
          window.location.href = "/login";
          throw new Error("Session expired. Please login again.");
        }
      }

      return this.handleResponse(response);
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  async handleResponse(response) {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(
        data.error || data.message || "API request failed",
      );
      error.response = { data, status: response.status };
      throw error;
    }

    return { data, status: response.status };
  }

  async refreshToken() {
    try {
      const response = await fetch(`${this.baseURL}/auth/refreshToken`, {
        method: "GET",
        credentials: "include",
      });
      return response.ok;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "GET",
    });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "DELETE",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // File upload with multipart/form-data
  async uploadFile(endpoint, formData, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      headers: {
        // Don't set Content-Type, let browser set it with boundary
        ...options.headers,
      },
      body: formData,
    });
  }
}

export const apiService = new APIService();
export default apiService;
