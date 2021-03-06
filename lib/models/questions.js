const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const QuestionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    test: {
        type: String,
        required: true
    },

});

// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
// var Tank = mongoose.model('Tank', schema);
