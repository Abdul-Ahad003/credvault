import { NextResponse } from "next/server";
import { userDB } from "@/app/models/userModel";
import bcrypt from "bcryptjs"


export async function GET(request) {
    return NextResponse.json({ message: 'signup' })
}

export async function POST(request) {
    try {
        const { name, email, password } = await request.json()

        const user_mail = await userDB.findOne({ email: email })

        if (user_mail) {
            return NextResponse.json({ message: "user already exists" })
        }
        else {

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            let user = await userDB.create({
                name: name,
                email: email,
                password: hash,
            })

            return NextResponse.json({ success: true, message: 'User registered successfully', userID: user._id })
        }
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}