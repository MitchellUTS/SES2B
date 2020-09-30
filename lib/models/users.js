const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const UserSchema = mongoose.Schema({
    sub: {
        type: String,
        required: true,
    },

    userType:{
        type : String,
        required: true,
    },

    userName:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
    }
});

// module.exports = mongoose.model('Users', UserSchema);

// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
// var Tank = mongoose.model('Tank', schema);// // a);
