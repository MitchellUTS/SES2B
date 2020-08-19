const mongoose = require('mongoose');
const ObjectId = Schema.ObjectId;

const QuestionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Questions', QuestionSchema);
// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
// var Tank = mongoose.model('Tank', schema);// // a);