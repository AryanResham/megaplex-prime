import { useState } from 'react';

export default function FAQ({ data }) {
  const d = data || {};
  const items = d.items || [
    { question: 'What are the available configurations at Ugam Amarta Infinity?', answer: 'Ugam Amarta Infinity offers Smart 1 BHK and Premium 2 BHK configurations designed for modern living with spacious balconies and premium amenities.' },
    { question: 'Where is Ugam Amarta Infinity located?', answer: 'The project is located at Chikloli, Kalyan-Shil Road, Thane, Maharashtra. It offers excellent connectivity to major roads and public transport.' },
    { question: 'What is the price range for apartments at Ugam Amarta Infinity?', answer: 'Smart 1 BHK starts from ₹69.99 Lacs onwards and Premium 2 BHK starts from ₹96.99 Lacs onwards.' },
    { question: 'What amenities are available at Ugam Amarta Infinity?', answer: 'The project features 20+ premium amenities including Gymnasium, Kids Play Area, Jogging Track, Yoga Deck, Landscaped Gardens, and much more.' },
    { question: 'Is the project RERA registered?', answer: 'Yes, Ugam Amarta Infinity is RERA registered with registration number P51800050223.' },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className=" text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          {d.title || 'Frequently Asked Questions'}
        </h2>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="bg-green-50 rounded-lg overflow-hidden transition-all duration-300">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-green-100 transition-colors"
              >
                <span className="font-medium text-gray-800 text-[15px] pr-4">
                  {item.question}
                </span>
                <span
                  className={`text-green-600 font-bold text-xl flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed animate-[fadeIn_0.3s_ease]">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
