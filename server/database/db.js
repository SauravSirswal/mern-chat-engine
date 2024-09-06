import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD =encodeURIComponent(process.env.DB_PASSWORD);

const Connection = async ()=>{
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@clone-whatsapp.t53gq.mongodb.net/?retryWrites=true&w=majority&appName=clone-whatsapp`
    try {
        await mongoose.connect(URL)
        console.log("Database Connected");
        
    } catch (error) {
        console.log('Error while connecting ', error.message);
        
    }
}

export default Connection;