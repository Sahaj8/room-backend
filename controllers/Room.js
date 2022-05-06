import { Room } from "../models/Room.js"

export const roomList = async (req,res) => {
    try {
        const roomdata = await Room.find();
        res.status(201).json(roomdata)
        console.log(roomdata);
    } catch (error) {
        res.status(401).json(error);
    }
}

export const editRoom = async (req,res) => {
    try {
        console.log(req.params);
        const {id} = req.params;

        const room = await Room.findById({_id:id});
        console.log(room);
        res.status(201).json(room)

    } catch (error) {
        res.status(401).json(error);
    }
}

export const updateRoom = async (req,res) => {
    try {
        const {id} = req.params;
        const roomExists = await Room.findOne(req.body)
        console.log(roomExists);
        if (roomExists) {
            res.status(401).send("Room already Exists");
            // throw new Error('Room already exists')
        }
        else{
            const updatedRoom = await Room.findByIdAndUpdate(id,req.body,{new:true});
    
            console.log(updatedRoom);
            res.status(201).json(updatedRoom);
        }

    } catch (error) {
        res.status(401).json(error);
    }
}

export const getRoom = async (req, res) => {
    try {
        const rooms = await Room.find();
        console.log(rooms);
        res.status(200).json(rooms);
    }
    catch(error) {
        console.log({message: error.message});
    }
}

export const addRoom = async (req, res) => {
    // res.send('It works');
    const roomNumber = req.body.roomNumber;
    // const size = req.body.size;
    // const description = req.body.description;

    if(!roomNumber){
        res.status(401).send("Please add value");
        // throw new Error('Please add value')
    }

    const roomExists = await Room.findOne(req.body)
    console.log(roomExists);
    if (roomExists) {
        return res.status(401).send("Room already exists")
        // throw new Error('Room already exists')
    }

    // const newRoom = new room({roomNumber,size,description});
    const newRoom = new Room(req.body);

    newRoom.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err.message));
}

export const deleteRoom = async (req, res) => {
    // res.send('It works');
    try {
        const {id} = req.params;
        const deletedRoom = await Room.findByIdAndDelete({_id:id})
        console.log(deletedRoom);
        res.status(201).json(deletedRoom);

    } catch (error) {
        res.status(401).json(error);
    }
}