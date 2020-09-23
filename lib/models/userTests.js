const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const UserTestSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    testID: {
        type: String,
        required: true
    },
    testResult: {
        type: Number,
        required: true,
        default: 1
    }
});
