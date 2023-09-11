import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const { currentUser } = await serverAuth(req, res);
        return NextResponse.json(currentUser, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: `Something went wrong: ${error}` }, { status: 500 })
    }
} 