import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect(process.env.Mongo_Connection_String)

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, 
});


export const userDB = mongoose.models.User || mongoose.model('User',userSchema)