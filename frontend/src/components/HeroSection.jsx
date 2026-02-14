export default function HeroSection({ data }) {
  const d = data || {};

  return (
    <section id="hero" className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 py-10 md:py-16 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left */}
        <div className="text-center lg:text-left">
          <h1 className=" text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-green-900 leading-tight mb-3">
            {d.tagline || 'THINKING OF A FANTASTIC VICINITY?'}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 tracking-widest font-medium mb-6">
            {d.subtitle || '20+ PREMIUM LUXURIOUS AMENITIES | SPACIOUS BALCONY HOMES'}
          </p>

          {/* Hero Images */}
          <div className="flex gap-3 justify-center lg:justify-start mb-4">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop"
              alt="Property View 1"
              className="w-[48%] h-44 object-cover rounded-xl shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
              alt="Property View 2"
              className="w-[48%] h-44 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Right */}
        <div className="text-center">
          <p className="text-xs tracking-[3px] text-gray-500 mb-1">
            {d.projectName ? 'UGAM AMARTA' : 'UGAM AMARTA'}
          </p>
          <h2 className=" text-4xl md:text-5xl font-extrabold text-green-900 mb-8">
            {d.projectName || 'INFINITY'}
          </h2>

          {/* Pricing Cards */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-6">
            <div className="bg-white rounded-xl p-5 shadow-lg hover:-translate-y-1 transition-all duration-300 min-w-[210px]">
              <p className="text-xs font-bold text-green-600 tracking-wider mb-1">
                {d.plan1Title || 'SMART 1 BHK'}
              </p>
              <p className="text-xs text-gray-400 line-through">
                {d.plan1OldPrice || '84.99 Lacs*'}
              </p>
              <p className="text-2xl font-extrabold text-gray-900 my-1">
                ₹ <span className="text-3xl">{(d.plan1NewPrice || '69.99 Lacs*').replace('₹', '').trim()}</span>
              </p>
              <p className="text-[10px] tracking-widest text-gray-400">
                {d.plan1Label || 'ONWARDS'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-lg hover:-translate-y-1 transition-all duration-300 min-w-[210px]">
              <p className="text-xs font-bold text-green-600 tracking-wider mb-1">
                {d.plan2Title || 'PREMIUM 2 BHK'}
              </p>
              <p className="text-xs text-gray-400 line-through">
                {d.plan2OldPrice || '1.14 Cr*'}
              </p>
              <p className="text-2xl font-extrabold text-gray-900 my-1">
                ₹ <span className="text-3xl">{(d.plan2NewPrice || '96.99 Lacs*').replace('₹', '').trim()}</span>
              </p>
              <p className="text-[10px] tracking-widest text-gray-400">
                {d.plan2Label || 'ONWARDS'}
              </p>
            </div>
          </div>

          {/* RERA */}
          <div className="flex items-center justify-center gap-3 bg-white/70 rounded-lg px-4 py-3 max-w-md mx-auto">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
              ✓
            </div>
            <p className="text-xs text-gray-600">
              <strong className="text-green-800">{d.rera || 'RERA NO. P51800050223'}</strong>
              <br />
              {d.location || 'CHIKLOLI, KALYAN-SHIL-ROAD, THANE, MAHARASHTRA'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
