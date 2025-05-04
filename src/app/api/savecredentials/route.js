import { NextResponse } from "next/server";
import { userDB } from "@/app/models/userModel";
import { credentialModel } from "@/app/models/credentialModel";


export async function GET(request){
    return NextResponse.json({message:'savecredentials'})
}

export async function POST(request) {
    try {
        const {form, userId} =  await request.json()

        const user = await userDB.findById(userId)

        if (user) {

            let credential = await credentialModel.create({
                site: form.site,
                username: form.username,
                password: form.password,
                uploadedby: userId,
            })

            return NextResponse.json({success: true, message: 'Credentails saved successfully', credentialID: credential._id})
        } 
        else {
            return NextResponse.json({message:"User does not exists"})
        }
    } catch (error) {
        return NextResponse.json({message:'not possible'})
    }
}