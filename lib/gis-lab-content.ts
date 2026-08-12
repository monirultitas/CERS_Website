export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What does \"GIS\" stand for?",
    options: [
      "Geographic Information System",
      "Global Imaging Satellite",
      "Geospatial Internet Server",
      "Ground Inspection System",
    ],
    correctIndex: 0,
    explanation:
      "GIS captures, stores, analyzes, and displays data tied to a location: the foundation of everything CERS does.",
  },
  {
    question: "Remote sensing most often collects data using:",
    options: ["Underground sensors", "Satellites or aircraft", "Door-to-door surveys", "Seismographs"],
    correctIndex: 1,
    explanation:
      "Remote sensing means gathering information about the Earth's surface without physical contact, usually from satellites or aircraft.",
  },
  {
    question: "NDVI is commonly used to measure:",
    options: ["Water salinity", "Vegetation health", "Air pressure", "Soil temperature"],
    correctIndex: 1,
    explanation:
      "The Normalized Difference Vegetation Index (NDVI) uses red and near-infrared light reflectance to estimate how healthy and dense vegetation is.",
  },
  {
    question: "A GIS \"raster\" dataset is best described as:",
    options: [
      "A grid of pixels, each holding a value",
      "A single point with coordinates",
      "A table with no spatial data",
      "A 3D printed terrain model",
    ],
    correctIndex: 0,
    explanation:
      "Raster data is pixel-based, think satellite imagery. Vector data, by contrast, uses points, lines, and polygons.",
  },
  {
    question: "Which of these is a real satellite program used for open Earth observation?",
    options: ["Sentinel", "Orion", "Voyager", "Cassini"],
    correctIndex: 0,
    explanation:
      "The Sentinel satellites (from Europe's Copernicus program) provide free, high-frequency imagery CERS uses for water and land monitoring.",
  },
  {
    question: "\"Spatial resolution\" in satellite imagery refers to:",
    options: [
      "How often the satellite passes overhead",
      "The smallest feature size a pixel can distinguish",
      "The satellite's orbital altitude",
      "The image file's color depth",
    ],
    correctIndex: 1,
    explanation:
      "A 10-meter spatial resolution means each pixel represents a 10×10 meter area on the ground; finer resolution reveals smaller features.",
  },
  {
    question: "Tobler's First Law of Geography states that:",
    options: [
      "All maps must use the Mercator projection",
      "Nearby things tend to be more related than distant things",
      "Elevation always increases northward",
      "Water always flows toward the equator",
    ],
    correctIndex: 1,
    explanation: "It's the spatial principle behind interpolation, clustering, and most of spatial analysis, and the quote on our About page.",
  },
  {
    question: "In GeoAI, machine learning models are often trained to:",
    options: [
      "Replace field data collection entirely",
      "Classify land cover or detect change from imagery",
      "Predict stock prices",
      "Generate satellite hardware designs",
    ],
    correctIndex: 1,
    explanation:
      "CERS uses GeoAI to classify land cover, flag flood risk, and detect change over time from satellite imagery, augmenting rather than replacing field work.",
  },
];

export type Landmark = {
  name: string;
  hint: string;
  coordinates: [number, number]; // [lng, lat]
};

export const dhakaLandmarks: Landmark[] = [
  {
    name: "Lalbagh Fort",
    hint: "An incomplete 17th-century Mughal fort complex in Old Dhaka.",
    coordinates: [90.3883, 23.7189],
  },
  {
    name: "Jatiyo Sangsad Bhaban",
    hint: "Bangladesh's National Parliament House, designed by Louis Kahn.",
    coordinates: [90.3792, 23.7622],
  },
  {
    name: "Dhaka University (Curzon Hall)",
    hint: "A historic academic building on Bangladesh's oldest university campus.",
    coordinates: [90.3996, 23.7279],
  },
  {
    name: "Hatirjheel",
    hint: "An urban lake and traffic corridor, also one of our water-quality monitoring points.",
    coordinates: [90.4083, 23.755],
  },
  {
    name: "Sadarghat",
    hint: "Dhaka's historic river port on the Buriganga.",
    coordinates: [90.4074, 23.7104],
  },
  {
    name: "Gulshan Lake",
    hint: "A lake in one of Dhaka's diplomatic and commercial districts.",
    coordinates: [90.4078, 23.7925],
  },
];
