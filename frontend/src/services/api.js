import axios from 'axios';

// When deployed on the same server, we use a relative path.
// This works for both local development (with a proxy) and production.
const API = axios.create({ baseURL: '/api' });

export const fetchStudents = () => API.get('/students');
export const createStudent = (data) => API.post('/students', data);
