const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] },
    age: { type: Number, required: true, min: 10, max: 100 },
    grade: { type: String, required: true, enum: ['A', 'B', 'C', 'D', 'F'] },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('student', StudentSchema);