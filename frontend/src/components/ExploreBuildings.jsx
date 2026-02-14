export default function ExploreBuildings({ data, highlightField }) {
  const d = data || {};
  const buildings = d.buildings || [
    { name: 'Ugam Amarta SkyPlex', status: 'Newly Launched', badge: 'Signature Enclave' },
    { name: 'Ugam Amarta SkyPlex', status: 'Newly Launched', badge: 'Signature Enclave' },
    { name: 'Ugam Amarta SkyPlex', status: 'Newly Launched', badge: '' },
  ];

  const hl = (field) => highlightField === field ? 'ring-2 ring-green-400 ring-offset-2 bg-green-50/20 rounded-lg transition-all duration-300' : 'transition-all duration-300';

  const images = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=350&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=350&fit=crop',
    'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=400&h=350&fit=crop',
  ];

  return (
    <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 py-20 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className={` text-3xl md:text-4xl font-bold text-center mb-10 ${hl('title')}`}>
          {d.title || 'Explore More Buildings in the Township'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((b, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${highlightField && highlightField.startsWith(`buildings.${i}`) ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-green-800' : ''}`}
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={images[i % images.length]}
                  alt={b.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 text-center">
                <h4 className={`font-sans font-semibold text-base mb-2 ${hl(`buildings.${i}.name`)}`}>
                  {b.name}
                </h4>
                <div className="flex justify-center gap-2 flex-wrap">
                  {b.status && (
                    <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white ${hl(`buildings.${i}.status`)}`}>
                      {b.status}
                    </span>
                  )}
                  {b.badge && (
                    <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold bg-green-500 text-white ${hl(`buildings.${i}.badge`)}`}>
                      {b.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
