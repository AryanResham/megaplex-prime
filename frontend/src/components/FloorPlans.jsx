import { useState } from 'react';

export default function FloorPlans({ data, highlightField }) {
  const d = data || {};
  const tabs = d.tabs || [
    { label: '1 BHK', type: 'Type : 1 BHK', area: 'Area: 380 sq ft to 424 Sq.ft', price: 'Price: Call for price' },
    { label: '2 BHK', type: 'Type : 2 BHK', area: 'Area: 580 sq ft to 650 Sq.ft', price: 'Price: Call for price' },
    { label: '3 BHK', type: 'Type : 3 BHK', area: 'Area: 850 sq ft to 950 Sq.ft', price: 'Price: Call for price' },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const hl = (field) => highlightField === field ? 'ring-2 ring-green-400 ring-offset-2 bg-green-50/40 rounded-lg transition-all duration-300' : 'transition-all duration-300';

  const floorImages = [
    'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=500&fit=crop',
  ];

  return (
    <section id="floor-plans" className="bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className=" text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          Floor Plans
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-7 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 border-2 ${hl(`tabs.${i}.label`)} ${
                activeTab === i
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-600 border-green-200 hover:border-green-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Floor Plan Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-5 shadow-lg">
            <img
              src={floorImages[activeTab] || floorImages[0]}
              alt={`Floor plan ${tabs[activeTab]?.label}`}
              className="w-full rounded-lg"
            />
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="space-y-4">
              <p className={`text-base text-gray-700 pb-4 border-b border-gray-100 ${hl(`tabs.${activeTab}.type`)}`}>
                <span className="font-semibold text-green-800">Type:</span>{' '}
                {tabs[activeTab]?.type?.replace('Type : ', '') || '1 BHK'}
              </p>
              <p className={`text-base text-gray-700 pb-4 border-b border-gray-100 ${hl(`tabs.${activeTab}.area`)}`}>
                <span className="font-semibold text-green-800">Area:</span>{' '}
                {tabs[activeTab]?.area?.replace('Area: ', '') || '380 sq ft to 424 Sq.ft'}
              </p>
              <p className={`text-base text-gray-700 ${hl(`tabs.${activeTab}.price`)}`}>
                <span className="font-semibold text-green-800">Price:</span>{' '}
                {tabs[activeTab]?.price?.replace('Price: ', '') || 'Call for price'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
