import type { QuizQuestion } from "./gis-lab-content";

export type FunFact = {
  emoji: string;
  /** Short, 2-5 word label shown by default on the visual tile. */
  short: string;
  title: string;
  fact: string;
};

// Facts with a real place on the map — shown as pins on FunFactsMap.
export type MapFact = FunFact & { coordinates: [number, number] };

export const mapFacts: MapFact[] = [
  {
    emoji: "🐅",
    short: "Swimming tigers",
    title: "The Sundarbans is the largest mangrove forest on Earth",
    fact: "Shared between Bangladesh and India, it's home to the Royal Bengal Tiger, the only big cat population known to regularly swim between mangrove islands to hunt.",
    coordinates: [89.1833, 21.9497],
  },
  {
    emoji: "🏖️",
    short: "120km of sand",
    title: "Cox's Bazar: often called the world's longest natural sea beach",
    fact: "Its unbroken, 120km sandy shoreline (no cliffs or rocky breaks) is why it claims the \"longest natural beach\" title.",
    coordinates: [92.0058, 21.4272],
  },
  {
    emoji: "🏙️",
    short: "44,000 people/km²",
    title: "Dhaka is one of the most densely populated cities on the planet",
    fact: "By some measures, the city proper runs around 44,000 people per square kilometer, denser than Manhattan.",
    coordinates: [90.4125, 23.8103],
  },
  {
    emoji: "🌊",
    short: "3 rivers, 1 delta",
    title: "The world's largest river delta",
    fact: "Near Chandpur, the Ganges, Brahmaputra, and Meghna converge before fanning into the Bay of Bengal, the largest river delta on Earth.",
    coordinates: [90.65, 23.23],
  },
];

// Facts without a single map location — shown as compact click-to-reveal tiles.
export const funFacts: FunFact[] = [
  {
    emoji: "🗺️",
    short: "Nobody agrees",
    title: "How many rivers does Bangladesh actually have?",
    fact: "Estimates range from around 300 to over 1,000. Rivers here shift course, dry up, and reappear often enough that a fixed count never sticks.",
  },
  {
    emoji: "📏",
    short: "Almost perfectly flat",
    title: "One of the flattest large countries on Earth",
    fact: "Most of Bangladesh sits less than 10 meters above sea level; a few centimeters of water-level change can submerge huge areas.",
  },
  {
    emoji: "🇳🇱",
    short: "Delta cousins",
    title: "Bangladesh and the Netherlands are geographic cousins",
    fact: "Both are low-lying delta nations built on river silt, but Bangladesh packs roughly ten times the Netherlands' population into a similarly flood-exposed landscape.",
  },
  {
    emoji: "🛰️",
    short: "50+ years watching",
    title: "Satellites have watched Bangladesh change since 1972",
    fact: "NASA's Landsat program has continuously imaged Earth's surface since July 1972, long enough to watch entire rivers migrate across the delta.",
  },
  {
    emoji: "📡",
    short: "One shot, 12,000 km²",
    title: "One satellite \"tile\" can cover an entire small country",
    fact: "A single Sentinel-2 image tile covers about 110km × 110km, which is why satellite monitoring beats any ground survey for speed.",
  },
  {
    emoji: "🚩",
    short: "Not just a design",
    title: "The flag's red circle carries real meaning",
    fact: "Green represents lush vegetation; the red disc represents both the sun rising over Bengal and the blood of 1971's Liberation War martyrs.",
  },
];

export type CompareStat = {
  label: string;
  value: number;
  displayValue: string;
};

export type Comparison = {
  title: string;
  unit: string;
  stats: CompareStat[];
};

export const comparisons: Comparison[] = [
  {
    title: "Population density",
    unit: "people per km²",
    stats: [
      { label: "Dhaka (city proper)", value: 44000, displayValue: "~44,000" },
      { label: "Manhattan", value: 28872, displayValue: "~28,900" },
    ],
  },
  {
    title: "Total population",
    unit: "million people, 2025",
    stats: [
      { label: "Bangladesh", value: 175, displayValue: "~175M" },
      { label: "Netherlands", value: 18, displayValue: "~18M" },
    ],
  },
];

export const trivia: QuizQuestion[] = [
  {
    question: "What animal is famously adapted to swim between the Sundarbans' mangrove islands?",
    options: ["Royal Bengal Tiger", "Saltwater crocodile", "River dolphin", "Fishing cat"],
    correctIndex: 0,
    explanation:
      "The Royal Bengal Tiger is the only big cat population in the world known to regularly swim between mangrove islands to hunt.",
  },
  {
    question: "Bangladesh sits on the delta formed by which three rivers?",
    options: [
      "Nile, Congo, Niger",
      "Ganges, Brahmaputra, Meghna",
      "Mekong, Yangtze, Irrawaddy",
      "Indus, Sutlej, Chenab",
    ],
    correctIndex: 1,
    explanation:
      "The Ganges–Brahmaputra–Meghna Delta is the largest river delta in the world, draining water from across three countries.",
  },
  {
    question: "Roughly how long is Cox's Bazar's beach?",
    options: ["12 km", "45 km", "120 km", "300 km"],
    correctIndex: 2,
    explanation: "Its roughly 120km unbroken shoreline is why it's often called the world's longest natural sea beach.",
  },
  {
    question: "What's the honest answer to \"how many rivers does Bangladesh have\"?",
    options: [
      "Exactly 230, by treaty",
      "It depends who's counting; estimates range from hundreds to over 1,000",
      "Zero, they're all canals",
      "Exactly 54",
    ],
    correctIndex: 1,
    explanation:
      "Rivers here shift course, dry up, and reappear often enough that no single count has ever stuck.",
  },
  {
    question: "What does Bangladesh have in common with the Netherlands?",
    options: [
      "Both are mountainous",
      "Both are low-lying delta nations that engineer around flooding",
      "Both have no rivers",
      "Both are landlocked",
    ],
    correctIndex: 1,
    explanation:
      "Both nations are built on low-lying river silt and have long histories of engineering to manage water, though Bangladesh has roughly ten times the population in a similar footprint.",
  },
  {
    question: "How long has NASA's Landsat program been continuously imaging Earth?",
    options: ["About 10 years", "About 25 years", "Over 50 years, since 1972", "Since 2000"],
    correctIndex: 2,
    explanation: "Landsat 1 launched in July 1972, the longest continuous Earth-observation record in existence.",
  },
  {
    question: "What does the red circle on the Bangladesh flag represent?",
    options: [
      "The national flower",
      "A rising sun and the blood of 1971's Liberation War martyrs",
      "The national flag of a former colonial power",
      "Nothing, it's purely decorative",
    ],
    correctIndex: 1,
    explanation:
      "The green represents the land's lush vegetation; the red disc carries a dual meaning: the sun rising over Bengal, and remembrance of those who died in the 1971 Liberation War.",
  },
];
