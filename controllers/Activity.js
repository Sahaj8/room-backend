import Activity from "../models/Activity.js";
import { infoLogger } from '../logger.js';
import { errorLogger } from '../logger.js';

export const getActivityList = async (req, res) => {
    infoLogger.info("Request GET /activity/");
    try {
        const activities = await Activity.find();
        console.log(activities);
        infoLogger.info("Request GET /activity/ Status code 200 OK");
        res.status(200).json(activities);
    }
    catch(error) {
        errorLogger.error(`Request GET /activity/ failed with status code 401: ${error.message}`)
        console.log({message: error.message});
        res.status(401).json(error.message);
    }
}

export const addActivity = async (req, res) => {
    infoLogger.info("Request POST /activity/add");
    const newActivityData = req.body;

    const newActivity = new Activity(newActivityData);
    try {
        await newActivity.save();
        infoLogger.info("Request POST /activity/add Status code 201 OK");
        res.status(201).json(newActivity);
    }
    catch (error) {
        errorLogger.error(`Request POST /activity/add failed with staus code 401: ${error.message}`)
        res.status(401).json({message: error.message});
    }
}

export const updateActivity = async (req,res) => {
    infoLogger.info("Request POST /activity/update:id");
    try {
        const {id} = req.params;

        const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, {new:true});

        console.log(updatedActivity);
        infoLogger.info("Request POST /activity/update/:id Status code 201 OK");
        res.status(201).json(updatedActivity);

    } catch (error) {
        errorLogger.error(`Request POST /activity/update:id failed with status code 401: ${error.message}`)
        res.status(401).json(error);
    }
}

export const deleteActivity = async (req, res) => {
    infoLogger.info("Request DELETE /activity/delete:id");
    try {
        const {id} = req.params;
        const deletedActivity = await Activity.findByIdAndDelete({_id:id})
        console.log(deletedActivity);
        infoLogger.info("Request DELETE /activity/delete/:id Status code 201 OK");
        res.status(201).json(deletedActivity);

    } catch (error) {
        errorLogger.error(`Request DELETE /activity/delete:id failed wtih status code 401: ${error.message}`)
        res.status(401).json(error);
    }
}