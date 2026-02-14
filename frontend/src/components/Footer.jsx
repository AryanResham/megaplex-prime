export default function Footer({ data, highlightField }) {
  const d = data || {};
  const hl = (field) => highlightField === field ? 'ring-2 ring-green-400 ring-offset-2 bg-green-50/10 rounded-lg transition-all duration-300' : 'transition-all duration-300';

  return (
    <footer id="footer" className="bg-[#1a1a2e] text-white/80 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <h3 className={` text-xl font-bold text-green-400 mb-4 ${hl('companyName')}`}>
            {d.companyName || 'Megaplex Prime'}
          </h3>
          <p className={`text-sm leading-relaxed text-white/50 ${hl('address')}`}>
            {d.address || 'Chikloli, Kalyan-Shil Road, Thane, Maharashtra'}
          </p>
          <button
            onClick={() => window.location.href = '/admin'}
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg font-medium transition-colors"
          >
            Edit App
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-sans font-semibold text-white text-sm mb-4">Quick Links</h4>
          <div className="space-y-2">
            {['Home', 'About', 'Floor Plans', 'Amenities', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="block text-sm text-white/50 hover:text-green-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-sans font-semibold text-white text-sm mb-4">Contact</h4>
          <div className="space-y-2 text-sm text-white/50">
            <p className={hl('phone')}>{d.phone || '+91 98765 43210'}</p>
            <p className={hl('email')}>{d.email || 'info@megaplexprime.com'}</p>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-sans font-semibold text-white text-sm mb-4">Legal</h4>
          <div className="space-y-2">
            {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map((link) => (
              <a key={link} href="#" className="block text-sm text-white/50 hover:text-green-400 transition-colors">
                {link}
              </a>
            ))}

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/30">
        <p className={hl('disclaimer')}>{d.disclaimer || 'Disclaimer: This website is meant only for information purposes. It should not be considered / claimed as an official site.'}</p>
        <p className="mt-2">© 2024 Megaplex Prime. All rights reserved.</p>
      </div>
    </footer>
  );
}
