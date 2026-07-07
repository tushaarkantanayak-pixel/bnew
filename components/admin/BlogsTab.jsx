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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-[var(--foreground)]">Blog Management</h2>
          <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest mt-1">Manage database-backed blogs</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all"
        >
          <Plus size={14} /> Add Blog
        </button>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[var(--muted)] text-sm">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--foreground)]/[0.02] border-b border-[var(--border)]">
                  <th className="p-3 text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Title</th>
                  <th className="p-3 text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Game</th>
                  <th className="p-3 text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Type</th>
                  <th className="p-3 text-[10px] font-black uppercase tracking-widest text-[var(--muted)] text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id} className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/[0.02]">
                    <td className="p-3">
                      <p className="text-sm font-bold text-[var(--foreground)]">{blog.title}</p>
                      <p className="text-[10px] text-[var(--muted)]">/{blog.slug}</p>
                    </td>
                    <td className="p-3 text-xs uppercase font-bold text-[var(--muted)]">{blog.game}</td>
                    <td className="p-3 text-xs uppercase font-bold text-[var(--muted)]">{blog.type}</td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/blog/${blog.game}/${blog.slug}`}
                          target="_blank"
                          className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors flex items-center justify-center"
                          title="View Blog"
                        >
                          <ExternalLink size={14} />
                        </Link>
                        <button
                          onClick={() => openEditModal(blog)}
                          className="p-2 bg-[var(--foreground)]/5 text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] rounded-lg transition-colors flex items-center justify-center"
                          title="Edit Blog"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors flex items-center justify-center"
                          title="Delete Blog"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {blogs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-sm text-[var(--muted)]">No blogs found in database.</td>
                  </tr>
                )}
              </tbody>
            </table>
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
