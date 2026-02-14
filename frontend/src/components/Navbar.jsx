import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Eo_circle_green_letter-m.svg.png"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'Overview', href: '#about' },
    { label: 'Considerations', href: '#amenities' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Floor Plans', href: '#floor-plans' },
    { label: 'Developer', href: '#developer' },
    { label: 'Contact', href: '#footer' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[70px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="" className='w-10 h-10' />
          <span className=" text-xl font-bold text-green-700">
            Megaplex Prime
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-green-600 after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Enquiry Button */}
        <div className="hidden lg:block">
          <a
            href="#footer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Enquiry Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 shadow-lg">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-sm font-medium text-gray-600 hover:text-green-700 border-b border-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#footer"
            className="block mt-4 bg-green-600 text-white text-center px-6 py-3 rounded-lg font-semibold text-sm"
            onClick={() => setMobileOpen(false)}
          >
            Enquiry Now
          </a>
        </div>
      )}
    </nav>
  );
}
