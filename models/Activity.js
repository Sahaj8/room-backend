import mongoose from 'mongoose';

const activitySchema = mongoose.Schema({
    // To Do: Add schema related to cards that display current activities on the front page.
    applicant: String,
    activity: String,
    roomNumber: String, 
    status: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    startDateTime: {
        type: Date,
        default: new Date()
    },
    endDateTime: {
        type: Date,
        default: new Date()
    }
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;