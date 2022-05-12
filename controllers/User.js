import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorLogger, infoLogger } from "../logger.js";

dotenv.config();

export const userList = async (req,res) => {
	infoLogger.info("Request GET /users/list");
	try {
		const userdata = await User.find();
		infoLogger.info("Request GET /users/list Status 200 OK");
		res.status(200).json(userdata);
	} catch (error) {
		errorLogger.error(`Request GET /users/list failed: ${error.message}`);
		res.status(401).json(error);
	}
};

export const editUser = async (req,res) => {
	infoLogger.info("Request POST /users/edit/:id");
	try {
		const {id} = req.params;
		const user = await User.findById({_id:id});
		infoLogger.info("Request POST /users/edit/:id Status 201 OK");
		res.status(201).json(user);

	} catch (error) {
		errorLogger.error(`Request POST /users/edit/:id failed: ${error.message}`);
		res.status(401).json(error);
	}
};

export const updateUser = async (req,res) => {
	infoLogger.info("Request POST /users/update/:id");
	try {
		const {id} = req.params;

		const userExist = await User.findOne({ usermail:req.body.usermail });
		if(userExist){
			errorLogger.error("Request POST /users/update/:id failed: User already exists with given email");
			res.status(401).send("User already exists with given email");
		}
		else{
			const updatedUser = await User.findByIdAndUpdate(id,req.body,{new:true});
			infoLogger.info("Request POST /users/update/:id Status 201 OK");
			res.status(201).json(updatedUser);
		}

	} catch (error) {
		errorLogger.error(`Request POST /users/update/:id failed: ${error.message}`);
		res.status(401).json(error);
	}
};

export const getUser = async (req, res) => {
	infoLogger.info("Request GET /users/");
	let token;

	if ( req.header("Authorization") ) {
		try {
			token = req.header("Authorization");
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			let userdata = await User.findById(decoded.id);
			infoLogger.info("Request GET /users/ Status 201 OK");
			res.status(201).send({user:userdata});
		} catch (error) {
			errorLogger.error(`Request GET /users/ failed: ${error.message}`);
			res.status(401);
		}
	}
	else {
		errorLogger.error("Request POST /users/edit/:id failed: No Token");
		res.status(401).send("No token!");
	}
};

export const addUser = async (req, res) => {
	infoLogger.info("Request POST /users/add");
	const username = req.body.username;
	const usermail = req.body.usermail;
	const password = req.body.password;
    
	if (!username || !usermail || !password) {
		errorLogger.error("Request POST /users/add failed with status 401: Incomplete params.");
		res.status(401);
	}
    
	// Check if user exists
	const userExists = await User.findOne({ usermail:usermail });
	if (userExists) {
		errorLogger.error("Request POST /users/add failed with status 401: User already exists.");
		return res.status(401).send("User already exists.");
		// throw new Error('User already exists')
	}
    
	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
    
	const user = req.body;
	user.password = hashedPassword;
	const newUser = new User(user);
	newUser.save()
		.then(() => {
			infoLogger.info("Request POST /users/add Status 201 OK");
			res.status(201).send({msg:"User added!",newUser});
		})
		.catch(err => {
			errorLogger.error(`Request POST /users/add failed with status 401: ${err.message}`);
			res.status(401).send("Error: " + err.message);
		});
};

export const deleteUser = async (req, res) => {
	infoLogger.info("Request DELETE /users/delete/:id");
	try {
		const {id} = req.params;
		const deletedUser = await User.findByIdAndDelete({_id:id});
		infoLogger.info("Request POST /users/delete/:id Status 201 OK");
		res.status(201).json(deletedUser);

	} catch (error) {
		errorLogger.error(`Request POST /users/delete/:id failed with status 401: ${error.message}`);
		res.status(401).json(error);
	}
};

export const loginUser = async (req, res) => {
	infoLogger.info("Request POST /users/login");
	const { username, usermail, password } = req.body;
  
	// Check for user email
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash("Sahaj", salt);
	const user = await User.findOne({ usermail:usermail });
	if (user && (await bcrypt.compare(password, user.password))) {
		const payload = { id: user._id };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		res.send({
			_id: user.id,
			username: user.username,
			useremail: user.useremail,
			token: token,
		});
	} else {
		errorLogger.error("Request POST /users/login failed with status 401: No User found");
		res.status(401).send("No user found");
	}
};
