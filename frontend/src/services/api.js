import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
export const fetchStudents = () => API.get('/students');
export const createStudent = (data) => API.post('/students', data);