export default function VideoSection() {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&h=600&fit=crop"
        alt="City skyline"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
        <button className="w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110">
          <svg className="w-8 h-8 text-green-600 ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </section>
  );
}
