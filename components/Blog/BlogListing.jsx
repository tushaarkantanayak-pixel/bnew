"use client";

import { useState, useMemo, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiList,
  FiPlay,
  FiShare2,
  FiMoreHorizontal,
  FiFilter,
} from "react-icons/fi";

import { BLOGS_DATA } from "@/lib/blogData";

/* ================= SETTINGS ================= */
const POSTS_PER_PAGE = 25;

export default function BlogListing({ initialGame = "all" }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedGame, setSelectedGame] = useState(initialGame);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = useMemo(() => {
    return ["all", ...new Set(BLOGS_DATA.map((b) => b.type))];
  }, []);

  const games = useMemo(() => {
    return ["all", ...new Set(BLOGS_DATA.map((b) => b.game))];
  }, []);

  const filteredBlogs = useMemo(() => {
    let blogs = [...BLOGS_DATA];
    if (search) {
      blogs = blogs.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedType !== "all") {
      blogs = blogs.filter((b) => b.type === selectedType);
    }
    if (selectedGame !== "all") {
      blogs = blogs.filter((b) => b.game === selectedGame);
    }
    blogs.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    return blogs;
  }, [search, selectedType, selectedGame]);

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedType, selectedGame]);

  return (
    <main className="min-h-screen bg-[var(--background)] relative pb-24 transition-colors duration-300 px-6">
      <div className="max-w-4xl mx-auto pt-0 relative z-10">
        <div
          className="mb-2"
        >


          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl md:text-5xl font-[1000] italic tracking-tighter uppercase leading-none">
              {initialGame === "all" ? "Latest" : initialGame} <span className="text-[var(--accent)]">News</span>
            </h1>
            
            {/* 🔍 COMPACT SEARCH & FILTER TOGGLE */}
            <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
              <div className="relative flex-1 md:w-60">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                  <FiSearch className="text-[var(--muted)] opacity-30" size={12} />
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="SEARCH..."
                  className="w-full h-10 pl-9 pr-6 rounded-xl bg-[var(--card)] border border-[var(--border)] outline-none text-[10px] font-bold tracking-widest uppercase focus:border-[var(--accent)]/40 transition-all font-sans"
                />
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`h-10 px-3 sm:px-4 rounded-xl border flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  isFilterOpen 
                    ? "bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] shadow-md" 
                    : "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)]/40 hover:bg-[var(--background)]"
                }`}
              >
                <FiFilter size={14} />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* 🔖 TOGGLABLE FILTERS */}
        <>
          {isFilterOpen && (
            <aside
              className="overflow-hidden mt-4 mb-10"
              aria-label="Blog filters"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-6">
                {initialGame === "all" && (
                    <div className="space-y-3">
                        <div className="text-[8px] font-black uppercase tracking-widest text-[var(--muted)] opacity-50 italic">SELECT GAME</div>
                        <div className="flex flex-wrap gap-2">
                            {games.map((game) => (
                                <Link
                                    key={game}
                                    href={game === "all" ? "/blog" : `/blog/${game}`}
                                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all border ${
                                        selectedGame === game
                                            ? "bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] italic shadow-lg shadow-[var(--foreground)]/10"
                                            : "bg-[var(--background)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/30 hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                                    }`}
                                >
                                    {game === "all" ? "All Games" : game}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <div className="text-[8px] font-black uppercase tracking-widest text-[var(--muted)] opacity-50 italic">TOPICS</div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all border ${
                                    selectedType === type
                                        ? "bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] italic shadow-lg shadow-[var(--foreground)]/10"
                                        : "bg-[var(--background)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/30 hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                                }`}
                            >
                                {type === "all" ? "All Topics" : type}
                            </button>
                        ))}
                    </div>
                </div>
              </div>
            </aside>
          )}
        </>

        {/* 📄 BLOG GRID */}
        <div className="space-y-3">
          <>
            {paginatedBlogs.length > 0 ? (
              paginatedBlogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))
            ) : (
              <div
                key="empty"
                className="text-center py-20 text-[var(--muted)] text-[10px] font-black uppercase tracking-[0.3em] italic opacity-20"
              >
                No Articles Discovered
              </div>
            )}
          </>
        </div>

        {/* 🔢 PAGINATION - NUMBERED */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="flex justify-center items-center gap-2 mt-12 mb-20">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] disabled:opacity-20 transition-all hover:border-[var(--accent)]/30 hover:text-[var(--accent)]"
            >
              <FiChevronLeft size={16} />
            </button>
            
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all border ${
                    currentPage === num 
                      ? "bg-[var(--accent)] border-[var(--accent)] text-black scale-110 shadow-lg shadow-[var(--accent)]/20" 
                      : "bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/30 hover:text-[var(--accent)]"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] disabled:opacity-20 transition-all hover:border-[var(--accent)]/30 hover:text-[var(--accent)]"
            >
              <FiChevronRight size={16} />
            </button>
          </nav>
        )}

        {/* SEO Footer Removed per spam policy */}
      </div>
    </main>
  );
}

/* ================= BLOG CARD ================= */
function BlogCard({ blog, index }) {
  const authorInitials = blog.author ? blog.author.substring(0, 2).toUpperCase() : "BB";
  const firstTag = blog.tags?.[0];

  return (
    <article>
      <Link
        href={`/blog/${blog.game}/${blog.slug}`}
        className="group block relative rounded-2xl bg-[var(--card)] border border-[var(--border)] p-2 sm:p-3 hover:shadow-md hover:border-[var(--accent)]/30 transition-all duration-300"
      >
        <div className="flex gap-4">
          {/* 🖼️ THUMBNAIL WITH TAG BADGE */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--background)] border border-[var(--border)]">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {firstTag && (
              <div className="absolute top-2 left-2 max-w-[80px] sm:max-w-[100px] truncate bg-[#1A1A1A]/80 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md shadow-sm tracking-wide">
                #{firstTag.toLowerCase()}
              </div>
            )}
          </div>

          {/* 📝 CONTENT */}
          <div className="flex flex-col justify-between flex-1 min-w-0 py-1 pr-2">
            
            {/* Title */}
            <div className="mt-1">
              <h2 className="text-sm sm:text-lg font-bold text-[var(--foreground)] leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                {blog.title}
              </h2>
              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-[10px] sm:text-xs text-[var(--muted)] opacity-70 line-clamp-1 mt-1 leading-snug">
                  {blog.excerpt}
                </p>
              )}
            </div>

            {/* Footer / Author Row */}
            <div className="flex items-center justify-between mt-auto mb-1 gap-1">
              <div className="flex items-center gap-1.5 min-w-0">
                {/* Avatar */}
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center text-[8px] font-bold flex-shrink-0">
                  {authorInitials}
                </div>
                {/* Author Info */}
                <div className="flex flex-col min-w-0 leading-none gap-0.5">
                  <span className="text-[9px] sm:text-[10px] font-bold text-[var(--foreground)] truncate">by {blog.author || "BlueBuff"}</span>
                  <span className="text-[8px] sm:text-[9px] text-[var(--muted)] opacity-60">
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    const url = `${window.location.origin}/blog/${blog.game}/${blog.slug}`;
                    navigator.clipboard.writeText(url);
                    alert("Link copied to clipboard!");
                  }}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  <FiShare2 size={10} className="ml-[1px]" />
                </button>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--card)] text-[var(--muted)] border border-[var(--border)] flex items-center justify-center shadow-sm hover:bg-[var(--background)] transition-colors">
                  <FiMoreHorizontal size={12} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
