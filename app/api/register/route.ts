import bcrypt from 'bcrypt';
import prismadb from '@/libs/prismadb';

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const { email, name, password } = await req.json();

        const existingUser = await prismadb.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return NextResponse.json({ message: `An account with email ${email} already exists!` }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        })
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: `Something went wrong: ${error}` }, { status: 500 })
    }
}