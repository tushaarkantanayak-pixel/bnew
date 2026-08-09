"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiShare2,
  FiFilter,
  FiArrowRight,
  FiCalendar,
  FiX,
} from "react-icons/fi";

const POSTS_PER_PAGE = 9;

export default function BlogListing({ initialGame = "all" }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedGame, setSelectedGame] = useState(initialGame);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dbBlogs, setDbBlogs] = useState([]);

  useEffect(() => {
    const fetchDbBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const json = await res.json();
        if (json.success) setDbBlogs(json.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    fetchDbBlogs();
  }, []);

  const categories = useMemo(() => ["all", ...new Set(dbBlogs.map((b) => b.type))], [dbBlogs]);
  const games = useMemo(() => ["all", ...new Set(dbBlogs.map((b) => b.game))], [dbBlogs]);

  const filteredBlogs = useMemo(() => {
    let blogs = [...dbBlogs];
    if (search) blogs = blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
    if (selectedType !== "all") blogs = blogs.filter((b) => b.type === selectedType);
    if (selectedGame !== "all") blogs = blogs.filter((b) => b.game === selectedGame);
    blogs.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    return blogs;
  }, [search, selectedType, selectedGame, dbBlogs]);

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [currentPage]);
  useEffect(() => { setCurrentPage(1); }, [search, selectedType, selectedGame]);

  return (
    <main className="min-h-screen bg-[var(--background)] relative pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-8 md:pt-12 relative z-10">

        {/* ══ HEADER ══ */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-5 h-[2px] bg-[var(--accent)] shrink-0" />
            <h1 className="text-lg md:text-2xl font-[1000] italic tracking-tighter uppercase leading-none">
              {initialGame === "all" ? "Latest" : initialGame}{" "}
              <span className="text-[var(--accent)]">News</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="relative w-40 md:w-52 group/search">
              <div className="absolute -inset-[1px] rounded-xl opacity-0 group-focus-within/search:opacity-100 bg-gradient-to-r from-[var(--accent)]/40 via-[var(--accent)]/20 to-transparent transition-all duration-500 blur-[2px] pointer-events-none" />
              <div className="relative flex items-center rounded-xl bg-[var(--foreground)]/[0.06] border border-[var(--foreground)]/10 group-focus-within/search:border-[var(--accent)]/50 transition-all duration-300">
                <FiSearch className="absolute left-2.5 text-[var(--muted)] group-focus-within/search:text-[var(--accent)] transition-colors" size={12} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-8 pr-7 py-2 bg-transparent border-none focus:ring-0 outline-none text-[11px] font-semibold placeholder:text-[var(--muted)]/50 text-[var(--foreground)] rounded-xl"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-1.5 p-0.5 rounded hover:bg-[var(--accent)]/15 text-[var(--muted)] hover:text-[var(--accent)] transition-all">
                    <FiX size={10} />
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`h-[34px] px-2.5 rounded-xl border flex items-center gap-1 text-[9px] font-black uppercase tracking-widest transition-all ${
                isFilterOpen
                  ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/30"
                  : "bg-[var(--foreground)]/[0.06] border-[var(--foreground)]/10 text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40"
              }`}
            >
              <FiFilter size={12} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* ══ FILTERS ══ */}
        {isFilterOpen && (
          <aside className="mb-8 p-5 rounded-2xl bg-[var(--foreground)]/[0.04] border border-[var(--foreground)]/8 space-y-5">
            {initialGame === "all" && (
              <div className="space-y-2">
                <div className="text-[8px] font-black uppercase tracking-widest text-[var(--muted)] opacity-50">Game</div>
                <div className="flex flex-wrap gap-2">
                  {games.map((game) => (
                    <Link
                      key={game}
                      href={game === "all" ? "/blog" : `/blog/${game}`}
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wide transition-all border ${
                        selectedGame === game
                          ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-sm"
                          : "border-[var(--foreground)]/10 text-[var(--muted)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                      }`}
                    >
                      {game === "all" ? "All Games" : game}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <div className="text-[8px] font-black uppercase tracking-widest text-[var(--muted)] opacity-50">Topic</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wide transition-all border ${
                      selectedType === type
                        ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-sm"
                        : "border-[var(--foreground)]/10 text-[var(--muted)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                    }`}
                  >
                    {type === "all" ? "All Topics" : type}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* ══ GRID ══ */}
        {paginatedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-[var(--muted)] text-[10px] font-black uppercase tracking-[0.3em] italic opacity-20">
            No Articles Found
          </div>
        )}

        {/* ══ PAGINATION ══ */}
        {totalPages > 1 && (
          <nav className="flex justify-center items-center gap-2 mt-14">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="w-9 h-9 rounded-xl bg-[var(--foreground)]/[0.06] border border-[var(--foreground)]/10 flex items-center justify-center text-[var(--muted)] disabled:opacity-20 hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all"
            >
              <FiChevronLeft size={15} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-9 h-9 rounded-xl text-[10px] font-black transition-all border ${
                    currentPage === num
                      ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20"
                      : "bg-[var(--foreground)]/[0.06] border-[var(--foreground)]/10 text-[var(--muted)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-9 h-9 rounded-xl bg-[var(--foreground)]/[0.06] border border-[var(--foreground)]/10 flex items-center justify-center text-[var(--muted)] disabled:opacity-20 hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all"
            >
              <FiChevronRight size={15} />
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}

/* ══════════ PREMIUM BLOG CARD ══════════ */
function BlogCard({ blog, index }) {
  const firstTag = blog.tags?.[0];
  const date = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <article>
      <Link
        href={`/blog/${blog.game}/${blog.slug}`}
        className="group flex flex-col rounded-xl overflow-hidden border border-[var(--foreground)]/8 bg-[var(--foreground)]/[0.03] hover:border-[var(--accent)]/40 hover:shadow-lg hover:shadow-[var(--accent)]/8 transition-all duration-300"
      >
        {/* Cover Image */}
        <div className="relative w-full aspect-[2/1] overflow-hidden bg-[var(--foreground)]/5">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Tag badge */}
          {firstTag && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[var(--accent)] text-white text-[8px] font-black uppercase tracking-widest shadow">
              #{firstTag}
            </div>
          )}

          {/* Type badge */}
          {blog.type && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-widest">
              {blog.type}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          {/* Title */}
          <h2 className="text-[13px] font-black leading-snug line-clamp-2 text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-200">
            {blog.title}
          </h2>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-[10px] text-[var(--muted)] opacity-60 line-clamp-1 leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-[var(--foreground)]/6">
            {/* Author + Date */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center text-[7px] font-black flex-shrink-0">
                {(blog.author || "BB").substring(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="text-[9px] font-bold text-[var(--foreground)]">{blog.author || "BlueBuff"}</span>
                <span className="text-[8px] text-[var(--muted)] opacity-50">{date}</span>
              </div>
            </div>

            {/* Read + Share */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(`${window.location.origin}/blog/${blog.game}/${blog.slug}`);
                }}
                className="w-7 h-7 rounded-full bg-[var(--foreground)]/6 hover:bg-[var(--accent)]/15 text-[var(--muted)] hover:text-[var(--accent)] flex items-center justify-center transition-all"
              >
                <FiShare2 size={11} />
              </button>
              <div className="flex items-center gap-1 text-[var(--accent)] text-[9px] font-black uppercase tracking-wide group-hover:gap-1.5 transition-all">
                Read <FiArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
