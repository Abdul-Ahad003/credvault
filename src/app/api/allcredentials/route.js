import { NextResponse } from "next/server";
import { userDB } from "@/app/models/userModel";
import { credentialModel } from "@/app/models/credentialModel";


export async function GET(request){
    return NextResponse.json({message:'allcredentials'})
}

export async function POST(request) {
    try {
        const {userId} =  await request.json()

        const user = await userDB.findById(userId)

        if (user) {

            let allCredential = await credentialModel.find({uploadedby: userId})

            return NextResponse.json({success: true, message: 'Credentails saved successfully', allCredential: allCredential})
        } 
        else {
            return NextResponse.json({message:"User does not exists"})
        }
    } catch (error) {
        return NextResponse.json({message:'not possible'})
    }
}