import { NextResponse } from "next/server";
import { userDB } from "@/app/models/userModel";
import { deleteSession } from "@/app/lib/session";
import { cookies } from 'next/headers'


export async function GET(request) {
    return NextResponse.json({ message: 'logout' })
}

export async function POST(request) {
    try {
        const { userId } = await request.json()

        const user_mail = await userDB.findById(userId)

        if (user_mail) {

            deleteSession()

            return NextResponse.json({ success: true, message: "Logout successfull"})
        }
        else {
            return NextResponse.json({ success: false, message: 'User does not exist' })
        }
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}