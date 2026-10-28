import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, X, ExternalLink, Eye, Columns, FileEdit } from "lucide-react";
import apiClient from "@/utils/apiClient";
import Link from "next/link";

export default function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [previewMode, setPreviewMode] = useState("split"); // "split" | "edit" | "preview"
  
  const initialFormState = {
    title: "",
    slug: "",
    game: "all",
    type: "News",
    image: "",
    excerpt: "",
    content: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/api/admin/blogs");
      if (res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditMode(false);
    setEditId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const openEditModal = async (blog) => {
    setEditMode(true);
    setEditId(blog._id);
    const initialContent = blog.content || "";
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      game: blog.game || "all",
      type: blog.type || "News",
      image: blog.image || "",
      excerpt: blog.excerpt || "",
      content: initialContent,
      tags: blog.tags ? blog.tags.join(", ") : "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      metaKeywords: blog.metaKeywords || "",
    });
    setIsModalOpen(true);

    // If blog object does not have content, fetch single blog by ID
    if (!initialContent && blog._id) {
      try {
        const res = await apiClient.get(`/api/admin/blogs/${blog._id}`);
        if (res.data?.success && res.data?.data) {
          const full = res.data.data;
          setFormData(prev => ({
            ...prev,
            content: full.content || prev.content,
            excerpt: full.excerpt || prev.excerpt,
            metaTitle: full.metaTitle || prev.metaTitle,
            metaDescription: full.metaDescription || prev.metaDescription,
            metaKeywords: full.metaKeywords || prev.metaKeywords,
          }));
        }
      } catch (err) {
        console.error("Failed to load full blog content:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
      };

      let res;
      if (editMode) {
        res = await apiClient.put(`/api/admin/blogs/${editId}`, payload);
      } else {
        res = await apiClient.post("/api/admin/blogs", payload);
      }

      if (res.data.success) {
        alert(editMode ? "Blog updated successfully!" : "Blog added successfully!");
        setIsModalOpen(false);
        setFormData(initialFormState);
        fetchBlogs();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save blog");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await apiClient.delete(`/api/admin/blogs/${id}`);
      if (res.data.success) {
        fetchBlogs();
      }
    } catch (err) {
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-[var(--foreground)] leading-none">Blog Management</h2>
          <p className="text-[9px] sm:text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest mt-1">Manage database-backed blogs</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-1.5 bg-[var(--accent)] text-black px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:brightness-110 transition-all shrink-0 self-start sm:self-auto"
        >
          <Plus size={12} /> Add Blog
        </button>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="p-8 text-center text-[var(--muted)] text-sm bg-[var(--card)] border border-[var(--border)] rounded-xl">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {blogs.map((blog) => (
              <div 
                key={blog._id} 
                className="group flex flex-col justify-between p-3 rounded-lg border border-[var(--border)]/70 bg-[var(--foreground)]/[0.01] hover:bg-[var(--foreground)]/[0.03] hover:border-[var(--accent)]/50 transition-all text-left relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-[var(--accent)] flex items-center gap-1 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"></span>
                      {blog.game}
                    </span>
                    <span className="text-[8px] font-bold text-[var(--muted)] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--foreground)]/[0.04] border border-[var(--border)]/50 shrink-0">
                      {blog.type}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-[var(--foreground)] text-xs leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-[9px] text-[var(--muted)] font-mono mt-1 truncate">
                    /{blog.slug}
                  </p>
                </div>
                
                <div className="mt-3 pt-2 border-t border-[var(--border)]/40 flex items-center justify-between">
                  <span className="text-[9px] text-[var(--muted)] truncate">
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/blog/${blog.game}/${blog.slug}`}
                      target="_blank"
                      className="p-1 rounded text-[var(--muted)] hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
                      title="View Blog"
                    >
                      <ExternalLink size={13} />
                    </Link>
                    <button
                      onClick={() => openEditModal(blog)}
                      className="p-1 rounded text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/10 transition-colors"
                      title="Edit Blog"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-1 rounded text-[var(--muted)] hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      title="Delete Blog"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {blogs.length === 0 && (
              <div className="col-span-full py-12 text-center flex flex-col items-center justify-center bg-[var(--card)] border border-[var(--border)] rounded-xl">
                <div className="w-16 h-16 rounded-full bg-[var(--foreground)]/[0.02] flex items-center justify-center mb-4">
                  <span className="text-2xl opacity-50">📝</span>
                </div>
                <p className="text-sm font-bold text-[var(--foreground)]">No blogs found</p>
                <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mt-1">Create your first blog post to get started</p>
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden">
          <div className={`bg-[var(--card)] border border-[var(--border)] rounded-xl w-full ${previewMode === "split" ? "max-w-6xl xl:max-w-7xl" : "max-w-3xl"} h-[94vh] flex flex-col shadow-2xl relative my-auto transition-all duration-200 overflow-hidden`}>
            
            {/* Modal Header */}
            <div className="bg-[var(--card)] border-b border-[var(--border)] px-4 py-2.5 flex items-center justify-between z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-[var(--foreground)] leading-tight">
                    {editMode ? "Edit Blog" : "Create New Blog"}
                  </h3>
                  <p className="text-[10px] text-[var(--muted)]">Update blog post details, content and SEO</p>
                </div>
              </div>

              {/* View Mode Toggle Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[var(--background)] p-0.5 rounded-lg border border-[var(--border)] text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setPreviewMode("edit")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                      previewMode === "edit"
                        ? "bg-[var(--accent)] text-black"
                        : "text-[var(--muted)] hover:text-white"
                    }`}
                    title="Editor only"
                  >
                    <FileEdit size={12} /> <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode("split")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                      previewMode === "split"
                        ? "bg-[var(--accent)] text-black"
                        : "text-[var(--muted)] hover:text-white"
                    }`}
                    title="Side-by-side Split View"
                  >
                    <Columns size={12} /> <span className="hidden sm:inline">Split</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode("preview")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                      previewMode === "preview"
                        ? "bg-[var(--accent)] text-black"
                        : "text-[var(--muted)] hover:text-white"
                    }`}
                    title="Preview only"
                  >
                    <Eye size={12} /> <span className="hidden sm:inline">Preview</span>
                  </button>
                </div>

                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)} 
                  className="p-1.5 rounded-lg text-[var(--muted)] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
              <div className={`flex-1 min-h-0 grid ${previewMode === "split" ? "grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]" : "grid-cols-1"}`}>
                
                {/* LEFT PANE: FORM CONTROLS */}
                {(previewMode === "edit" || previewMode === "split") && (
                  <div className="overflow-y-auto p-4 space-y-4 text-xs">
                    {/* Basic Details Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-[var(--border)] pb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">1. Basic Info</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Title</label>
                          <input 
                            required 
                            name="title" 
                            value={formData.title} 
                            onChange={handleInputChange} 
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs focus:border-[var(--accent)] outline-none" 
                            placeholder="Blog Title" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Slug (URL)</label>
                          <input 
                            required 
                            name="slug" 
                            value={formData.slug} 
                            onChange={handleInputChange} 
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs focus:border-[var(--accent)] outline-none font-mono" 
                            placeholder="my-awesome-post" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Game</label>
                          <select 
                            required 
                            name="game" 
                            value={formData.game} 
                            onChange={handleInputChange} 
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs focus:border-[var(--accent)] outline-none"
                          >
                            <option value="all">All Games / General</option>
                            <option value="hok">Honor of Kings</option>
                            <option value="mlbb">Mobile Legends</option>
                            <option value="genshin">Genshin Impact</option>
                            <option value="tips">Tips & Tricks</option>
                            <option value="guides">Guides</option>
                            <option value="news">News & Updates</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Category Type</label>
                          <input 
                            required 
                            name="type" 
                            value={formData.type} 
                            onChange={handleInputChange} 
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs focus:border-[var(--accent)] outline-none" 
                            placeholder="e.g. News, Guide, Tips" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Cover Image URL</label>
                          <input 
                            required 
                            name="image" 
                            value={formData.image} 
                            onChange={handleInputChange} 
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs focus:border-[var(--accent)] outline-none" 
                            placeholder="https://..." 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Tags (comma separated)</label>
                          <input 
                            name="tags" 
                            value={formData.tags} 
                            onChange={handleInputChange} 
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs focus:border-[var(--accent)] outline-none" 
                            placeholder="Guide, Patch, Update" 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between border-b border-[var(--border)] pb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">2. Blog Content & Text</span>
                        <span className="text-[9px] text-[var(--muted)]">HTML or Markdown formatted</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Short Excerpt (Summary)</label>
                        <textarea 
                          rows={2}
                          name="excerpt" 
                          value={formData.excerpt} 
                          onChange={handleInputChange} 
                          className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs focus:border-[var(--accent)] outline-none resize-y" 
                          placeholder="Brief summary shown on blog preview cards..." 
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Main Content (Full Article Body)</label>
                          <span className="text-[9px] text-[var(--muted)] font-mono">{formData.content?.length || 0} chars</span>
                        </div>
                        <textarea 
                          required 
                          rows={14}
                          name="content" 
                          value={formData.content} 
                          onChange={handleInputChange} 
                          className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md p-3 text-xs font-mono leading-relaxed focus:border-[var(--accent)] outline-none resize-y min-h-[260px]" 
                          placeholder="<p>Write your blog article content here...</p>" 
                        />
                      </div>
                    </div>

                    {/* SEO Details Section */}
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between border-b border-[var(--border)] pb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">3. SEO Settings (Optional)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Meta Title</label>
                          <input 
                            name="metaTitle" 
                            value={formData.metaTitle} 
                            onChange={handleInputChange} 
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs focus:border-[var(--accent)] outline-none" 
                            placeholder="SEO Title (defaults to Title)" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Meta Keywords</label>
                          <input 
                            name="metaKeywords" 
                            value={formData.metaKeywords} 
                            onChange={handleInputChange} 
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs focus:border-[var(--accent)] outline-none" 
                            placeholder="game, tips, guide..." 
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Meta Description</label>
                        <textarea 
                          rows={2}
                          name="metaDescription" 
                          value={formData.metaDescription} 
                          onChange={handleInputChange} 
                          className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs focus:border-[var(--accent)] outline-none resize-y" 
                          placeholder="SEO Description (defaults to Excerpt)..." 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* RIGHT PANE: LIVE PREVIEW */}
                {(previewMode === "preview" || previewMode === "split") && (
                  <div className="overflow-y-auto p-4 sm:p-6 bg-[var(--background)] flex flex-col gap-4 text-xs">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 text-[10px] font-black uppercase tracking-wider text-[var(--muted)] shrink-0">
                      <span className="flex items-center gap-1.5 text-[var(--accent)]">
                        <Eye size={13} /> Live Article Preview
                      </span>
                      <span className="font-mono text-[9px] bg-[var(--foreground)]/5 border border-[var(--border)] px-2 py-0.5 rounded text-[var(--muted)]">
                        Real-time rendered
                      </span>
                    </div>

                    <div className="space-y-4 max-w-2xl mx-auto w-full">
                      {/* Game & Category Badges */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-wider">
                          {formData.game}
                        </span>
                        <span className="text-[9px] text-[var(--muted)] uppercase font-bold px-2 py-0.5 rounded bg-[var(--foreground)]/5 border border-[var(--border)]">
                          {formData.type}
                        </span>
                        {formData.slug && (
                          <span className="text-[9px] text-[var(--muted)] font-mono ml-auto opacity-70 truncate max-w-[150px]">
                            /{formData.slug}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h1 className="text-lg sm:text-2xl font-black text-[var(--foreground)] tracking-tight leading-snug">
                        {formData.title || <span className="opacity-30 italic">Untitled Blog Post</span>}
                      </h1>

                      {/* Excerpt */}
                      {formData.excerpt && (
                        <p className="text-xs sm:text-sm text-[var(--muted)] italic border-l-2 border-[var(--accent)] pl-3 leading-relaxed">
                          {formData.excerpt}
                        </p>
                      )}

                      {/* Cover Image */}
                      {formData.image && (
                        <div className="rounded-xl overflow-hidden border border-[var(--border)] aspect-video max-h-60 bg-black/20">
                          <img 
                            src={formData.image} 
                            alt={formData.title || "Cover"} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                      )}

                      {/* Rendered HTML Content Body */}
                      <div 
                        className="prose prose-invert prose-sm sm:prose-base max-w-none 
                        prose-headings:font-black prose-headings:tracking-tight prose-headings:text-[var(--foreground)]
                        prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl prose-img:border prose-img:border-[var(--border)]
                        prose-p:leading-relaxed prose-li:leading-relaxed
                        text-[var(--foreground)]/80 pt-2"
                        dangerouslySetInnerHTML={{ 
                          __html: formData.content || "<p class='text-muted italic opacity-40 py-8 text-center'>Start typing content on the left to see the live formatted preview here...</p>" 
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action Footer */}
              <div className="px-4 py-2.5 bg-[var(--card)] border-t border-[var(--border)] flex items-center justify-between shrink-0">
                <span className="text-[10px] text-[var(--muted)] hidden sm:inline font-mono">
                  {formData.slug ? `/blog/${formData.game}/${formData.slug}` : "Drafting blog post"}
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[var(--muted)] hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-[var(--accent)] text-black px-5 py-1.5 rounded-lg font-black uppercase tracking-wider hover:brightness-110 transition-all text-xs shadow-lg shadow-[var(--accent)]/10"
                  >
                    {editMode ? "Save Changes" : "Publish Blog"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
