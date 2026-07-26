import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectDB();
    // Only return published blogs to the frontend
    const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 }).lean();
    
    // Map them to match the structure of static BLOGS_DATA
    const formattedBlogs = blogs.map(blog => ({
      id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      game: blog.game,
      type: blog.type,
      author: blog.author,
      image: blog.image,
      excerpt: blog.excerpt,
      tags: blog.tags,
      publishedAt: blog.publishedAt.toISOString(),
      content: blog.content, // Include content for individual post pages
      isDbBlog: true, // Flag to identify it as a dynamic blog
    }));

    return NextResponse.json({ success: true, data: formattedBlogs });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
