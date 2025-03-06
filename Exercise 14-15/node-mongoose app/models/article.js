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
        validate: {
            validator: function(v){
                return v.length > 10; // Custom validation
            },
            message: 'Article text must be longer than 10 characters'
        }
    },
    comments: [{
        body: {
            type: String,
            required: [true, 'Comment body is required']
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    tags: {
        type: [String],
        validate: {
            validator: function(v){
                return v && v.length > 0; // The tags array must not be emty
            },
            message: 'There should be at least one tag.'
        }
    }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;