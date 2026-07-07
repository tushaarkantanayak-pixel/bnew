import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Link from "next/link";
import { FiChevronLeft, FiClock, FiUser, FiShare2 } from "react-icons/fi";

// Revalidate this page every 1 hour (3600 seconds)
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  await connectDB();
  const blog = await Blog.findOne({ slug });

  if (!blog) return { title: "Blog Not Found" };

  return {
    title: blog.metaTitle || `${blog.title} - BlueBuff`,
    description: blog.metaDescription || blog.excerpt || blog.title,
    keywords: blog.metaKeywords ? blog.metaKeywords.split(',').map(k => k.trim()) : blog.tags || [],
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt || blog.title,
      images: [blog.image],
    },
  };
}

export default async function BlogDetail({ params }) {
  const { game, slug } = await params;

  await connectDB();
  const blog = await Blog.findOne({ slug, game });

  if (!blog) {
    notFound();
  }

  const authorInitials = blog.author ? blog.author.substring(0, 2).toUpperCase() : "BB";
  
  // Format dates
  const pubDate = new Date(blog.publishedAt);
  const formattedDate = pubDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[var(--background)] pb-24 px-6 pt-10">
      <article className="max-w-7xl mx-auto">
        
        {/* Breadcrumb / Back button */}
        <Link 
          href={`/blog/${game}`}
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-8"
        >
          <FiChevronLeft size={14} /> Back to {game} news
        </Link>

        {/* Header */}
        <header className="mb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[var(--accent)] text-black text-[9px] font-black uppercase tracking-widest">
              {blog.type}
            </span>
            {blog.tags && blog.tags.length > 0 && blog.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-md border border-[var(--border)] text-[var(--muted)] text-[9px] font-black uppercase tracking-widest">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-[1000] tracking-tight text-[var(--foreground)] leading-none">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-base md:text-xl text-[var(--muted)] font-medium leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center justify-between py-6 border-y border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center text-xs font-bold shrink-0">
                {authorInitials}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[var(--foreground)]">{blog.author || "BlueBuff Admin"}</span>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                  <FiClock size={10} /> {formattedDate}
                </div>
              </div>
            </div>

            <button className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
              <FiShare2 size={16} />
            </button>
          </div>
        </header>

        {/* Cover Image */}
        {blog.image && (
          <figure className="mb-12 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] aspect-[21/9]">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </figure>
        )}

        {/* Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none 
          prose-headings:font-black prose-headings:tracking-tight prose-headings:text-[var(--foreground)]
          prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:border prose-img:border-[var(--border)]
          text-[var(--muted)]"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

      </article>
    </main>
  );
}
