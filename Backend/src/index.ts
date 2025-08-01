import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"


import express from "express"
const app = express();
app.use(express.json());

import { userModel, ContentModel } from "./db"
import { userMiddleware } from './middleware';



app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;

    const duplicateUser = await userModel.findOne({
        username: username
    })

    const hashPassword = await bcrypt.hash(password, 5);
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
            password: hashPassword,
        })
        res.json({
            message: "user Signup successfuly!!"
        })
    }
    catch (err) {
        res.status(400).json({
            message: `user signup issue : ${err}`
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;

    const findUser = await userModel.findOne({
        username
    })

    if (!findUser) {
        res.status(403).json({
            message: "User Not Found!!"
        })
        return;
    }

    if (!findUser.password) {
        throw new Error("User password is not set");
    }

    const matchPass = await bcrypt.compare(password, findUser.password);

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in env");
    }

    if (matchPass) {
        const token = jwt.sign({
            id: findUser._id.toString()
        }, process.env.JWT_SECRET)

        res.status(201).json({
            token: token,
            message: "token genreted successfully!"
        })
    }
    else {
        res.json({
            messsage: "sorry password Not Matched!"
        })
    }


})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, title } = req.body;

    await ContentModel.create({
        link,
        title,
        // @ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "content Created"
    })



})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;

    const content = await ContentModel.find({
        userId
    })

    if (content) {
        res.json({
            content
        })
    }
    else {
        res.json({
            message: "content is empty"
        })
    }
})

app.delete("/api/v1/content/:id", async (req, res) => {
    //@ts-ignore
    const userId =req.userId;
    //@ts-ignore
    const _id = new mongoose.Types.ObjectId(req.params.id);


    const contentDelete = await ContentModel.deleteOne({
        _id
    })

    if (contentDelete.deletedCount>0) {
        res.json({
            message: "content Delete",
            _id
        })
    }
    else {
        res.json({
            message: "sorry content is not available",
            _id
        })
    }
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

