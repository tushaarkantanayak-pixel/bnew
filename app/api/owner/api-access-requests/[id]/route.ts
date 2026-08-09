import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ApiAccessRequest from '@/models/ApiAccessRequest';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const body = await req.json();
    const { status } = body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    const request = await ApiAccessRequest.findByIdAndUpdate(id, { status }, { new: true });

    if (!request) {
      return NextResponse.json({ success: false, message: 'Request not found' }, { status: 404 });
    }

    // Optional: If approved, we could upgrade the user to member.
    // For now, let's do this if status is approved.
    if (status === 'approved') {
      await User.findOneAndUpdate({ userId: request.userId }, { userType: 'member' });
    }

    return NextResponse.json({ success: true, message: `Request ${status} successfully!`, data: request });
  } catch (error: any) {
    console.error('Error updating API access request:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
