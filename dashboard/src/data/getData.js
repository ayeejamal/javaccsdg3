import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:8082';

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    console.error('Server responded with an error:', error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error setting up the request:', error.message);
  }
  throw error;
};

const GetData = {
  // Get all products
  async getAllProducts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get single product by ID
  async getProduct(id) {
    if (!id) {
      throw new Error('Product ID is required');
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get website texts
  async getWebsiteTexts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/website-texts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get website images
  async getWebsiteImages() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/WebsiteImage`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get website gallery
  async getWebsiteGallery() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Gallery`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get website testimonies
  async getWebsiteTestemonies() {
    try {
      const response = await axios.get(`${API_BASE_URL}/view_teams_admin_edit`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get website teams
  async getWebsiteTeams() {
    try {
      const response = await axios.get(`${API_BASE_URL}/view_teams_admin_edit`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default GetData;