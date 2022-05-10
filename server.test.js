import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import app from "./server.js"
const request = require('supertest');
import {User} from "./models/User";
import {Room} from "./models/Room";
import Activity from "./models/Activity.js";
console.log(app);


// Tested
// describe("Get /activity", () => {
//     test("Status Code should be 200 and type should be json list", async () => {
//         const response = await request(app).get("/activity");
//         console.log(response);
//         expect(response.statusCode).toBe(200);
//         expect(response.type).toBe("application/json");
//     })
// })

// Tested
describe("POST /activity/add", () => {
    describe("Given a applicant, activity, roomNumber, status",  () => {
        test("Should be status Code = 201", async () => {
            const response = await request(app).post("/activity/add").send({
                applicant: "Applicant Name",
                activity: "Test Activity",
                roomNumber: "A204",
                status: "Pending",
                createdAt: new Date()
            });
            console.log(response);
            expect(response.type).toBe("application/json");
            expect(response.statusCode).toBe(201);
        })
    })  
})

describe("DELETE /activity/delete/:id", () => {
    test("Should be status Code 201", async () => {
        const activity = await Activity.findOne({applicant: "Applicant Name"});
        const id = activity._id;
        const response = await request(app).delete(`/activity/delete/${id}`);
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toBe(201);
    })
})

// Testing User Model and Functions

//Tested
describe("Get /users/list", () => {
    test("Status Code should be 200 and type should be json list", async () => {
        const response = await request(app).get("/users/list");
        // console.log(response);
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
    })
})

// Tested
describe("Post /users/add", () => {
    test("Status Code should be 201 and type should be json list", async () => {
        const response = await request(app).post("/users/add").send({
            username: "Test User",
            usermail: "testuser@email.com",
            password: "testPassword",
            description: "Admin",
            isAdmin: true,
            createdAt: new Date()
        })
        // console.log(response)
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('application/json');
    })
})

// Tested
describe("POST /users/login", () => {
    test("Status Code should be 200 and type should be json list", async () => {
        const response = await request(app).post("/users/login").send({
            username: "Test User",
            usermail: "testuser@email.com",
            password: "testPassword",
        })
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    })
    test("Status Code should be 401 and type should be html text", async () => {
        const response = await request(app).post("/users/login").send({
            username: "Test User",
            usermail: "testuser@email.com",
            password: "test Password",
        })
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe('text/html');
    })
})

describe("UPDATE /users/update/:id", () => {
    test("Should be status Code 201", async () => {
        const users = await User.findOne({username: "Test User"});
        const id = users._id;
        const response = await request(app).patch(`/users/update/${id}`).send({
            username: "Test User Updated",
            usermail: "testuserUpdated@email.com",
            password: "testPassword",
        })
        expect(response.statusCode).toBe(201);
    })
})

// Tested
describe("DELETE /users/delete/:id", () => {
    test("Should be status Code 201", async () => {
        const user = await User.findOne({username: "Test User Updated"});
        const id = user._id;
        const response = await request(app).delete(`/users/delete/${id}`);
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toBe(201);
    })
})

// Testing Room Model and Functions

// Tested
describe("Get /rooms", () => {
    test("Status Code should be 200 and type should be json list", async () => {
        const response = await request(app).get("/rooms");
        console.log(response);
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
    })
})

// Tested
describe("POST /rooms/add", () => {
    describe("Given a room Number",  () => {
        test("Should be status Code = 201", async () => {
            const response = await request(app).post("/rooms/add").send({
                roomNumber: "TestRoom"
            });
            // console.log(response);
            expect(response.type).toBe("application/json");
            expect(response.statusCode).toBe(201);
        })
        test("Should be status Code = 401", async () => {
            const response = await request(app).post("/rooms/add").send({
                roomNumber: "TestRoom"
            });
            // console.log(response);
            expect(response.type).toBe("text/html");
            expect(response.statusCode).toBe(401);
        })
    })  
})

// Tested
describe("UPDATE /room/update/:id", () => {
    test("Should be status Code 201", async () => {
        const room = await Room.findOne({roomNumber: "TestRoom"});
        const id = room._id;
        const response = await request(app).patch(`/rooms/update/${id}`).send({
            roomNumber: "Test Room"
        })
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toBe(201);
    })
})

// Tested
describe("DELETE /rooms/delete/:id", () => {
    test("Should be status Code 201", async () => {
        const room = await Room.findOne({roomNumber: "Test Room"});
        const id = room._id
        const response = await request(app).delete(`/rooms/delete/${id}`)
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toBe(201);
    })
})