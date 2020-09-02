import { QuestionSchema } from './questions';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const TestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    questions: {
        type: [QuestionSchema],
        required: true
    }
});
