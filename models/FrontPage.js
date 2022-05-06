import mongoose from 'mongoose';

const activitySchema = mongoose.Schema({
    // To Do: Add schema related to cards that display current activities on the front page.
    title: String,
    message: String,
    applicant: String,
    roomNumber: String, 
    activity: String,
    approved: Boolean,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const activity = mongoose.model('activity', activitySchema);
export default activity;