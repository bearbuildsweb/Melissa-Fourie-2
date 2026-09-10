import { PortfolioItem, Testimonial } from '../types';

// Direct imports for uploaded shoot images:
import webersburg1 from '../assets/images/BRIDAL/Webersburg 2026/1.jpg';
import webersburg2 from '../assets/images/BRIDAL/Webersburg 2026/2.jpg';
import constantia1 from '../assets/images/BRIDAL/Constantia 2026/1.jpg';
import constantia2 from '../assets/images/BRIDAL/Constantia 2026/2.jpg';
import nuy1 from '../assets/images/BRIDAL/Nuy Valley 2026/1.jpg';
import nuy2 from '../assets/images/BRIDAL/Nuy Valley 2026/2.jpg';
import heroEditorialImg from '../assets/images/hero_editorial_portrait_1788838659628.jpg';
import portfolioPrepImg from '../assets/images/portfolio_editorial_prep_1788838710557.jpg';

// Testimonial client avatars
import testimonialZaneleImg from '../assets/images/testimonial_zanele_1788342425833.jpg';
import testimonialNandiImg from '../assets/images/testimonial_nandi_1788342438187.jpg';
import testimonialThandoImg from '../assets/images/testimonial_thando_1788342456476.jpg';
import testimonialLesediImg from '../assets/images/testimonial_lesedi_1788342467290.jpg';

export const SITE_CONFIG = {
  brandName: 'MELISSA FOURIE',
  brandFullName: 'Melissa Fourie Makeup',
  tagline: 'Refined hair & makeup artistry.',
  subheadline: 'Luxury hair and makeup artistry built around refined beauty, elevated service, and an unmistakably polished client experience.',
  whatsappNumber: '+27828841164',
  whatsappDisplay: '082 884 1164',
  email: 'bearbuildsweb@gmail.com',
  instagram: '@melissafouriemakeup',
  instagramUrl: 'https://www.instagram.com/melissafouriemakeup/',
  location: 'Private Studio & On-Location Artistry',
  studioAddress: 'Private Atelier & On-Location Destinations',
};

// Vite dynamic glob scanning to automatically discover any subdirectories inside BRIDAL and EDITORIAL
const bridalGlob = import.meta.glob<{ default: string }>(
  '../assets/images/BRIDAL/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}',
  { eager: true }
);

const editorialGlob = import.meta.glob<{ default: string }>(
  [
    '../assets/images/EDITORIAL/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}',
    '../assets/images/EVENT/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}',
  ],
  { eager: true }
);

function extractShootsFromGlob(
  globRecord: Record<string, { default: string }>
): Record<string, string[]> {
  const map: Record<string, { path: string; url: string }[]> = {};
  for (const [filePath, mod] of Object.entries(globRecord)) {
    const parts = filePath.split('/');
    if (parts.length >= 2) {
      const folderName = parts[parts.length - 2];
      if (!map[folderName]) map[folderName] = [];
      map[folderName].push({ path: filePath, url: mod.default });
    }
  }
  const result: Record<string, string[]> = {};
  for (const [folderName, items] of Object.entries(map)) {
    items.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));
    result[folderName] = items.map((i) => i.url);
  }
  return result;
}

const bridalShoots = extractShootsFromGlob(bridalGlob);
const editorialShoots = extractShootsFromGlob(editorialGlob);

// Base known shoots with bespoke editorial descriptions
const KNOWN_SHOOTS: PortfolioItem[] = [
  {
    id: 'bridal-webersburg-2026',
    title: 'Webersburg 2026',
    category: 'BRIDAL',
    subtitle: 'The brief called for something ethereal, feminine, and timeless.',
    images: bridalShoots['Webersburg 2026']?.length >= 2
      ? bridalShoots['Webersburg 2026']
      : [webersburg1, webersburg2],
    image: (bridalShoots['Webersburg 2026'] && bridalShoots['Webersburg 2026'][0]) || webersburg1,
    aspectRatio: 'portrait',
    featuredQuote: '“Radiant, timeless bridal elegance captured against the Stellenbosch mountains.”',
    description: 'Radiant, high-definition bridal skin and architectural hair styling captured at the iconic Webersburg Wine Estate in Stellenbosch. Formulated for natural daylight ceremonies, sunset vineyard portraits, and tear-proof 16-hour longevity.',
    technique: 'Micro-fine dermal blending, underpainted cream blush, sculpted soft waves & tear-proof lash bonding.',
    palette: ['#F5E6DA', '#D4A373', '#9D8189', '#4A3B32'],
    keyProducts: ['Charlotte Tilbury', 'Dior Backstage', 'Armani Luminous Silk', 'Oribe Hair Care'],
    client: 'Webersburg Estate Wedding',
    year: '2026',
  },
  {
    id: 'bridal-constantia-2026',
    title: 'Constantia 2026',
    category: 'BRIDAL',
    subtitle: 'The brief was terracotta tones, warmed by summer skin',
    images: bridalShoots['Constantia 2026']?.length >= 2
      ? bridalShoots['Constantia 2026']
      : [constantia1, constantia2],
    image: (bridalShoots['Constantia 2026'] && bridalShoots['Constantia 2026'][0]) || constantia1,
    aspectRatio: 'portrait',
    featuredQuote: '“Luminous, romantic bridal beauty styled amidst historic Cape Dutch vineyard oaks.”',
    description: 'Romantic, luminous bridal skin prep with soft rosewood undertones and a textured artisan bridal chignon, captured across the historic oak-lined avenues of Constantia. Created for soft daylight ceremonies and all-evening celebrations.',
    technique: 'Dewy micro-dermal priming, featherweight silk lashes, rosewood satin lip & structural romantic chignon with pearl pins.',
    palette: ['#F7EBE1', '#E2BC9B', '#A37081', '#3A272C'],
    keyProducts: ['Charlotte Tilbury', 'Dior Backstage Rosy Glow', 'Armani Luminous Silk', 'Kérastase'],
    client: 'Constantia Valley Wedding',
    year: '2026',
  },
  {
    id: 'bridal-nuy-valley-2026',
    title: 'Nuy Valley 2026',
    category: 'BRIDAL',
    subtitle: 'The brief called for something ethereal, feminine, and timeless.',
    images: bridalShoots['Nuy Valley 2026']?.length >= 2
      ? bridalShoots['Nuy Valley 2026']
      : [nuy1, nuy2],
    image: (bridalShoots['Nuy Valley 2026'] && bridalShoots['Nuy Valley 2026'][0]) || nuy1,
    aspectRatio: 'portrait',
    featuredQuote: '“Golden hour mountain glow and sculpted Hollywood bridal waves.”',
    description: 'Sun-drenched golden hour bridal artistry set against the dramatic mountain backdrop and olive groves of the Nuy Valley. Features warm bronze dermal contouring, velvet nude lip framing, and cascading sculpted waves built to withstand outdoor mountain breeze.',
    technique: 'Golden micro-strobe highlight, warm bronze eye wash, velvet nude lip & humidity-resistant thermal wave bonding.',
    palette: ['#FDF6E2', '#DDA15E', '#BC6C25', '#283618'],
    keyProducts: ['Patrick Ta Major Glow', 'Tom Ford Beauty', 'NARS Radiant Creamy', 'Oribe Texturizing Spray'],
    client: 'Nuy Valley Mountain Wedding',
    year: '2026',
  },
  {
    id: 'editorial-editorial-2026',
    title: 'Editorial 2026',
    category: 'EDITORIAL',
    subtitle: 'High-Fashion Red Carpet, Gala & Editorial Glamour',
    images: editorialShoots['Editorial 2026']?.length >= 2
      ? editorialShoots['Editorial 2026']
      : [heroEditorialImg, portfolioPrepImg],
    image: (editorialShoots['Editorial 2026'] && editorialShoots['Editorial 2026'][0]) || heroEditorialImg,
    aspectRatio: 'portrait',
    featuredQuote: '“Sculptural, camera-ready editorial glamour engineered for high-intensity evening lighting.”',
    description: 'Sculptural, camera-ready editorial glamour featuring precision bone contouring, velvet nude lip framing, and sleek red-carpet hair finishing engineered for high-intensity evening flash and studio lighting.',
    technique: 'High-definition strobe contouring, feline smoked liner & humidity-resistant veil.',
    palette: ['#1C1917', '#78350F', '#D97706', '#FEF3C7'],
    keyProducts: ['Pat McGrath Labs', 'Fenty Pro Filt\'r', 'Patrick Ta', 'Balmain Hair'],
    client: 'Cape Town Editorial Gala',
    year: '2026',
  },
];

// Combine known shoots and any dynamically discovered subdirectories in BRIDAL/ or EDITORIAL/
const dynamicBridalShoots: PortfolioItem[] = Object.entries(bridalShoots)
  .filter(([folderName]) => !KNOWN_SHOOTS.some((s) => s.title.toLowerCase() === folderName.toLowerCase()))
  .map(([folderName, images], idx) => ({
    id: `bridal-dynamic-${idx}-${folderName.toLowerCase().replace(/\s+/g, '-')}`,
    title: folderName,
    category: 'BRIDAL' as const,
    subtitle: `Bespoke Bridal Hair & Makeup Artistry • ${folderName}`,
    images: images.length >= 2 ? images.slice(0, 2) : [images[0], images[0]],
    image: images[0],
    aspectRatio: 'portrait' as const,
    featuredQuote: `“Signature bridal radiance and tailored styling created for ${folderName}.”`,
    description: `Bespoke bridal hair and makeup artistry captured on location for ${folderName}, celebrating natural beauty and seamless all-day longevity.`,
    technique: 'Skin prep hydration, precision contouring & long-wear bridal wave styling.',
    palette: ['#F5E6DA', '#D4A373', '#9D8189', '#4A3B32'],
    keyProducts: ['Charlotte Tilbury', 'Dior Backstage', 'Armani Luminous Silk', 'Oribe'],
    client: `${folderName} Wedding`,
    year: '2026',
  }));

const dynamicEditorialShoots: PortfolioItem[] = Object.entries(editorialShoots)
  .filter(([folderName]) => !KNOWN_SHOOTS.some((s) => s.title.toLowerCase() === folderName.toLowerCase()))
  .map(([folderName, images], idx) => ({
    id: `editorial-dynamic-${idx}-${folderName.toLowerCase().replace(/\s+/g, '-')}`,
    title: folderName,
    category: 'EDITORIAL' as const,
    subtitle: `High-Fashion & Editorial Glamour • ${folderName}`,
    images: images.length >= 2 ? images.slice(0, 2) : [images[0], images[0]],
    image: images[0],
    aspectRatio: 'portrait' as const,
    featuredQuote: `“High-impact editorial artistry and tailored styling created for ${folderName}.”`,
    description: `Bespoke editorial hair and makeup artistry captured on location for ${folderName}, engineered for striking camera presence and flawless endurance.`,
    technique: 'Strobe contouring, smoky lash definition & thermal lock styling.',
    palette: ['#1C1917', '#78350F', '#D97706', '#FEF3C7'],
    keyProducts: ['Pat McGrath Labs', 'Fenty Beauty', 'Patrick Ta', 'Ouai'],
    client: `${folderName} Editorial`,
    year: '2026',
  }));

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  ...KNOWN_SHOOTS,
  ...dynamicBridalShoots,
  ...dynamicEditorialShoots,
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'My hair and makeup stayed completely fresh from our morning preparations through our sunset vineyard photos and dancing until midnight. Melissa gave me the exact radiant look I dreamed of.',
    clientName: 'Zanele K.',
    role: 'Bride',
    occasion: 'Webersburg Winelands Wedding',
    image: testimonialZaneleImg,
    date: '2026',
    lookTitle: 'Webersburg 2026',
  },
  {
    id: 't-2',
    quote: 'Melissa created the most sensational red carpet look for our gala evening. The skin undertone match was perfection—no flashback under flash cameras, just pure golden elegance.',
    clientName: 'Nandi M.',
    role: 'Gala Host',
    occasion: 'Cape Town Editorial Gala',
    image: testimonialNandiImg,
    date: '2026',
    lookTitle: 'Editorial 2026',
  },
  {
    id: 't-3',
    quote: 'Her professionalism, calm energy, and eye for bridal detail are unmatched. She made every member of the bridal party feel relaxed and breathtakingly beautiful.',
    clientName: 'Thando N.',
    role: 'Bride',
    occasion: 'Constantia Valley Wedding',
    image: testimonialThandoImg,
    date: '2026',
    lookTitle: 'Constantia 2026',
  },
  {
    id: 't-4',
    quote: 'From trial to shoot day, the communication and execution were flawless. The makeup was lightweight, comfortable, and looked completely high-fashion in every high-res portrait.',
    clientName: 'Lesedi B.',
    role: 'Bride',
    occasion: 'Nuy Valley Mountain Wedding',
    image: testimonialLesediImg,
    date: '2026',
    lookTitle: 'Nuy Valley 2026',
  },
];
