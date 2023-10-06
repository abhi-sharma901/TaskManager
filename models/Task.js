const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schema_task = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        default: 'not started',
    },
    dueDate: {
        type: Date
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User collection for ID that is the ownership
    },
},{
    timestamps: true
});

const Task = mongoose.model('Task', schema_task);

module.exports = Task;
