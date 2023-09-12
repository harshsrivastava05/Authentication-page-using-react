const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    username: { type: 'string', required: true, minlength: 3, maxlength: 20, unique: true },
    email: { type: 'string', required: true, minlength: 3, maxlength: 200, unique: true },
    password: { type: 'string', required: true, minlength: 3, maxlength: 1024 }
}, {
    timestamps: true
});

const user = mongoose.model("user", userschema);

module.exports = user;