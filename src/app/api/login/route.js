import { NextResponse } from "next/server";
import { userDB } from "@/app/models/userModel";
import bcrypt from "bcryptjs"
import { createSession } from "@/app/lib/session";


export async function GET(request) {
    return NextResponse.json({ message: 'login' })
}

export async function POST(request) {
    try {
        const { email, password } = await request.json()

        const user_mail = await userDB.findOne({ email: email })

        if (user_mail) {
            
            const passwordCheck = await bcrypt.compare(password, user_mail.password);

            if (passwordCheck) {

                await createSession(user_mail._id)
                return NextResponse.json({ success: true, message: "User logged in successfully", userId: user_mail._id })
            }
            else {
                return NextResponse.json({ success: false, message: "Invalid Password" })
            }
        }
        else {
            return NextResponse.json({ success: false, message: 'User does not exist' })
        }
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}