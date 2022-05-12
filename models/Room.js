import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
	roomNumber: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 3
	},
});

export const Room = mongoose.model("Room", roomSchema);
// export default room;