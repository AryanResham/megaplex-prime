import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import HeroSection from '../components/HeroSection';
import AboutProject from '../components/AboutProject';
import FloorPlans from '../components/FloorPlans';
import Amenities from '../components/Amenities';
import ExploreBuildings from '../components/ExploreBuildings';
import AboutDeveloper from '../components/AboutDeveloper';
import ConstructionUpdates from '../components/ConstructionUpdates';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

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

const SECTION_COMPONENTS = {
  hero: HeroSection,
  about_project: AboutProject,
  floor_plans: FloorPlans,
  amenities: Amenities,
  explore_buildings: ExploreBuildings,
  about_developer: AboutDeveloper,
  construction_updates: ConstructionUpdates,
  faq: FAQ,
  footer: Footer,
};

export default function AdminDashboard() {
  const [content, setContent] = useState({});
  const [activeSection, setActiveSection] = useState('hero');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [focusedField, setFocusedField] = useState(null);
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
                            onFocus={() => setFocusedField(itemPath)}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-green-500 outline-none transition-colors resize-y min-h-[80px]"
                          />
                        ) : (
                          <input
                            type="text"
                            value={v}
                            onChange={(e) => updateField(itemPath, e.target.value)}
                            onFocus={() => setFocusedField(itemPath)}
                            onBlur={() => setFocusedField(null)}
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
                    onFocus={() => setFocusedField(`${path}.${i}`)}
                    onBlur={() => setFocusedField(null)}
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
                onFocus={() => setFocusedField(path)}
                onBlur={() => setFocusedField(null)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:border-green-500 outline-none transition-colors resize-y min-h-[100px]"
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => updateField(path, e.target.value)}
                onFocus={() => setFocusedField(path)}
                onBlur={() => setFocusedField(null)}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:border-green-500 outline-none transition-colors"
              />
            )}
          </div>
        );
      }
    });

    return elements;
  };

  const renderPreview = () => {
    const Component = SECTION_COMPONENTS[activeSection];
    if (!Component) return <p className="text-gray-400 text-center py-10">No preview available.</p>;
    return <Component data={content[activeSection]} highlightField={focusedField} />;
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
      <aside className="w-64 bg-[#1a1a2e] text-white fixed h-screen overflow-y-auto flex flex-col z-30 flex-shrink-0">
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

        {/* Preview toggle in sidebar */}
        <div className="px-4 pb-2">
          <button
            onClick={() => setShowPreview(p => !p)}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              showPreview
                ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                : 'bg-white/10 text-white/60 hover:bg-white/15'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPreview ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"} />
              {showPreview && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
            </svg>
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        <div className="p-4 pt-2">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 bg-white/10 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex min-h-screen">
        {/* Editor Panel */}
        <div className={`${showPreview ? 'flex-1 border-r border-gray-200' : 'w-full'} p-8 overflow-y-auto transition-all duration-300`}>
          <div className="max-w-2xl">
            {/* Section header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className=" text-2xl font-bold text-gray-900">
                {SECTION_META[activeSection]?.label}
              </h2>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Editing
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-8">
              {SECTION_META[activeSection]?.description}
            </p>

            {renderEditor()}

            <div className="mt-8 flex items-center gap-4 sticky bottom-6 py-4">
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
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="flex-[1.5] flex flex-col bg-gray-100 sticky top-0 h-screen">
            {/* Preview header bar */}
            <div className="bg-[#1a1a2e] px-5 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 bg-white/10 rounded-md px-3 py-1 text-xs text-white/50 text-center font-mono">
                megaplexprime.com — {SECTION_META[activeSection]?.label}
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-green-400 uppercase">
                Live Preview
              </span>
            </div>

            {/* Preview content — full-width rendering */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
              <div className="min-w-0">
                {renderPreview()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
