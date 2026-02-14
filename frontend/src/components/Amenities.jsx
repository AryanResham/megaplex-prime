export default function Amenities({ data }) {
  const d = data || {};
  const items = d.items || [
    { title: 'Gymnasium' },
    { title: 'Kids Play Areas' },
    { title: 'Kids Play Areas' },
    { title: 'Jogging Track' },
    { title: 'Yoga Deck' },
    { title: 'Yoga Deck' },
  ];

  const icons = {
    Gymnasium: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-green-600 fill-none stroke-[1.5]">
        <rect x="8" y="24" width="8" height="16" rx="2" />
        <rect x="48" y="24" width="8" height="16" rx="2" />
        <line x1="16" y1="32" x2="48" y2="32" />
        <rect x="18" y="20" width="6" height="24" rx="2" />
        <rect x="40" y="20" width="6" height="24" rx="2" />
      </svg>
    ),
    'Kids Play Areas': (
      <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-green-600 fill-none stroke-[1.5]">
        <circle cx="32" cy="16" r="6" />
        <path d="M20 52 L28 30 L32 38 L36 30 L44 52" />
        <line x1="22" y1="42" x2="42" y2="42" />
      </svg>
    ),
    'Jogging Track': (
      <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-green-600 fill-none stroke-[1.5]">
        <circle cx="32" cy="12" r="5" />
        <path d="M28 20 L24 36 L18 52" />
        <path d="M36 20 L40 36 L46 52" />
        <path d="M24 36 L36 30" />
        <path d="M20 28 L28 22" />
        <path d="M44 28 L36 22" />
      </svg>
    ),
    'Yoga Deck': (
      <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-green-600 fill-none stroke-[1.5]">
        <circle cx="32" cy="14" r="5" />
        <path d="M32 22 L32 38" />
        <path d="M20 30 L32 26 L44 30" />
        <path d="M24 52 L32 38 L40 52" />
      </svg>
    ),
  };

  const getIcon = (title) => {
    return icons[title] || icons['Gymnasium'];
  };

  return (
    <section id="amenities" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className=" text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
          {d.title || 'Amenities'}
        </h2>
        <p className="text-center text-gray-500 max-w-xl mx-auto mb-10 text-sm">
          {d.subtitle || 'Thoughtfully crafted luxury amenities that fascinate, comfort, and excite to make your experiences memorable'}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-7 text-center border-2 border-transparent hover:border-green-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {getIcon(item.title)}
              </div>
              <h4 className="font-sans text-sm font-semibold text-gray-800">
                {item.title}
              </h4>
            </div>
          ))}
        </div>

        <button className="block mx-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5">
          {d.buttonText || 'View All'}
        </button>
      </div>
    </section>
  );
}
