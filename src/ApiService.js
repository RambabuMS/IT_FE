// Create a service for API requests
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const ApiService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBike: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bikes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  selectBike: async (username, bikeId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/select-bike`, { username, bikeId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProductionRecords: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bike-data`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiService;
