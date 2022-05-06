import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

import mainPageRoutes from './routes/FrontPage.js';
import userRoutes from './routes/User.js';
import roomRoutes from './routes/Room.js';
import activityRoutes from "./routes/activityRoutes.js"

app.use(bodyParser.json({limit: "30mb", exntended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", exntended: true}));
app.use(cors());

app.use("/", mainPageRoutes);
app.use("/activity", activityRoutes);
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);

// const CONNECTION_URL = "mongodb+srv://RoomAllocationAppDB:RoomAllocationAppDB123@cluster0.wzasi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const CONNECTION_URL = "mongodb+srv://Sahajdb:Sahajdb08@cluster0.ashgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT | 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));


