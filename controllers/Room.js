import { Room } from "../models/Room.js";
import { infoLogger } from "../logger.js";
import { errorLogger } from "../logger.js";

export const roomList = async (req,res) => {
	infoLogger.info("Request GET /rooms/list");
	try {
		const roomdata = await Room.find();
		infoLogger.info("Request GET /rooms/list status 200 OK");
		res.status(201).json(roomdata);
	} catch (error) {
		errorLogger.error(`Request GET /rooms/list failed with status code 401: ${error.message}`);
		res.status(401).json(error);
	}
};

export const editRoom = async (req,res) => {
	infoLogger.info("Request POST /rooms/edit/:id");
	try {
		const {id} = req.params;

		const room = await Room.findById({_id:id});
		infoLogger.info("Request POST /rooms/edit/:id status 201 OK");
		res.status(201).json(room);

	} catch (error) {
		errorLogger.error(`Request POST /rooms/edit/:id failed with status code 401: ${error.message}`);
		res.status(401).json(error);
	}
};

export const updateRoom = async (req,res) => {
	infoLogger.info("Request PATCH /rooms/update/:id");
	try {
		const {id} = req.params;
		const roomExists = await Room.findOne(req.body);
		if (roomExists) {
			errorLogger.error("Request PATCH /rooms/update/:id failed with status code 401: Room Already Exists.");
			res.status(401).send("Room already Exists.");
			// throw new Error('Room already exists')
		}
		else{
			const updatedRoom = await Room.findByIdAndUpdate(id,req.body,{new:true});
			infoLogger.info("Request POST /rooms/update/:id Status 201 OK");
			res.status(201).json(updatedRoom);
		}
	} catch (error) {
		errorLogger.error(`Update failed with status code 401: ${error.message}`);
		res.status(401).json(error);
	}
};

export const getRoom = async (req, res) => {
	infoLogger.info("Request GET /rooms/");
	try {
		const rooms = await Room.find();
		infoLogger.info("Request GET /rooms/ Status 201 OK");
		res.status(200).json(rooms);
	}
	catch(error) {
		errorLogger.error(`Request GET /rooms/ failed with status code 401: ${error.message}`);
		res.status(401).json(error.message);
	}
};

export const addRoom = async (req, res) => {
	infoLogger.info("Request POST /rooms/add");
	const roomNumber = req.body.roomNumber;

	if(!roomNumber){
		res.status(401).send("Please add value");
	}

	const roomExists = await Room.findOne(req.body);
	if (roomExists) {
		errorLogger.error("Request POST /rooms/add failed: Room already Exists.");
		return res.status(401).send("Room already Exists");
	}

	const newRoom = new Room(req.body);

	newRoom.save()
		.then(() => {
			infoLogger.info("Request POST /rooms/add Status 201 OK");
			res.status(201).json(newRoom);
		})
		.catch(err => {
			errorLogger.error(`Request POST /rooms/add failed with status code 400: ${err.message}`);
			res.status(400).json(err.message);
		});
};

export const deleteRoom = async (req, res) => {
	infoLogger.info("Request DELETE /rooms/delete/:id");
	try {
		const {id} = req.params;
		const deletedRoom = await Room.findByIdAndDelete({_id:id});
		infoLogger.info("Request DELETE /rooms/delete/:id Status 201 OK");
		res.status(201).json(deletedRoom);

	} catch (error) {
		errorLogger.error(`Request DELETE /rooms/delete/:id failed with status code 401: ${error.message}`);
		res.status(401).json(error);
	}
};