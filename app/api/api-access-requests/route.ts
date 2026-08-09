import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ApiAccessRequest from '@/models/ApiAccessRequest';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    await connectDB();

    const headerList = await headers();
    const token = headerList.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    } catch (err) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const { name, number, monthlySell, games, email } = body;

    if (!name || !number || !monthlySell || !games || !email) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    // Check if a pending request already exists for this user
    const existingRequest = await ApiAccessRequest.findOne({ userId: decoded.userId, status: 'pending' });
    if (existingRequest) {
      return NextResponse.json({ success: false, message: 'You already have a pending request.' }, { status: 400 });
    }

    const newRequest = await ApiAccessRequest.create({
      userId: decoded.userId,
      email,
      name,
      number,
      monthlySell,
      games,
    });

    return NextResponse.json({ success: true, message: 'Request submitted successfully!', data: newRequest });
  } catch (error: any) {
    console.error('Error creating API access request:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
