import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutProject from '../components/AboutProject';
import FloorPlans from '../components/FloorPlans';
import VideoSection from '../components/VideoSection';
import Amenities from '../components/Amenities';
import ExploreBuildings from '../components/ExploreBuildings';
import AboutDeveloper from '../components/AboutDeveloper';
import ConstructionUpdates from '../components/ConstructionUpdates';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function HomePage() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Start a 10s timeout — if data hasn't arrived, show error
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 10000);

    fetch(`${API}/api/content`)
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutRef.current);
        setContent(data);
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timeoutRef.current);
        setLoading(false);
        setError(true);
      });

    return () => clearTimeout(timeoutRef.current);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Server Unavailable</h2>
          <p className="text-gray-500 font-medium">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <HeroSection data={content.hero} />
      <AboutProject data={content.about_project} />
      <FloorPlans data={content.floor_plans} />
      <VideoSection />
      <Amenities data={content.amenities} />
      <ExploreBuildings data={content.explore_buildings} />
      <AboutDeveloper data={content.about_developer} />
      <ConstructionUpdates data={content.construction_updates} />
      <FAQ data={content.faq} />
      <Footer data={content.footer} />
    </>
  );
}
