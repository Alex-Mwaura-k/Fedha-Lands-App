// 1. MOCK DATABASE
export const soldTitlesDB = [
  "FEDHA-001",
  "KJI-550",
  "RYL-102",
  "UNT-300",
  "TEST-123",
];

// 2. INITIAL REVIEWS
export const initialReviews = [
  {
    id: 1,
    name: "James Mwangi",
    role: "Investor",
    location: "Kithyoko",
    // FIXED: Linked to the specific property slug
    propertySlug: "royal-garden-kithyoko-phase-5",
    text: "I was skeptical at first, but Fedha Land delivered my title deed in just 35 days. The site visit was transparent and professional. Highly recommended!",
    rating: 5,
    img: "https://ui-avatars.com/api/?name=James+Mwangi&background=0D6EFD&color=fff",
    date: new Date("2025-01-10"),
  },
  {
    id: 2,
    name: "Sarah Ochieng",
    role: "Home Owner",
    location: "Malindi",
    propertySlug: "kijani-garden-malindi",
    text: "Bought a 1-acre block in Kijani Gardens. The fencing was done exactly as promised. Highly recommend them for diaspora investors looking for genuine land.",
    rating: 5,
    img: "https://ui-avatars.com/api/?name=Sarah+Ochieng&background=DC3545&color=fff",
    date: new Date("2025-01-05"),
  },
  {
    id: 3,
    name: "David Kimutai",
    role: "Business Owner",
    location: "Makutano",
    propertySlug: "unity-gardens",
    text: "The installment plan helped me acquire land without straining my finances. Great customer service from the Ruiru team. Will buy again soon.",
    rating: 4,
    img: "https://ui-avatars.com/api/?name=David+Kimutai&background=198754&color=fff",
    date: new Date("2024-12-28"),
  },
  {
    id: 4,
    name: "Alice Wanjiku",
    role: "Diaspora Client",
    location: "Kithyoko",
    propertySlug: "royal-garden-kithyoko-phase-4",
    text: "Managing this process from the UK was seamless. They sent me video updates of the beacons and fencing. Trustworthy partner indeed.",
    rating: 5,
    img: "https://ui-avatars.com/api/?name=Alice+Wanjiku&background=ffc107&color=000",
    date: new Date("2024-12-15"),
  },
  {
    id: 5,
    name: "Francis Kariuki",
    role: "Partner",
    location: "Ruiru",
    propertySlug: null, // General review
    text: "Collaborating with Fedha has been a breeze. Their transparency in land dealings makes them stand out in the crowded real estate market.",
    rating: 5,
    img: "https://ui-avatars.com/api/?name=Peter+Kamau&background=6f42c1&color=fff",
    date: new Date("2024-11-30"),
  },
  {
    id: 6,
    name: "Grace Mutua",
    role: "Investor",
    location: "Masinga",
    propertySlug: "royal-garden-kithyoko-phase-6",
    text: "The value appreciation in Masinga is real. I bought my plot last year and its value has already gone up.",
    rating: 4,
    img: "https://ui-avatars.com/api/?name=Grace+Mutua&background=20c997&color=fff",
    date: new Date("2024-11-10"),
  },
];
