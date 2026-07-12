import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(req) {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ publishedAt: -1 }).lean();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Check for existing slug
    const existing = await Blog.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ success: false, message: "Slug already exists" }, { status: 400 });
    }

    const blog = await Blog.create(body);
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
