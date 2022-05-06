import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { // equal to roll number
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    usermail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    description: String,
    isAdmin: Boolean,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export const User = mongoose.model('User', userSchema);
// module.exports = user;
// export default user;