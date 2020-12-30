const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 40
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 30
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 30
    },
    address: {
        type: String,
        trim: true,
        required: true,
        maxlength: 60
    },
    phoneNumber: {
        type: Number,
        required: true,
        maxlength: 10
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})