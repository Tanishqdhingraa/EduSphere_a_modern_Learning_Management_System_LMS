import mongoose from "mongoose";
import logger from "./Logger.js";
import dotenv from 'dotenv'
dotenv.config()


export async function Connectionofdb() {
    try {
        mongoose.connect(process.env.mongo_url)
        .then(()=>logger.info("😎  Databse is connected"))
    } catch (error) {
        console.log(` Any error occured udring db connection `);
    }
}