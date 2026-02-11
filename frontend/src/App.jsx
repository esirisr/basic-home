import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');

  const fetchUsers = async () => {
    const res = await axios.get('/api/students');
    setStudents(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Railway MERN Demo</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <button onClick={async () => { await axios.post('/api/students', { name, grade: 'A' }); setName(''); fetchUsers(); }}>Add</button>
      <ul>{students.map(s => <li key={s._id}>{s.name}</li>)}</ul>
    </div>
  );
}
export default App;