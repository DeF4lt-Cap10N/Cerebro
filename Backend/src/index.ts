import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"


import express from "express"
const app = express();
app.use(express.json());

import { userModel } from "./db"



app.post("/api/v1/signup", async (req, res) => {
    const { username, userpassword } = req.body;

    const duplicateUser = await userModel.findOne({
        username: username
    })

    const hashPassword = await bcrypt.hash(userpassword, 5);
    console.log(hashPassword);

    if (duplicateUser) {
        res.json({
            message: "User already signup"
        })
        return;
    }

    try {
        await userModel.create({
            username: username,
            userpassword: hashPassword,
        })
        res.json({
            message:"user Signup successfuly!!"
        })
    } catch (err) {
        res.status(400).json({
            message: `user signup issue : ${err}`
        })
    }
})

app.post("/api/v1/sigin", (req, res) => {

})



app.post("/api/v1/content", (req, res) => {

})

app.get("/api/v1/content", (req, res) => {

})

app.delete("/api/v1/content", (req, res) => {

})

app.delete("/api/v1/brain/share", (req, res) => {

})

app.delete("/api/v1/brain/:shareLink", (req, res) => {

})



async function main() {
    if (!process.env.MONGODBURI) {
        console.log("db not connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODBURI)
            .then(() => {
                console.log("db connected!!");
            })
    }
    catch (err) {
        console.log("db not connected : " + err);
    }

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`app listen in ${port}`);
    })

}

main();

