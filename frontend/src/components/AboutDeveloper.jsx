export default function AboutDeveloper({ data }) {
  const d = data || {};
  const stats = d.stats || [
    { value: '1,50,141+', label: 'Sq.ft Ongoing' },
    { value: '5,79,447', label: 'Sq.ft delivered' },
    { value: '2,782+', label: 'Happy Families' },
  ];

  return (
    <section id="developer" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className=" text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {d.title || 'About Developer'}
        </h2>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center gap-12 mb-14">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className=" text-3xl font-extrabold text-green-600">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              {d.description || 'With a legacy of excellence and innovation, our developers bring decades of experience in crafting premium residential spaces that redefine modern living.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=250&fit=crop"
              alt="Developer Project 1"
              className="w-full h-44 object-cover rounded-xl shadow-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=300&h=250&fit=crop"
              alt="Developer Project 2"
              className="w-full h-44 object-cover rounded-xl shadow-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=250&fit=crop"
              alt="Developer Project 3"
              className="w-full h-44 object-cover rounded-xl shadow-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=250&fit=crop"
              alt="Developer Project 4"
              className="w-full h-44 object-cover rounded-xl shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
