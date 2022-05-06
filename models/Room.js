import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    // To Do: Add schema related to cards that display current activities on the front page.
    roomNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    // size: Number,
    // description: String,
});

export const Room = mongoose.model('Room', roomSchema);
// export default room;