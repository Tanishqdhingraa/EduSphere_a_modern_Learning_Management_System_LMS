import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


export async function Connectionofdb() {
    try {
        mongoose.connect(process.env.mongo_url)
        .then(()=>console.log("😎  Databse is connected"))
    } catch (error) {
        console.log(` Any error occured udring db connection `);
    }
}