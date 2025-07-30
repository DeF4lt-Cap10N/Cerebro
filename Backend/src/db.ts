import mongoose, { model, Model, Mongoose, Schema } from "mongoose";


const UserSchema = new Schema({
    username: {type: String, unique:true },
    password: String
})


export const userModel =  mongoose.model("Users", UserSchema);