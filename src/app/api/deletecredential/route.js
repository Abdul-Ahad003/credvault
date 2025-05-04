import { NextResponse } from "next/server";
import { userDB } from "@/app/models/userModel";
import { credentialModel } from "@/app/models/credentialModel";


export async function GET(request){
    return NextResponse.json({message:'deletecredential'})
}

export async function DELETE(request) {
    try {
        const {userId, Id} =  await request.json()

        const user = await userDB.findById(userId)

        if (user) {

            await credentialModel.deleteOne({_id: Id})

            return NextResponse.json({success: true, message: 'Deleted successfully'})
        } 
        else {
            return NextResponse.json({message:"User does not exists"})
        }
    } catch (error) {
        return NextResponse.json({message:'not possible'})
    }
}