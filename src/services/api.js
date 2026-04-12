import axios from 'axios';

const api = axios.create({
// API base URL for MockAPI
baseURL: 'https://69d6bbd61c120e733cce8619.mockapi.io', 
});

export default api;