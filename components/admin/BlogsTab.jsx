import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, X, ExternalLink } from "lucide-react";
import apiClient from "@/utils/apiClient";
import Link from "next/link";

export default function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[var(--card)] border-b border-[var(--border)] px-4 py-3 flex items-center justify-between z-10">
              <div>
                <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-[var(--foreground)]">
                  {editMode ? "Edit Blog" : "Create New Blog"}
                </h3>
                <p className="text-[10px] text-[var(--muted)]">Update blog post details, content and SEO</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1.5 rounded-lg text-[var(--muted)] hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
              
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

              {/* Content Section - Placed right below Basic Info */}
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
                    <span className="text-[9px] text-[var(--muted)] font-mono">{formData.content?.length || 0} characters</span>
                  </div>
                  <textarea 
                    required 
                    rows={12}
                    name="content" 
                    value={formData.content} 
                    onChange={handleInputChange} 
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md p-3 text-xs font-mono leading-relaxed focus:border-[var(--accent)] outline-none resize-y min-h-[220px]" 
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

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[var(--border)]">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-[var(--muted)] hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-[var(--accent)] text-black px-5 py-2 rounded-lg font-black uppercase tracking-wider hover:brightness-110 transition-all text-xs shadow-lg shadow-[var(--accent)]/10"
                >
                  {editMode ? "Save Changes" : "Publish Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
