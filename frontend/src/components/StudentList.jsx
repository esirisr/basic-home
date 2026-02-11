import React from 'react';
const StudentList = ({ students, loading }) => {
    if (loading) return <div>Loading Students...</div>;
    if (students.length === 0) return <p>No students yet</p>;
    return (
        <table className="student-table">
            <thead>
                <tr><th>Name</th><th>Email</th><th>Age</th><th>Grade</th><th>Date</th></tr>
            </thead>
            <tbody>
                {students.map(s => (
                    <tr key={s._id}>
                        <td>{s.name}</td><td>{s.email}</td><td>{s.age}</td><td>{s.grade}</td>
                        <td>{new Date(s.createdAt).toLocaleDateString('en-US')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default StudentList;