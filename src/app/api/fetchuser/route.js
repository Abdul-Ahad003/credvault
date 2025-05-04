import { NextResponse } from "next/server";
import { userDB } from "@/app/models/userModel";


export async function GET(request) {
    return NextResponse.json({ message: 'fetchuser' })
}

export async function POST(request) {
    try {
        const { userId } = await request.json()

        const user = await userDB.findById(userId)

        if (user) {
            return NextResponse.json({ success: true, message: "User ", username: user.name })
        }
        else {
            return NextResponse.json({ success: false, message: 'User does not exist' })
        }
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}