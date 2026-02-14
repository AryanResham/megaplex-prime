export default function AboutProject({ data }) {
  const d = data || {};

  return (
    <section id="about" className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=500&fit=crop"
            alt="About the Project"
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <h2 className=" text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {d.title || 'About Project'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
            {d.description || 'At Ugam to enclose every detail reflects the greatest gems of life; be it for inner admirers or eccentric beings. Guided to a marvelous new horizon of township in Kalyan that is set on the foundations of comfort. It stands on an area of 14 Acres+ of endless happiness.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">
            {d.description2 || 'The moment you enter the house, it the apartment! – the setting reflects the calming splendour. A state of art 7-storey structure with 1 & 2 BHK configurations designed to give you the utmost privileges!'}
          </p>
          <button className="bg-green-600 hover:bg-transparent text-white hover:text-green-600 border-2 border-green-600 px-8 py-3.5 rounded-full font-semibold transition-all duration-300">
            {d.buttonText || 'Download Brochure'}
          </button>
        </div>
      </div>
    </section>
  );
}
