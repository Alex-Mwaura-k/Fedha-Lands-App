export const properties = [
  {
    id: 1,
    title: "Royal Garden Kithyoko - Phase 5",
    location: "Kithyoko, Machakos",
    size: "50x100",
    price: "130,000",
    status: "Available",
    img: "/img/properties/Royal Gardens 5.png",
    // NEW: Array of images for the gallery
    images: [
      "/img/properties/Royal Gardens 5.png",
      "/img/properties/Royal Gardens 4.png",
      "/img/properties/Kijani Gardens.png",
      "/img/properties/Unity Gardens.png",
      "https://picsum.photos/id/10/800/600", // Placeholders to simulate more shots
      "https://picsum.photos/id/11/800/600",
    ],
    description:
      "Located just 9 minutes from the Thika-Garissa highway, Royal Garden Phase 5 offers a serene environment perfect for immediate settlement. The soil is red, suitable for farming, and the area is rapidly developing. With ready title deeds, water on site, and electricity nearby, it's an ideal choice for both residential and investment purposes. The plots are beaconed, and the roads are graded for easy access. Don't miss out on this opportunity to own a piece of prime land in Kithyoko.",
    features: [
      "Ready Title Deeds",
      "Water on Site",
      "Electricity Nearby",
      "Graded Roads",
      "Beaconed",
    ],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.166266453!2d37.566!3d-1.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNDguMCJTIDM3wrAzNCcwMC4wIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske",
  },
  {
    id: 2,
    title: "Kijani Garden Malindi",
    location: "Malindi",
    size: "1 Acre",
    price: "385,000",
    status: "Available",
    img: "/img/properties/Kijani Gardens.png",
    // Add images array here too...
    images: [
      "/img/properties/Kijani Gardens.png",
      "https://picsum.photos/id/15/800/600",
      "https://picsum.photos/id/16/800/600",
    ],
    description:
      "A massive 1-acre block ideal for holiday homes, speculation, or large scale farming. Located near Msumarini shopping center just 45 minutes from Malindi CBD, this project promises high returns on investment. The area boasts a cool climate, ocean breeze, and is in close proximity to the beach. With freehold title deeds, tarmacked roads nearby, and a secure environment, Kijani Garden is perfect for those looking to invest in Malindi's thriving property market.",
    features: ["Freehold Title", "Near Tarmac", "Ocean Breeze", "Fenced"],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955!2d40.1!3d-3.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMTInMDAuMCJTIDQwwrAwNiwwMC4wIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske",
  },
  // ... (Keep the rest of your properties, just ensure they have the images array or the code handles it gracefully)
  {
    id: 3,
    title: "Unity Garden Makutano",
    location: "Makutano (Mwea)",
    size: "50x100",
    price: "530,000",
    status: "Available",
    img: "/img/properties/Unity Gardens.png",
    images: ["/img/properties/Unity Gardens.png"], // Fallback if only 1 image
    description:
      "Prime commercial and residential plots in the heart of Makutano. Extremely high value appreciation rate. Ideal for building rental flats or commercial centers. The area is a bustling hub with a vibrant market, schools, and easy access to major roads. With ready title deeds, water, electricity, and a secure perimeter fence, Unity Garden offers everything you need for a successful investment.",
    features: ["Commercial Zone", "Water & Electricity", "Perimeter Fence"],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955!2d37.3!3d-0.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNDInMDAuMCJTIDM3wrAxOCwwMC4wIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske",
  },
  // ... Add 'images: []' to the rest of the items to prevent errors
  {
    id: 4,
    title: "Royal Garden Kithyoko - Phase 4",
    location: "Kithyoko",
    size: "50x100",
    price: "120,000",
    status: "Available",
    img: "/img/properties/Royal Gardens 4.png",
    images: ["/img/properties/Royal Gardens 4.png"],
    description:
      "Our most affordable project yet. Located 10 minutes from Kavaini shopping center. Perfect for first-time investors looking to secure land cheaply. The area is developing rapidly with new infrastructure projects underway. With ready title deeds, electricity, and community water, it's an excellent opportunity to own land in Kithyoko.",
    features: ["Ready Titles", "Electricity", "Community Water"],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955!2d37.5!3d-1.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTInMDAuMCJTIDM3wrAzMCwwMC4wIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske",
  },
  {
    id: 5,
    title: "Amani Garden Malindi",
    location: "Malindi",
    size: "100x100",
    price: "250,000",
    status: "Sold Out",
    img: "/img/properties/Amani Gardens.png",
    images: ["/img/properties/Amani Gardens.png"],
    description:
      "Sold out project. Located along the Sala Gate bypass. Keep watching for Phase 2 opening soon. Thank you for your interest!",
    features: ["Sold Out", "Holiday Destination"],
    mapSrc: "",
  },
  {
    id: 6,
    title: "Fadhili Garden Makutano",
    location: "Makutano",
    size: "50x100",
    price: "480,000",
    status: "Sold Out",
    img: "/img/properties/Fadhili Gardens.png",
    images: ["/img/properties/Fadhili Gardens.png"],
    description:
      "This gated community project is fully sold out. Thank you to all our valued customers. Stay tuned for future developments in the Makutano area. We appreciate your support!",
    features: ["Sold Out", "Gated Community"],
    mapSrc: "",
  },
  {
    id: 7,
    title: "Royal Garden Phase 6 (Coming Soon)",
    location: "Kithyoko",
    size: "50x100",
    price: "180,000",
    status: "Coming Soon",
    img: "/img/properties/Royal Gardens 5.png",
    images: ["/img/properties/Royal Gardens 5.png"],
    description: "The next phase of our popular Royal Garden series.",
    features: ["Pre-booking", "Prime Location"],
    mapSrc: "",
  },
];
