export default function ConstructionUpdates({ data }) {
  const d = data || {};
  const items = d.items || [
    { label: 'Site Aerial View' },
    { label: 'Tower Progress' },
    { label: 'Landscape Work' },
    { label: 'Interior Finishing' },
  ];

  const images = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop',
  ];

  return (
    <section className="bg-gradient-to-r from-teal-600 to-teal-400 py-20 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className=" text-3xl md:text-4xl font-bold text-center mb-10">
          {d.title || 'Construction Updates'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-white/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={images[i % images.length]}
                alt={item.label}
                className="w-full h-48 object-cover"
              />
              <p className="p-3 text-center font-medium text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
