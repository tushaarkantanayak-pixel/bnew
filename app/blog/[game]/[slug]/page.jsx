import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Link from "next/link";
import { FiChevronLeft, FiClock, FiUser, FiShare2, FiGift, FiArrowRight } from "react-icons/fi";
import AdsterraBanner from "@/components/Ads/AdsterraBanner";
import AdsterraSmartlink from "@/components/Ads/AdsterraSmartlink";

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
    <main className="min-h-screen bg-[var(--background)] pb-20 px-4 sm:px-6 pt-3 sm:pt-4">
      <article className="max-w-7xl mx-auto">
        
        {/* Breadcrumb / Back button */}
        <Link 
          href={`/blog/${game}`}
          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-3 sm:mb-4"
        >
          <FiChevronLeft size={14} /> Back to {game} news
        </Link>

        {/* Header */}
        <header className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none flex-nowrap py-0.5">
            <span className="shrink-0 px-2.5 py-1 rounded-md bg-[var(--accent)] text-black text-[9px] font-black uppercase tracking-widest">
              {blog.type}
            </span>
            {blog.tags && blog.tags.length > 0 && blog.tags.map(tag => (
              <span key={tag} className="shrink-0 px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--muted)] text-[9px] font-bold uppercase tracking-wider bg-[var(--foreground)]/[0.02]">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-[1000] tracking-tight text-[var(--foreground)] leading-tight">
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

        {/* Smartlink CTA Block */}
        <div className="mt-16 bg-gradient-to-r from-[var(--accent)]/10 to-transparent p-4 sm:p-5 rounded-2xl border border-[var(--accent)]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
                <h3 className="text-lg font-black italic uppercase tracking-tighter text-[var(--foreground)] mb-1 flex items-center justify-center sm:justify-start gap-2">
                    <FiGift className="text-[var(--accent)]" /> TOPUP NOW
                </h3>
                <p className="text-xs opacity-70 m-0 leading-snug">Support the site and unlock exclusive daily gaming offers.</p>
            </div>
            <AdsterraSmartlink text="TOPUP NOW" />
        </div>

        <div className="w-full flex justify-center my-10">
          <AdsterraBanner />
        </div>

      </article>
    </main>
  );
}
