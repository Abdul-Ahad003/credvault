import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect(process.env.Mongo_Connection_String)

const credentialSchema = new mongoose.Schema({
    site: String,
    username: String,
    password: String,
    uploadedby: String
});


export const credentialModel = mongoose.models.credential || mongoose.model('credential',credentialSchema)