import React, { useState } from 'react';
import { createStudent } from '../services/api';
const AddStudentForm = ({ onRefresh }) => {
    const [form, setForm] = useState({ name: '', email: '', age: '', grade: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const validate = (field, value) => {
        let error = "";
        if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) error = "Invalid format";
        if (field === 'age' && (value < 10 || value > 100)) error = "Age 10-100 only";
        setErrors(prev => ({ ...prev, [field]: error }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createStudent(form);
            setForm({ name: '', email: '', age: '', grade: '' });
            onRefresh();
            alert("Success!");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        } finally { setLoading(false); }
    };
    return (
        <form onSubmit={handleSubmit} className="student-form">
            <input placeholder="Name" value={form.name} required onChange={e => setForm({...form, name: e.target.value})} />
            <input placeholder="Email" value={form.email} required onBlur={(e) => validate('email', e.target.value)} onChange={e => setForm({...form, email: e.target.value})} />
            {errors.email && <small style={{color:'red'}}>{errors.email}</small>}
            <input type="number" placeholder="Age" value={form.age} required onBlur={(e) => validate('age', e.target.value)} onChange={e => setForm({...form, age: e.target.value})} />
            {errors.age && <small style={{color:'red'}}>{errors.age}</small>}
            <select value={form.grade} required onChange={e => setForm({...form, grade: e.target.value})}>
                <option value="">Grade</option>
                {['A', 'B', 'C', 'D', 'F'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Submit'}</button>
        </form>
    );
};
export default AddStudentForm;