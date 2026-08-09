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

  const openEditModal = (blog) => {
    setEditMode(true);
    setEditId(blog._id);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      game: blog.game || "all",
      type: blog.type || "News",
      image: blog.image || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      tags: blog.tags ? blog.tags.join(", ") : "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      metaKeywords: blog.metaKeywords || "",
    });
    setIsModalOpen(true);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 flex flex-col gap-4 hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)] transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-[var(--foreground)] text-sm leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">{blog.title}</h3>
                    <p className="text-[10px] text-[var(--muted)] mt-1.5 truncate">/{blog.slug}</p>
                  </div>
                  <span className="shrink-0 text-[9px] font-black px-2.5 py-1 bg-[var(--foreground)]/[0.05] rounded-md text-[var(--muted)] uppercase tracking-widest border border-[var(--border)]">
                    {blog.game}
                  </span>
                </div>
                
                <div className="mt-auto pt-4 border-t border-[var(--border)]/50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/50"></div>
                    {blog.type}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/blog/${blog.game}/${blog.slug}`}
                      target="_blank"
                      className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all hover:scale-105"
                      title="View Blog"
                    >
                      <ExternalLink size={14} />
                    </Link>
                    <button
                      onClick={() => openEditModal(blog)}
                      className="w-8 h-8 rounded-lg bg-[var(--foreground)]/5 text-[var(--foreground)] flex items-center justify-center hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all hover:scale-105"
                      title="Edit Blog"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all hover:scale-105"
                      title="Delete Blog"
                    >
                      <Trash2 size={14} />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto">
            <div className="sticky top-0 bg-[var(--card)] border-b border-[var(--border)] p-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-black uppercase tracking-tight text-[var(--foreground)]">
                {editMode ? "Edit Blog" : "Create New Blog"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-md hover:bg-white/5"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-6">
              
              {/* Basic Details Section */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)] border-b border-[var(--border)] pb-1">Basic Info</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Title</label>
                    <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 text-sm" placeholder="Blog Title" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Slug (URL)</label>
                    <input required name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 text-sm" placeholder="my-awesome-post" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Game</label>
                    <select required name="game" value={formData.game} onChange={handleInputChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 text-sm">
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
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Category Type</label>
                    <input required name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 text-sm" placeholder="e.g. News, Guide, Tips" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Cover Image URL</label>
                  <input required name="image" value={formData.image} onChange={handleInputChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 text-sm" placeholder="https://..." />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Tags (comma separated)</label>
                  <input name="tags" value={formData.tags} onChange={handleInputChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 text-sm" placeholder="Guide, Patch, Update" />
                </div>
              </div>

              {/* SEO Details Section */}
              <div className="space-y-4 pt-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 border-b border-[var(--border)] pb-1">SEO Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Meta Title (Optional)</label>
                    <input name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 text-sm" placeholder="SEO Title (defaults to Title)" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Meta Keywords</label>
                    <input name="metaKeywords" value={formData.metaKeywords} onChange={handleInputChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 text-sm" placeholder="game, tips, guide..." />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Meta Description (Optional)</label>
                  <textarea name="metaDescription" value={formData.metaDescription} onChange={handleInputChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 text-sm h-16" placeholder="SEO Description (defaults to Excerpt)..." />
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-4 pt-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400 border-b border-[var(--border)] pb-1">Content</h4>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Short Excerpt</label>
                  <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 text-sm h-20" placeholder="Brief summary of the blog..." />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Main Content (HTML/Text)</label>
                  <textarea required name="content" value={formData.content} onChange={handleInputChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg p-2.5 text-sm h-64 font-mono leading-relaxed" placeholder="<p>Write your HTML content here...</p>" />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[var(--accent)] text-black p-4 rounded-xl font-black uppercase tracking-widest hover:brightness-110 transition-all text-sm">
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
