import Activity from "../models/Activity.js";

export const getActivityList = async (req, res) => {
    try {
        const activities = await Activity.find();
        console.log(activities);
        res.status(200).json(activities);
    }
    catch(error) {
        console.log({message: error.message});
    }
}

export const addActivity = async (req, res) => {
    const newActivityData = req.body;

    const newActivity = new Activity(newActivityData);
    try {
        await newActivity.save();
        res.status(201).json(newActivity);
    }
    catch (error) {
        res.status(401).json({message: error.message});
    }
}

export const updateActivity = async (req,res) => {
    try {
        const {id} = req.params;

        const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, {new:true});

        console.log(updatedActivity);
        res.status(201).json(updatedActivity);

    } catch (error) {
        res.status(401).json(error);
    }
}

export const deleteActivity = async (req, res) => {
    // res.send('It works');
    try {
        const {id} = req.params;
        const deletedActivity = await Activity.findByIdAndDelete({_id:id})
        console.log(deletedActivity);
        res.status(201).json(deletedActivity);

    } catch (error) {
        res.status(401).json(error);
    }
}