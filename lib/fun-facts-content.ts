import type { QuizQuestion } from "./gis-lab-content";

export type FunFact = {
  emoji: string;
  title: string;
  fact: string;
};

export const funFacts: FunFact[] = [
  {
    emoji: "🐅",
    title: "The Sundarbans is the largest mangrove forest on Earth",
    fact: "Shared between Bangladesh and India, the Sundarbans is home to the Royal Bengal Tiger — the only big cat population in the world adapted to swim between mangrove islands and hunt in tidal water.",
  },
  {
    emoji: "🌊",
    title: "Bangladesh sits on the world's largest river delta",
    fact: "The Ganges–Brahmaputra–Meghna Delta drains water from the Himalayas across three countries before fanning out into the Bay of Bengal — which is exactly why remote sensing matters so much here: the land itself is reshaped by rivers year to year.",
  },
  {
    emoji: "🏖️",
    title: "Cox's Bazar is often called the world's longest natural sea beach",
    fact: "Its unbroken, 120km sandy shoreline (no cliffs or rocky breaks) is why it claims the \"longest natural beach\" title — though depending on how you measure, a few beaches elsewhere edge it out on raw length.",
  },
  {
    emoji: "🗺️",
    title: "Nobody actually agrees on how many rivers Bangladesh has",
    fact: "Estimates range from around 300 to over 1,000, depending on the season and who's counting — rivers here shift course, dry up, and reappear often enough that a fixed number is almost a contradiction in terms.",
  },
  {
    emoji: "📏",
    title: "It's one of the flattest large countries on Earth",
    fact: "Most of Bangladesh sits less than 10 meters above sea level. That flatness is a big reason satellite-derived elevation and flood models are so critical here — a few centimeters of water-level change can submerge huge areas.",
  },
  {
    emoji: "🏙️",
    title: "Dhaka is one of the most densely populated cities on the planet",
    fact: "By some measures, the city proper runs around 44,000 people per square kilometer — well above Manhattan's roughly 29,000, one of the densest urban populations on Earth.",
  },
  {
    emoji: "🇳🇱",
    title: "Bangladesh and the Netherlands are geographic cousins",
    fact: "Both are low-lying delta nations built on river silt, both engineer extensively around flooding — but Bangladesh packs roughly ten times the Netherlands' population into a similarly flood-exposed landscape.",
  },
  {
    emoji: "🛰️",
    title: "Satellites have been watching Bangladesh change since 1972",
    fact: "NASA's Landsat program has continuously imaged Earth's surface since Landsat 1 launched in July 1972 — over 50 years of uninterrupted record, long enough to watch entire rivers migrate across the delta.",
  },
  {
    emoji: "📡",
    title: "One satellite \"tile\" can cover an entire small country",
    fact: "A single Sentinel-2 image tile covers about 110km × 110km — roughly 12,000 square kilometers in one shot, which is why satellite monitoring can cover Bangladesh's water bodies far faster than any ground survey.",
  },
  {
    emoji: "🚩",
    title: "The flag's red circle isn't just a design choice",
    fact: "The green field represents the lush vegetation of the land; the red disc represents both the sun rising over Bengal and the blood of those who died in the 1971 Liberation War.",
  },
];

export type BdWorldStat = {
  label: string;
  bd: string;
  comparison: string;
};

export const bdVsWorld: BdWorldStat[] = [
  { label: "Longest natural sea beach", bd: "Cox's Bazar, ~120 km", comparison: "unbroken by cliffs or rock" },
  { label: "Largest mangrove forest", bd: "The Sundarbans", comparison: "shared with India" },
  { label: "Largest river delta", bd: "Ganges–Brahmaputra–Meghna", comparison: "drains 3 countries" },
  { label: "Continuous satellite record", bd: "50+ years (Landsat, since 1972)", comparison: "oldest Earth-imaging program" },
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
      "It depends who's counting — estimates range from hundreds to over 1,000",
      "Zero — they're all canals",
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
      "Both nations are built on low-lying river silt and have long histories of engineering to manage water — though Bangladesh has roughly ten times the population in a similar footprint.",
  },
  {
    question: "How long has NASA's Landsat program been continuously imaging Earth?",
    options: ["About 10 years", "About 25 years", "Over 50 years, since 1972", "Since 2000"],
    correctIndex: 2,
    explanation: "Landsat 1 launched in July 1972 — the longest continuous Earth-observation record in existence.",
  },
  {
    question: "What does the red circle on the Bangladesh flag represent?",
    options: [
      "The national flower",
      "A rising sun and the blood of 1971's Liberation War martyrs",
      "The national flag of a former colonial power",
      "Nothing — it's purely decorative",
    ],
    correctIndex: 1,
    explanation:
      "The green represents the land's lush vegetation; the red disc carries a dual meaning — the sun rising over Bengal, and remembrance of those who died in the 1971 Liberation War.",
  },
];
