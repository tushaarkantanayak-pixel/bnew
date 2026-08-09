import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ApiAccessRequest from '@/models/ApiAccessRequest';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

export async function GET(req: Request) {
  try {
    await connectDB();

    const headerList = await headers();
    const token = headerList.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    if (decoded.userType !== 'owner') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const requests = await ApiAccessRequest.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: requests });
  } catch (error: any) {
    console.error('Error fetching API access requests:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
