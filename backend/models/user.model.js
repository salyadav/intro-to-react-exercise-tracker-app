const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { //only one attribute - followed by flags accepted by mongoose to set up the schema
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;