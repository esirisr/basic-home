import React, { useState, useEffect } from 'react';
import { fetchStudents } from './services/api';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import './App.css';
function App() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadData = async () => {
        setLoading(true);
        try { const res = await fetchStudents(); setStudents(res.data); } 
        catch (err) { console.error(err); } 
        finally { setLoading(false); }
    };
    useEffect(() => { loadData(); }, []);
    return (
        <div className="container">
            <h1>Student Management</h1>
            <AddStudentForm onRefresh={loadData} />
            <StudentList students={students} loading={loading} />
        </div>
    );
}
export default App;