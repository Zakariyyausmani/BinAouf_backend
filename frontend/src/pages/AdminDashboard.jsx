import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';

// ─── Sub-Panel: Overview ──────────────────────────────────────────────────────
const Overview = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get('/quotes/analytics');
        setAnalytics(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <div style={{ padding: '40px', color: 'var(--muted)' }}>Loading analytics...</div>;

  const s = analytics?.summary || {};

  return (
    <div>
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h6>Total Quotes</h6>
            <div className="admin-stat-val">{s.totalQuotes ?? 0}</div>
          </div>
          <div className="admin-stat-icon">📋</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h6>Pending Quotes</h6>
            <div className="admin-stat-val" style={{ color: '#d97706' }}>{s.pendingQuotes ?? 0}</div>
          </div>
          <div className="admin-stat-icon">⏳</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h6>Total Products</h6>
            <div className="admin-stat-val">{s.totalProducts ?? 0}</div>
          </div>
          <div className="admin-stat-icon">🧂</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h6>Active Testimonials</h6>
            <div className="admin-stat-val">{s.totalTestimonials ?? 0}</div>
          </div>
          <div className="admin-stat-icon">⭐</div>
        </div>
      </div>

      <div className="admin-panel-card">
        <div className="card-header-flex">
          <h3 className="card-title-sub">Quote Status Breakdown</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { label: 'Pending', val: s.pendingQuotes ?? 0, color: '#d97706', bg: '#fef3c7' },
            { label: 'Replied', val: s.repliedQuotes ?? 0, color: '#059669', bg: '#d1fae5' },
            { label: 'Closed', val: s.closedQuotes ?? 0, color: '#4b5563', bg: '#e5e7eb' },
          ].map(item => (
            <div key={item.label} style={{
              background: item.bg,
              padding: '24px',
              borderRadius: '8px',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px', fontWeight: 700, color: item.color }}>{item.val}</div>
              <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: item.color, marginTop: '6px' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-panel-card">
        <h3 className="card-title-sub" style={{ marginBottom: '16px' }}>Quick Links</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="/" target="_blank" className="admin-action-btn edit" style={{ textDecoration: 'none' }}>🌐 View Live Site</a>
          <a href="/products" target="_blank" className="admin-action-btn edit" style={{ textDecoration: 'none' }}>🛍️ Products Page</a>
          <a href="/contact" target="_blank" className="admin-action-btn edit" style={{ textDecoration: 'none' }}>📋 Quote Form</a>
        </div>
      </div>
    </div>
  );
};

// ─── Sub-Panel: Quotes ────────────────────────────────────────────────────────
const QuotesPanel = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchQuotes = async () => {
    try {
      const res = await API.get('/quotes');
      setQuotes(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuotes(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/quotes/${id}/status`, { status });
      setQuotes(prev => prev.map(q => q._id === id ? { ...q, status } : q));
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const deleteQuote = async (id) => {
    if (!window.confirm('Delete this quote request permanently?')) return;
    try {
      await API.delete(`/quotes/${id}`);
      setQuotes(prev => prev.filter(q => q._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (e) {
      alert('Failed to delete quote');
    }
  };

  if (loading) return <div style={{ padding: '40px', color: 'var(--muted)' }}>Loading quote requests...</div>;

  return (
    <div>
      {/* Detail Modal */}
      {selected && (
        <div className="admin-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <span className="admin-modal-close" onClick={() => setSelected(null)}>✕</span>
            <h3 className="admin-modal-title">Quote Detail — {selected.name}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', color: 'var(--gray-text)', marginBottom: '16px' }}>
              {[
                ['Company', selected.company || 'N/A'],
                ['Email', selected.email],
                ['Phone', selected.phone || 'N/A'],
                ['Country', selected.country],
                ['Product', selected.productInterest],
                ['Order Type', selected.orderType],
                ['Quantity', selected.quantity || 'N/A'],
                ['Market', selected.targetMarket || 'N/A'],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px', color: 'var(--terra)' }}>{k}</div>
                  <div>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--cream2)', padding: '14px', marginBottom: '16px', borderLeft: '3px solid var(--rose)' }}>
              <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '6px' }}>Message</div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>{selected.message}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Pending', 'Replied', 'Closed'].map(s => (
                <button
                  key={s}
                  className={`admin-action-btn ${selected.status === s ? 'edit' : 'view'}`}
                  onClick={() => updateStatus(selected._id, s)}
                >
                  Mark {s}
                </button>
              ))}
              <button className="admin-action-btn delete" onClick={() => { deleteQuote(selected._id); setSelected(null); }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-panel-card">
        <div className="card-header-flex">
          <h3 className="card-title-sub">Quote Requests ({quotes.length})</h3>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Company</th>
                <th>Country</th>
                <th>Product</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>No quote requests yet.</td></tr>
              ) : quotes.map(q => (
                <tr key={q._id}>
                  <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 500 }}>{q.name}</td>
                  <td>{q.company || '—'}</td>
                  <td>{q.country}</td>
                  <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.productInterest}</td>
                  <td>
                    <span className={`status-badge ${q.status.toLowerCase()}`}>{q.status}</span>
                  </td>
                  <td>
                    <button className="admin-action-btn view" onClick={() => setSelected(q)}>👁 View</button>
                    <button className="admin-action-btn delete" onClick={() => deleteQuote(q._id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Sub-Panel: Categories ──────────────────────────────────────────────────────
const CategoriesPanel = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', icon: '', description: '', order: 0, specifications: [] });

  const fetchData = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', slug: '', icon: '', description: '', order: 0, specifications: [] });
    setShowForm(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({
      name: c.name,
      slug: c.slug,
      icon: c.icon || '',
      description: c.description || '',
      order: c.order || 0,
      specifications: c.specifications || [],
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await API.put(`/categories/${editing._id}`, form);
      } else {
        await API.post('/categories', form);
      }
      await fetchData();
      setShowForm(false);
    } catch (e) { alert(e.response?.data?.message || 'Save failed'); }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Delete this category? Cannot be undone and will fail if products use it.')) return;
    try { await API.delete(`/categories/${id}`); setCategories(prev => prev.filter(c => c._id !== id)); }
    catch (e) { alert(e.response?.data?.message || 'Delete failed'); }
  };

  const addSpecRow = () => {
    setForm(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', weight: '', size: '', packing: '' }]
    }));
  };

  const removeSpecRow = (idx) => {
    setForm(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== idx)
    }));
  };

  const updateSpecRow = (idx, field, value) => {
    setForm(prev => {
      const newSpecs = [...prev.specifications];
      newSpecs[idx] = { ...newSpecs[idx], [field]: value };
      return { ...prev, specifications: newSpecs };
    });
  };

  if (loading) return <div style={{ padding: '40px', color: 'var(--muted)' }}>Loading categories...</div>;

  return (
    <div>
      {showForm && (
        <div className="admin-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="admin-modal" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <span className="admin-modal-close" onClick={() => setShowForm(false)}>✕</span>
            <h3 className="admin-modal-title">{editing ? 'Edit Category' : 'Add New Category'}</h3>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label>Category Name *</label>
                <input value={form.name} onChange={e => {
                  const val = e.target.value;
                  // Auto-generate slug if it's a new category
                  if (!editing) {
                    setForm(p => ({ ...p, name: val, slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-') }));
                  } else {
                    setForm(p => ({ ...p, name: val }));
                  }
                }} placeholder="e.g. Edible Salt" />
              </div>
              <div className="admin-form-group">
                <label>URL Slug *</label>
                <input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="e.g. edible-salt" />
              </div>
              <div className="admin-form-group">
                <label>Icon Emoji</label>
                <input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} placeholder="🧂" />
              </div>
              <div className="admin-form-group">
                <label>Display Order</label>
                <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: parseInt(e.target.value) || 0 }))} />
              </div>
              <div className="admin-form-group" style={{ gridColumn: '1/-1' }}>
                <label>Description</label>
                <textarea style={{ height: '60px', resize: 'vertical', borderRadius: '6px', border: '1.5px solid var(--gray-border)', padding: '10px 14px', width: '100%', fontFamily: 'inherit' }}
                  value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
              </div>
              
              <div style={{ gridColumn: '1/-1', marginTop: '20px', borderTop: '1px solid var(--gray-border)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <label style={{ margin: 0 }}>Specifications Table (Logistics)</label>
                  <button className="admin-action-btn edit" onClick={addSpecRow} style={{ padding: '6px 12px', fontSize: '12px' }}>+ Add Row</button>
                </div>
                
                {form.specifications.length === 0 ? (
                  <div style={{ padding: '20px', background: 'var(--cream2)', borderRadius: '8px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                    No specification rows added. This category won't display a logistics table.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-table" style={{ background: 'white' }}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Weight (kg)</th>
                          <th>Size (cm)</th>
                          <th>Packing</th>
                          <th style={{ width: '50px' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {form.specifications.map((spec, idx) => (
                          <tr key={idx}>
                            <td style={{ padding: '8px' }}>
                              <input value={spec.name} onChange={e => updateSpecRow(idx, 'name', e.target.value)} style={{ padding: '6px', border: '1px solid #ddd', width: '100%', borderRadius: '4px' }} placeholder="Square" />
                            </td>
                            <td style={{ padding: '8px' }}>
                              <input value={spec.weight} onChange={e => updateSpecRow(idx, 'weight', e.target.value)} style={{ padding: '6px', border: '1px solid #ddd', width: '100%', borderRadius: '4px' }} placeholder="1.2" />
                            </td>
                            <td style={{ padding: '8px' }}>
                              <input value={spec.size} onChange={e => updateSpecRow(idx, 'size', e.target.value)} style={{ padding: '6px', border: '1px solid #ddd', width: '100%', borderRadius: '4px' }} placeholder="10 x 11" />
                            </td>
                            <td style={{ padding: '8px' }}>
                              <input value={spec.packing} onChange={e => updateSpecRow(idx, 'packing', e.target.value)} style={{ padding: '6px', border: '1px solid #ddd', width: '100%', borderRadius: '4px' }} placeholder="12 pcs" />
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                              <button onClick={() => removeSpecRow(idx)} style={{ background: 'none', border: 'none', color: 'var(--rose)', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '30px', justifyContent: 'flex-end' }}>
              <button className="admin-action-btn view" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="admin-action-btn edit" onClick={handleSave}>{editing ? 'Save Category' : 'Add Category'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-panel-card">
        <div className="card-header-flex">
          <h3 className="card-title-sub">Categories ({categories.length})</h3>
          <button className="admin-action-btn edit" onClick={openNew}>+ Add Category</button>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Order</th>
                <th>Specs Rows</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c => (
                <tr key={c._id}>
                  <td style={{ fontSize: '20px' }}>{c.icon || '—'}</td>
                  <td style={{ fontWeight: 500 }}>{c.name}</td>
                  <td style={{ color: 'var(--muted)', fontSize: '13px' }}>{c.slug}</td>
                  <td>{c.order}</td>
                  <td>{(c.specifications && c.specifications.length) || 0} rows</td>
                  <td>
                    <button className="admin-action-btn edit" onClick={() => openEdit(c)}>✏️ Edit</button>
                    <button className="admin-action-btn delete" onClick={() => deleteCategory(c._id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Sub-Panel: Products ──────────────────────────────────────────────────────
const ProductsPanel = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', description: '', tags: '', imageUrl: '', isFeatured: false, order: 0 });

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([API.get('/categories'), API.get('/products')]);
      setCategories(catRes.data);
      setProducts(prodRes.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', category: categories[0]?._id || '', description: '', tags: '', imageUrl: '', isFeatured: false, order: 0 });
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name,
      category: typeof p.category === 'object' ? p.category._id : p.category,
      description: p.description,
      tags: p.tags.join(', '),
      imageUrl: p.imageUrl || '',
      isFeatured: p.isFeatured || false,
      order: p.order || 0,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editing) {
        await API.put(`/products/${editing._id}`, payload);
      } else {
        await API.post('/products', payload);
      }
      await fetchData();
      setShowForm(false);
    } catch (e) { alert(e.response?.data?.message || 'Save failed'); }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await API.post('/upload', formData, config);
      setForm((p) => ({ ...p, imageUrl: data.imageUrl }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      alert('Image upload failed');
      setUploading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await API.delete(`/products/${id}`); setProducts(prev => prev.filter(p => p._id !== id)); }
    catch (e) { alert('Delete failed'); }
  };

  if (loading) return <div style={{ padding: '40px', color: 'var(--muted)' }}>Loading products...</div>;

  return (
    <div>
      {showForm && (
        <div className="admin-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="admin-modal" style={{ maxWidth: '700px' }} onClick={e => e.stopPropagation()}>
            <span className="admin-modal-close" onClick={() => setShowForm(false)}>✕</span>
            <h3 className="admin-modal-title">{editing ? 'Edit Product' : 'Add New Product'}</h3>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label>Product Name *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Premium Pink Fine Salt" />
              </div>
              <div className="admin-form-group">
                <label>Category *</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {categories.map(c => <option key={c._id} value={c._id}>{c.icon} {c.name}</option>)}
                </select>
              </div>
              <div className="admin-form-group" style={{ gridColumn: '1/-1' }}>
                <label>Description *</label>
                <textarea style={{ height: '80px', resize: 'vertical', borderRadius: '6px', border: '1.5px solid var(--gray-border)', padding: '10px 14px', width: '100%', fontFamily: 'inherit' }}
                  value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
              </div>
              <div className="admin-form-group" style={{ gridColumn: '1/-1' }}>
                <label>Tags (comma-separated)</label>
                <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="Size: Fine, Grade: Food, ISO 22000" />
              </div>
              <div className="admin-form-group">
                <label>Product Image</label>
                <div 
                  className="admin-upload-box"
                  onClick={() => document.getElementById('admin-image-upload').click()}
                >
                  <input 
                    type="file" 
                    id="admin-image-upload"
                    onChange={uploadFileHandler} 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                  />
                  
                  {form.imageUrl ? (
                    <>
                      <div 
                        className="admin-upload-preview" 
                        style={{ backgroundImage: `url(${form.imageUrl})` }}
                      ></div>
                      <div className="admin-upload-change-btn">Change Image</div>
                    </>
                  ) : (
                    <>
                      <div className="admin-upload-icon">📷</div>
                      <div className="admin-upload-text">Click to upload image</div>
                      <div className="admin-upload-subtext">JPG, PNG, WEBP (Max 2MB)</div>
                    </>
                  )}
                  {uploading && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, fontWeight: 500, color: 'var(--terra)' }}>
                      Uploading...
                    </div>
                  )}
                </div>
                <input 
                  type="text" 
                  value={form.imageUrl} 
                  onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} 
                  placeholder="Or paste an image URL directly here..." 
                  style={{ marginTop: '8px', fontSize: '12px' }} 
                />
              </div>
              <div className="admin-form-group">
                <label>Display Order</label>
                <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: parseInt(e.target.value) || 0 }))} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'flex-end' }}>
              <button className="admin-action-btn view" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="admin-action-btn edit" onClick={handleSave}>{editing ? 'Save Changes' : 'Add Product'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-panel-card">
        <div className="card-header-flex">
          <h3 className="card-title-sub">Products ({products.length})</h3>
          <button className="admin-action-btn edit" onClick={openNew}>+ Add Product</button>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Featured</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td>{typeof p.category === 'object' ? p.category?.icon + ' ' + p.category?.name : '—'}</td>
                  <td style={{ maxWidth: '200px', fontSize: '11px', color: 'var(--muted)' }}>
                    {(p.tags || []).slice(0, 2).join(', ')}{p.tags?.length > 2 ? '...' : ''}
                  </td>
                  <td>{p.isFeatured ? '⭐' : '—'}</td>
                  <td>{p.order}</td>
                  <td>
                    <button className="admin-action-btn edit" onClick={() => openEdit(p)}>✏️ Edit</button>
                    <button className="admin-action-btn delete" onClick={() => deleteProduct(p._id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Sub-Panel: Testimonials ──────────────────────────────────────────────────
const TestimonialsPanel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', location: '', companyType: '', rating: 5, quote: '', avatarLetter: '', isActive: true });

  const fetchData = async () => {
    try {
      const res = await API.get('/testimonials?admin=true');
      setTestimonials(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', location: '', companyType: '', rating: 5, quote: '', avatarLetter: '', isActive: true });
    setShowForm(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({ name: t.name, location: t.location, companyType: t.companyType || '', rating: t.rating, quote: t.quote, avatarLetter: t.avatarLetter, isActive: t.isActive });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await API.put(`/testimonials/${editing._id}`, form);
      } else {
        await API.post('/testimonials', form);
      }
      await fetchData();
      setShowForm(false);
    } catch (e) { alert(e.response?.data?.message || 'Save failed'); }
  };

  const toggleActive = async (t) => {
    try {
      await API.put(`/testimonials/${t._id}`, { ...t, isActive: !t.isActive });
      setTestimonials(prev => prev.map(item => item._id === t._id ? { ...item, isActive: !item.isActive } : item));
    } catch (e) { alert('Toggle failed'); }
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try { await API.delete(`/testimonials/${id}`); setTestimonials(prev => prev.filter(t => t._id !== id)); }
    catch (e) { alert('Delete failed'); }
  };

  if (loading) return <div style={{ padding: '40px', color: 'var(--muted)' }}>Loading testimonials...</div>;

  return (
    <div>
      {showForm && (
        <div className="admin-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <span className="admin-modal-close" onClick={() => setShowForm(false)}>✕</span>
            <h3 className="admin-modal-title">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label>Customer Name *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value, avatarLetter: e.target.value.charAt(0).toUpperCase() }))} />
              </div>
              <div className="admin-form-group">
                <label>Location *</label>
                <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Munich, Germany" />
              </div>
              <div className="admin-form-group">
                <label>Company Type</label>
                <input value={form.companyType} onChange={e => setForm(p => ({ ...p, companyType: e.target.value }))} placeholder="e.g. Gourmet Importer" />
              </div>
              <div className="admin-form-group">
                <label>Star Rating (1-5)</label>
                <select value={form.rating} onChange={e => setForm(p => ({ ...p, rating: parseInt(e.target.value) }))}>
                  {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
              <div className="admin-form-group" style={{ gridColumn: '1/-1' }}>
                <label>Testimonial Quote *</label>
                <textarea style={{ height: '90px', resize: 'vertical', borderRadius: '6px', border: '1.5px solid var(--gray-border)', padding: '10px 14px', width: '100%', fontFamily: 'inherit' }}
                  value={form.quote} onChange={e => setForm(p => ({ ...p, quote: e.target.value }))} />
              </div>
              <div className="admin-form-group">
                <label>Active</label>
                <select value={form.isActive ? 'true' : 'false'} onChange={e => setForm(p => ({ ...p, isActive: e.target.value === 'true' }))}>
                  <option value="true">Active (Shown on Site)</option>
                  <option value="false">Hidden</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'flex-end' }}>
              <button className="admin-action-btn view" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="admin-action-btn edit" onClick={handleSave}>{editing ? 'Save Changes' : 'Add Testimonial'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-panel-card">
        <div className="card-header-flex">
          <h3 className="card-title-sub">Testimonials ({testimonials.length})</h3>
          <button className="admin-action-btn edit" onClick={openNew}>+ Add Testimonial</button>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Location</th><th>Company</th><th>Rating</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {testimonials.map(t => (
                <tr key={t._id}>
                  <td style={{ fontWeight: 500 }}>
                    <span style={{ width: 30, height: 30, background: 'linear-gradient(135deg,var(--rose),var(--terra))', color: 'white', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, marginRight: 10 }}>
                      {t.avatarLetter}
                    </span>
                    {t.name}
                  </td>
                  <td>{t.location}</td>
                  <td>{t.companyType || '—'}</td>
                  <td>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</td>
                  <td><span className={`status-badge ${t.isActive ? 'replied' : 'closed'}`}>{t.isActive ? 'Active' : 'Hidden'}</span></td>
                  <td>
                    <button className="admin-action-btn edit" onClick={() => openEdit(t)}>✏️ Edit</button>
                    <button className="admin-action-btn view" onClick={() => toggleActive(t)}>{t.isActive ? '🙈 Hide' : '👁 Show'}</button>
                    <button className="admin-action-btn delete" onClick={() => deleteTestimonial(t._id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Sub-Panel: Site Settings ─────────────────────────────────────────────────
const SettingsPanel = () => {
  const [tab, setTab] = useState('contact');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [contact, setContact] = useState({
    whatsapp_primary: '',
    contact_email: '',
    address_facility: '',
    address_office: '',
  });
  const [phones, setPhones] = useState(['', '', '']);
  const [hours, setHours] = useState({ mon_thu: '', fri: '', sat: '', sun: '' });
  const [social, setSocial] = useState({ linkedin: '', facebook: '', instagram: '', youtube: '' });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get('/settings');
        const s = res.data;
        setContact({
          whatsapp_primary: s.whatsapp_primary || '',
          contact_email: s.contact_email || '',
          address_facility: s.address_facility || '',
          address_office: s.address_office || '',
        });
        const nums = s.whatsapp_numbers || ['', '', ''];
        setPhones([nums[0] || '', nums[1] || '', nums[2] || '']);
        setHours(s.working_hours || { mon_thu: '', fri: '', sat: '', sun: '' });
        setSocial(s.social_links || { linkedin: '', facebook: '', instagram: '', youtube: '' });
      } catch (e) { console.error(e); }
    };
    fetch();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await API.post('/settings/bulk', {
        settings: {
          ...contact,
          whatsapp_numbers: phones,
          working_hours: hours,
          social_links: social,
        }
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { alert('Save failed: ' + (e.response?.data?.message || e.message)); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-panel-card">
      <div className="card-header-flex">
        <h3 className="card-title-sub">Site Settings</h3>
        <button className="admin-action-btn edit" onClick={save} disabled={saving}>
          {saving ? 'Saving...' : saved ? '✓ Saved!' : '💾 Save All'}
        </button>
      </div>

      <div className="admin-settings-tabs">
        {[['contact', 'Contact Info'], ['phones', 'Phone Numbers'], ['hours', 'Working Hours'], ['social', 'Social Media']].map(([k, label]) => (
          <button key={k} className={`admin-settings-tab ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>

      {tab === 'contact' && (
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label>Primary WhatsApp Number</label>
            <input value={contact.whatsapp_primary} onChange={e => setContact(p => ({ ...p, whatsapp_primary: e.target.value }))} placeholder="+923110282668" />
          </div>
          <div className="admin-form-group">
            <label>Official Email</label>
            <input value={contact.contact_email} onChange={e => setContact(p => ({ ...p, contact_email: e.target.value }))} placeholder="binaoufchemicals.pk@gmail.com" />
          </div>
          <div className="admin-form-group" style={{ gridColumn: '1/-1' }}>
            <label>Facility Address</label>
            <input value={contact.address_facility} onChange={e => setContact(p => ({ ...p, address_facility: e.target.value }))} placeholder="Khushab, Punjab, Pakistan" />
          </div>
          <div className="admin-form-group" style={{ gridColumn: '1/-1' }}>
            <label>Office Address</label>
            <input value={contact.address_office} onChange={e => setContact(p => ({ ...p, address_office: e.target.value }))} placeholder="Khushab, Punjab, Pakistan" />
          </div>
        </div>
      )}

      {tab === 'phones' && (
        <div>
          {phones.map((ph, idx) => (
            <div className="admin-form-group" key={idx}>
              <label>WhatsApp / Phone #{idx + 1}</label>
              <input value={ph} onChange={e => setPhones(prev => prev.map((p, i) => i === idx ? e.target.value : p))} placeholder={`e.g. +92 ${idx === 0 ? '311 028 2668' : idx === 1 ? '300 974 5420' : '325 151 2035'}`} />
            </div>
          ))}
        </div>
      )}

      {tab === 'hours' && (
        <div className="admin-form-grid">
          {[['mon_thu', 'Monday – Thursday'], ['fri', 'Friday'], ['sat', 'Saturday'], ['sun', 'Sunday']].map(([k, label]) => (
            <div className="admin-form-group" key={k}>
              <label>{label}</label>
              <input value={hours[k] || ''} onChange={e => setHours(p => ({ ...p, [k]: e.target.value }))} placeholder="9:00 AM to 6:00 PM" />
            </div>
          ))}
        </div>
      )}

      {tab === 'social' && (
        <div className="admin-form-grid">
          {[['linkedin', 'LinkedIn URL'], ['facebook', 'Facebook URL'], ['instagram', 'Instagram URL'], ['youtube', 'YouTube URL']].map(([k, label]) => (
            <div className="admin-form-group" key={k}>
              <label>{label}</label>
              <input value={social[k] || ''} onChange={e => setSocial(p => ({ ...p, [k]: e.target.value }))} placeholder="https://..." />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main AdminDashboard Component ────────────────────────────────────────────
const AdminDashboard = () => {
  const { admin, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState('overview');

  useEffect(() => {
    if (!loading && !admin) {
      navigate('/admin/login');
    }
  }, [admin, loading, navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loader-logo">Bin Aouf</div>
          <p style={{ color: 'var(--muted)', marginTop: '12px' }}>Verifying admin session...</p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  const navItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'quotes', icon: '📋', label: 'Quote Requests' },
    { id: 'categories', icon: '🗂️', label: 'Categories' },
    { id: 'products', icon: '🧂', label: 'Products' },
    { id: 'testimonials', icon: '⭐', label: 'Testimonials' },
    { id: 'settings', icon: '⚙️', label: 'Site Settings' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-logo">
          Bin <span>Aouf</span>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Admin Panel</div>
        </div>

        <div className="admin-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`admin-nav-item ${activePanel === item.id ? 'active' : ''}`}
              onClick={() => setActivePanel(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
            Signed in as <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{admin?.username}</strong>
          </div>
          <button
            className="admin-nav-item"
            style={{ color: '#fca5a5', width: '100%' }}
            onClick={() => { logout(); navigate('/admin/login'); }}
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
          <a
            href="/"
            className="admin-nav-item"
            style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginTop: 4 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🌐</span>
            <span>View Live Site</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">
            {navItems.find(n => n.id === activePanel)?.icon}{' '}
            {navItems.find(n => n.id === activePanel)?.label}
          </h1>
          <div className="admin-user-info">
            Welcome back, <strong>{admin?.username}</strong>
          </div>
        </div>

        {activePanel === 'overview'      && <Overview />}
        {activePanel === 'quotes'        && <QuotesPanel />}
        {activePanel === 'categories'    && <CategoriesPanel />}
        {activePanel === 'products'      && <ProductsPanel />}
        {activePanel === 'testimonials'  && <TestimonialsPanel />}
        {activePanel === 'settings'      && <SettingsPanel />}
      </div>
    </div>
  );
};

export default AdminDashboard;
