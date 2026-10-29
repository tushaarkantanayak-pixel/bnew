import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Link from "next/link";
import { FiChevronLeft, FiClock, FiUser, FiShare2, FiGift, FiArrowRight } from "react-icons/fi";
import AdsterraBanner from "@/components/Ads/AdsterraBanner";

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

        {/* Play Store App CTA Banner (Compact & Sleek) */}
        <div className="mt-8 p-3 sm:py-2.5 sm:px-4 rounded-xl border border-[var(--border)] bg-[var(--card)]/50 hover:bg-[var(--card)] flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 transition-all">
          <div className="flex items-center gap-2.5 text-center sm:text-left min-w-0">
            <span className="text-base sm:text-lg shrink-0">🎮</span>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-[var(--foreground)] leading-snug">
                Play Games & Earn Money, UC and Diamond in Your Favorite Game
              </p>
              <p className="text-[10px] text-[var(--muted)] leading-tight hidden sm:block">
                Download the official BlueBuff app on Google Play
              </p>
            </div>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=in.bluebuff.games"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[var(--foreground)] text-[var(--background)] text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-[var(--accent)] hover:text-black transition-colors shrink-0 w-full sm:w-auto"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a2.054 2.054 0 0 1-.22-.924V2.738c0-.34.08-.654.22-.924zM15.207 13.414l2.585 2.586-13.01 7.51 10.425-10.096zM15.207 10.586L4.782.49l13.01 7.51-2.585 2.586zm1.414 1.414l3.585-2.07a1.644 1.644 0 0 1 0 2.842l-3.585-2.072z"/>
            </svg>
            <span>Get on Google Play</span>
          </a>
        </div>

        <div className="w-full flex justify-center my-10">
          <AdsterraBanner />
        </div>

      </article>
    </main>
  );
}
