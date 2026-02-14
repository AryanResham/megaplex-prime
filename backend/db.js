const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "database.sqlite");
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");

// Create sections table
db.exec(`
  CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_key TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed default content
function seedData() {
  const insertOrIgnore = db.prepare(`
    INSERT OR IGNORE INTO sections (section_key, content) VALUES (?, ?)
  `);

  const sections = [
    {
      key: "hero",
      content: {
        tagline: "THINKING OF A FANTASTIC VICINITY?",
        subtitle: "20+ PREMIUM LUXURIOUS AMENITIES | SPACIOUS BALCONY HOMES",
        projectName: "UGAM AMARTA INFINITY",
        plan1Title: "SMART 1 BHK",
        plan1OldPrice: "84.99 Lacs*",
        plan1NewPrice: "69.99 Lacs*",
        plan1Label: "ONWARDS",
        plan2Title: "PREMIUM 2 BHK",
        plan2OldPrice: "1.14 Cr*",
        plan2NewPrice: "96.99 Lacs*",
        plan2Label: "ONWARDS",
        rera: "RERA NO. P51800050223",
        location: "CHIKLOLI, KALYAN-SHIL-ROAD, THANE, MAHARASHTRA",
      },
    },
    {
      key: "about_project",
      content: {
        title: "About Project",
        description:
          "At Ugam to enclose every detail reflects the greatest gems of life; be it for inner admirers or eccentric beings. Guided to a marvelous new horizon of township in Kalyan that is set on the foundations of comfort. It stands on an area of 14 Acres+ of endless happiness.",
        description2:
          "The moment you enter the house, it the apartment! – the setting reflects the calming splendour. A state of art 7-storey NHK structure with FLO 2 BHK configuration 1100+ is designed to give you the utmost privileges! Luxurious amenities that are desirable, truly you truly and your liberty to experience it. The brochure has a detailed information of everything.",
        buttonText: "Download Brochure",
      },
    },
    {
      key: "floor_plans",
      content: {
        tabs: [
          {
            label: "1 BHK",
            type: "Type : 1 BHK",
            area: "Area: 380 sq ft to 424 Sq.ft",
            price: "Price: Call for price",
          },
          {
            label: "2 BHK",
            type: "Type : 2 BHK",
            area: "Area: 580 sq ft to 650 Sq.ft",
            price: "Price: Call for price",
          },
          {
            label: "3 BHK",
            type: "Type : 3 BHK",
            area: "Area: 850 sq ft to 950 Sq.ft",
            price: "Price: Call for price",
          },
        ],
      },
    },
    {
      key: "amenities",
      content: {
        title: "Amenities",
        subtitle:
          "Thoughtfully crafted luxury amenities that fascinate, comfort, and excite to make your experiences memorable",
        items: [
          { icon: "gymnasium", title: "Gymnasium" },
          { icon: "kids-play", title: "Kids Play Areas" },
          { icon: "kids-play-2", title: "Kids Play Areas" },
          { icon: "jogging", title: "Jogging Track" },
          { icon: "yoga", title: "Yoga Deck" },
          { icon: "yoga-2", title: "Yoga Deck" },
        ],
        buttonText: "View All",
      },
    },
    {
      key: "explore_buildings",
      content: {
        title: "Explore More Buildings in the Township",
        buildings: [
          {
            name: "Ugam Amarta SkyPlex",
            status: "Newly Launched",
            badge: "Signature Enclave",
          },
          {
            name: "Ugam Amarta SkyPlex",
            status: "Newly Launched",
            badge: "Signature Enclave",
          },
          { name: "Ugam Amarta SkyPlex", status: "Newly Launched", badge: "" },
        ],
      },
    },
    {
      key: "about_developer",
      content: {
        title: "About Developer",
        stats: [
          { value: "1,50,141+", label: "Sq.ft Ongoing" },
          { value: "5,79,447", label: "Sq.ft delivered" },
          { value: "2,782+", label: "Happy Families" },
        ],
        description:
          "With a legacy of excellence and innovation, our developers bring decades of experience in crafting premium residential spaces that redefine modern living.",
      },
    },
    {
      key: "construction_updates",
      content: {
        title: "Construction Updates",
        items: [
          { label: "Site Aerial View" },
          { label: "Tower Progress" },
          { label: "Landscape Work" },
          { label: "Interior Finishing" },
        ],
      },
    },
    {
      key: "faq",
      content: {
        title: "Frequently Asked Questions",
        items: [
          {
            question:
              "What are the available configurations at Ugam Amarta Infinity?",
            answer:
              "Ugam Amarta Infinity offers Smart 1 BHK and Premium 2 BHK configurations designed for modern living with spacious balconies and premium amenities.",
          },
          {
            question: "Where is Ugam Amarta Infinity located?",
            answer:
              "The project is located at Chikloli, Kalyan-Shil Road, Thane, Maharashtra. It offers excellent connectivity to major roads and public transport.",
          },
          {
            question:
              "What is the price range for apartments at Ugam Amarta Infinity?",
            answer:
              "Smart 1 BHK starts from ₹69.99 Lacs onwards and Premium 2 BHK starts from ₹96.99 Lacs onwards.",
          },
          {
            question: "What amenities are available at Ugam Amarta Infinity?",
            answer:
              "The project features 20+ premium amenities including Gymnasium, Kids Play Area, Jogging Track, Yoga Deck, Landscaped Gardens, and much more.",
          },
          {
            question: "Is the project RERA registered?",
            answer:
              "Yes, Ugam Amarta Infinity is RERA registered with registration number P51800050223.",
          },
        ],
      },
    },
    {
      key: "footer",
      content: {
        companyName: "Megaplex Prime",
        address: "Chikloli, Kalyan-Shil Road, Thane, Maharashtra",
        phone: "+91 98765 43210",
        email: "info@megaplexprime.com",
        disclaimer:
          "Disclaimer: This website is meant only for information purposes. It should not be considered / claimed as an official site.",
      },
    },
  ];

  const insertMany = db.transaction(() => {
    for (const section of sections) {
      insertOrIgnore.run(section.key, JSON.stringify(section.content));
    }
  });

  insertMany();
}

seedData();

module.exports = db;
