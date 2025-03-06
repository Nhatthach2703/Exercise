const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title is required'], // Value-level validation
        minleght: [5, 'Title must be at least 5 characters long'], // String-level validation
        trim: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Article date is required']
    },
    text: {
        type: String,
        required: [true, 'Article text is required'],
        val
    }