"use client";


import Link from "next/link";
import Image from "next/image";
import { FiClock, FiCalendar, FiArrowLeft, FiShare2, FiArrowRight, FiGift } from "react-icons/fi";
import Script from "next/script";
import AdsterraBanner from "@/components/Ads/AdsterraBanner";
import AdsterraSmartlink from "@/components/Ads/AdsterraSmartlink";
import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { BLOGS_DATA } from "@/lib/blogData";

interface BlogPostLayoutProps {
    title: string;
    category: string;
    readTime: string;
    date: string;
    image: string;
    author?: string;
    game?: string;
    children: ReactNode;
    backHref?: string;
}

export default function BlogPostLayout({
    title,
    category,
    readTime,
    date,
    image,
    author = "Admin",
    game,
    children,
    backHref = "/blog",
}: BlogPostLayoutProps) {
    const pathname = usePathname();

    const relatedArticles = useMemo(() => {
        const parts = pathname.split("/");
        const currentSlug = parts[parts.length - 1];
        
        const scoredArticles = BLOGS_DATA
            .filter((b) => b.slug !== currentSlug)
            .map((b) => {
                let score = 0;
                // High priority for same game
                if (b.game && game && b.game.toLowerCase() === game.toLowerCase()) score += 10;
                // Medium priority for same category/type
                if (b.type && category && b.type.toLowerCase() === category.toLowerCase()) score += 5;
                // Random factor to shuffle articles with the same score
                score += Math.random(); 
                return { ...b, score };
            });

        return scoredArticles
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    }, [pathname, game, category]);

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://bluebuff.in${pathname}`
        },
        "headline": title,
        "image": [
            `https://bluebuff.in${image}`
        ],
        "datePublished": new Date(date).toISOString(),
        "author": {
            "@type": "Person",
            "name": author
        },
        "publisher": {
            "@type": "Organization",
            "name": "BlueBuff",
            "logo": {
                "@type": "ImageObject",
                "url": "https://bluebuff.in/logo.png"
            }
        }
    };

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)]/30 pb-32 transition-colors duration-300">
            <Script id={`article-schema-${pathname}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            {/* Background Lighting */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-5%] left-[10%] w-[50%] h-[30%] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[0%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <article className="max-w-4xl mx-auto px-6 pt-4 md:pt-8 relative z-10">

                {/* BREADCRUMB SYSTEM */}
                <div
                    className="mb-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--muted)]/50"
                >
                    <Link href="/blog" aria-label="Back to Blog" className="flex items-center justify-center w-6 h-6 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all mr-1">
                        <FiArrowLeft size={14} />
                    </Link>
                    <Link href="/blog" className="hover:text-[var(--accent)] transition-colors">News</Link>
                    {game && (
                        <>
                            <span className="opacity-20">/</span>
                            <Link href={`/blog/${game.toLowerCase()}`} className="text-[var(--accent)] hover:underline underline-offset-4 decoration-[var(--accent)]/30 transition-all">
                                {game}
                            </Link>
                        </>
                    )}
                    <span className="opacity-20">/</span>
                    <span className="text-[var(--muted)] line-clamp-1 italic">{title}</span>
                </div>


                <header className="mb-8 md:mb-12">
                    <div>
                        <div className="flex items-center flex-nowrap gap-2 md:gap-4 mb-6 mt-1 text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.05em] sm:tracking-[0.1em] overflow-x-auto no-scrollbar whitespace-nowrap pb-1">
                            <span className="text-[var(--accent)] italic flex-shrink-0"># {category}</span>
                            <span className="opacity-10 text-[var(--foreground)] flex-shrink-0">|</span>
                            <span className="flex items-center gap-1.5 text-[var(--muted)] opacity-50 flex-shrink-0"><FiClock size={11} className="text-[var(--accent)] opacity-40" /> {readTime}</span>
                            <span className="opacity-10 text-[var(--foreground)] flex-shrink-0">|</span>
                            <span className="flex items-center gap-1.5 text-[var(--muted)] opacity-50 flex-shrink-0"><FiCalendar size={11} className="text-[var(--accent)] opacity-40" /> {date}</span>
                            <span className="opacity-10 text-[var(--foreground)] flex-shrink-0">|</span>
                            <span className="text-[var(--accent)] opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                BY <span className="underline decoration-[var(--accent)]/30">{author}</span>
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-[1000] italic tracking-tighter uppercase leading-[1.1] text-[var(--foreground)] mb-6 drop-shadow-sm">
                            {title}
                        </h1>
                    </div>

                    {image && (
                        <div
                            className="relative rounded-sm overflow-hidden border border-[var(--border)] aspect-[16/9]"
                        >
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                    

                </header>

                {/* CONTENT SECTION */}
                <section className="max-w-4xl mx-auto">
                    <div className="max-w-none prose prose-invert prose-p:text-[var(--muted)] prose-p:opacity-80 prose-p:leading-relaxed prose-headings:text-[var(--foreground)] prose-headings:italic prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-strong:text-[var(--accent)] prose-ul:list-disc prose-ul:marker:text-[var(--accent)] prose-ol:list-decimal prose-ol:marker:text-[var(--accent)] space-y-10 selection:bg-[var(--accent)]/20 transition-colors">
                        {children}
                    </div>
                    
                    <div className="mt-16 border-t border-[var(--border)] border-dashed pt-8 space-y-8">
                        
                        {/* Smartlink CTA Block */}
                        <div className="bg-gradient-to-r from-[var(--accent)]/10 to-transparent p-4 sm:p-5 rounded-2xl border border-[var(--accent)]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-black italic uppercase tracking-tighter text-[var(--foreground)] mb-1 flex items-center justify-center sm:justify-start gap-2">
                                    <FiGift className="text-[var(--accent)]" /> TOPUP NOW
                                </h3>
                                <p className="text-xs opacity-70 m-0 leading-snug">Support the site and unlock exclusive daily gaming offers.</p>
                            </div>
                            <AdsterraSmartlink text="TOPUP NOW" />
                        </div>
                    </div>
                </section>

               
                <section className="mt-20 max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-[1px] bg-[var(--accent)]" />
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--accent)] italic opacity-60">Elevate your game</span>
                    </div>
                    <h3 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase mb-6">Related <span className="text-[var(--accent)]">News</span></h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {relatedArticles.map((blog) => (
                            <Link
                                key={blog.id}
                                href={`/blog/${blog.game}/${blog.slug}`}
                                className="group block h-full p-3 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all flex flex-col justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    {/* 🖼️ MINI THUMBNAIL ON LEFT - EVEN SMALLER */}
                                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--background)] flex-shrink-0">
                                        <img 
                                            src={blog.image} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        />
                                    </div>

                                    {/* 📝 COMPACT CONTENT ON RIGHT */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                                        <div className="space-y-1">
                                            <span className="text-[6px] font-black text-[var(--accent)] uppercase tracking-wider italic">{blog.type}</span>
                                            <h4 className="text-[10px] md:text-xs font-black uppercase italic tracking-tighter leading-tight group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                                                {blog.title}
                                            </h4>
                                        </div>
                                        <div className="flex items-center justify-between text-[var(--muted)] opacity-20 group-hover:opacity-100 transition-opacity mt-1">
                                            <span className="text-[6px] font-black uppercase tracking-widest">{blog.readingTime}</span>
                                            <FiArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {game && (
                        <div className="mt-8 flex justify-center">
                            <Link 
                                href={`/blog/${game.toLowerCase()}`}
                                className="px-6 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-all flex items-center gap-2"
                            >
                                Explore More {game} News <FiArrowRight size={14} />
                            </Link>
                        </div>
                    )}
                </section>

                {/* SHARE SECTION */}
                <footer className="max-w-2xl mx-auto mt-24 pt-10 border-t border-[var(--border)] flex flex-col items-center gap-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--muted)] opacity-40">Enjoyed this guide? Share it</span>
                    <div className="flex gap-4">
                        {[1, 2, 3].map((i) => (
                            <button key={i} className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-all hover:scale-110 shadow-lg">
                                <FiShare2 size={18} />
                            </button>
                        ))}
                    </div>
                </footer>
            </article>
        </main>
    );
}
