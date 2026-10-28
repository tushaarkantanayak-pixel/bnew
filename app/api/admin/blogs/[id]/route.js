import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findById(id).lean();
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
