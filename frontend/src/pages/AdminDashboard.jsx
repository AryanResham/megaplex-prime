import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SECTION_META = {
  hero: { label: 'Hero Section', description: 'Main banner — tagline, pricing, RERA info' },
  about_project: { label: 'About Project', description: 'Project description and brochure button' },
  floor_plans: { label: 'Floor Plans', description: 'Tab labels, types, areas, and prices' },
  amenities: { label: 'Amenities', description: 'Section title, subtitle, and amenity names' },
  explore_buildings: { label: 'Explore Buildings', description: 'Building names, statuses, and badges' },
  about_developer: { label: 'About Developer', description: 'Statistics, title, and description' },
  construction_updates: { label: 'Construction Updates', description: 'Section title and update labels' },
  faq: { label: 'FAQ', description: 'Questions and answers' },
  footer: { label: 'Footer', description: 'Company details, contact, disclaimer' },
};

export default function AdminDashboard() {
  const [content, setContent] = useState({});
  const [activeSection, setActiveSection] = useState('hero');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth
    fetch(`${API}/api/auth/check`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => {
        if (!d.isAdmin) navigate('/admin');
      })
      .catch(() => navigate('/admin'));

    // Start a 10s timeout — if data hasn't arrived, show error
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 10000);

    // Load content
    fetch(`${API}/api/content`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => {
        clearTimeout(timeoutRef.current);
        setContent(d);
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timeoutRef.current);
        setLoading(false);
        setError(true);
      });

    return () => clearTimeout(timeoutRef.current);
  }, [navigate]);

  const handleLogout = async () => {
    await fetch(`${API}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    navigate('/admin');
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      const res = await fetch(`${API}/api/content/${activeSection}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: content[activeSection] }),
      });
      if (res.ok) {
        setSaveMsg('✓ Saved successfully!');
        setTimeout(() => setSaveMsg(''), 3000);
      } else {
        setSaveMsg('❌ Failed to save');
      }
    } catch {
      setSaveMsg('❌ Server error');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path, value) => {
    setContent(prev => {
      const updated = { ...prev };
      const sectionData = { ...updated[activeSection] };

      const keys = path.split('.');
      let current = sectionData;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (Array.isArray(current[key])) {
          current[key] = [...current[key]];
          current = current[key];
        } else {
          current[key] = { ...current[key] };
          current = current[key];
        }
      }
      current[keys[keys.length - 1]] = value;

      updated[activeSection] = sectionData;
      return updated;
    });
  };

  const renderEditor = () => {
    const data = content[activeSection];
    if (!data) return <p className="text-gray-400">No data for this section.</p>;

    return (
      <div className="space-y-5">
        {renderFields(data, '')}
      </div>
    );
  };

  const renderFields = (obj, prefix) => {
    const elements = [];

    Object.entries(obj).forEach(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      const label = key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase());

      if (Array.isArray(value)) {
        elements.push(
          <div key={path} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 text-sm mb-4 uppercase tracking-wide">{label}</h4>
            {value.map((item, i) => (
              <div key={i} className="ml-2 mb-4 pl-4 border-l-2 border-green-200">
                <p className="text-xs font-semibold text-gray-400 mb-2">Item {i + 1}</p>
                {typeof item === 'object' ? (
                  Object.entries(item).map(([k, v]) => {
                    const itemPath = `${path}.${i}.${k}`;
                    const itemLabel = k.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase());
                    return (
                      <div key={itemPath} className="mb-3">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">{itemLabel}</label>
                        {String(v).length > 60 ? (
                          <textarea
                            value={v}
                            onChange={(e) => updateField(itemPath, e.target.value)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-green-500 outline-none transition-colors resize-y min-h-[80px]"
                          />
                        ) : (
                          <input
                            type="text"
                            value={v}
                            onChange={(e) => updateField(itemPath, e.target.value)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-green-500 outline-none transition-colors"
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateField(`${path}.${i}`, e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-green-500 outline-none transition-colors"
                  />
                )}
              </div>
            ))}
          </div>
        );
      } else if (typeof value === 'object' && value !== null) {
        elements.push(
          <div key={path} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 text-sm mb-4 uppercase tracking-wide">{label}</h4>
            {renderFields(value, path)}
          </div>
        );
      } else {
        const isLong = String(value).length > 80;
        elements.push(
          <div key={path} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 mb-2">{label}</label>
            {isLong ? (
              <textarea
                value={value}
                onChange={(e) => updateField(path, e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:border-green-500 outline-none transition-colors resize-y min-h-[100px]"
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => updateField(path, e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:border-green-500 outline-none transition-colors"
              />
            )}
          </div>
        );
      }
    });

    return elements;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Server Unavailable</h2>
          <p className="text-gray-500 font-medium">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a2e] text-white fixed h-screen overflow-y-auto flex flex-col">
        <div className="p-5">
          <h3 className=" text-lg font-bold text-green-400">Megaplex Prime</h3>
          <p className="text-[11px] text-white/40 mt-1">Admin Panel</p>
        </div>

        <Link
          to="/"
          className="mx-4 mb-4 px-3 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs rounded-lg transition-colors flex items-center gap-2"
        >
          ← Back to Website
        </Link>

        <nav className="flex-1">
          {Object.entries(SECTION_META).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => { setActiveSection(key); setSaveMsg(''); }}
              className={`w-full text-left px-6 py-3 text-sm transition-all border-l-[3px] ${
                activeSection === key
                  ? 'bg-white/10 text-white border-green-400'
                  : 'text-white/60 border-transparent hover:bg-white/5 hover:text-white'
              }`}
            >
              {meta.label}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 bg-white/10 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className=" text-2xl font-bold text-gray-900">
              {SECTION_META[activeSection]?.label}
            </h2>
          </div>
          <p className="text-gray-400 text-sm mb-8">
            {SECTION_META[activeSection]?.description}
          </p>

          {renderEditor()}

          <div className="mt-8 flex items-center gap-4 sticky bottom-6 bg-gray-50 py-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 shadow-lg"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {saveMsg && (
              <span className={`font-semibold text-sm animate-pulse ${saveMsg.includes('✓') ? 'text-green-600' : 'text-red-500'}`}>
                {saveMsg}
              </span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
