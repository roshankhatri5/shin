export interface PricingTier {
  id: string
  name: string
  price: number
  description: string
  includes: string[]
}

export interface Service {
  id: string
  slug: string
  name: string
  shortDescription: string
  fullDescription: string
  category: ServiceCategory
  image: string
  pricing: PricingTier[]
  duration: {
    min: number
    max: number
  }
  features: string[]
  popular?: boolean
}

export type ServiceCategory = 
  | 'manicure'
  | 'pedicure'
  | 'nail-art'
  | 'gel-polish'
  | 'extensions'
  | 'spa-treatments'

export const serviceCategoryLabels: Record<ServiceCategory, string> = {
  'manicure': 'Manicures',
  'pedicure': 'Pedicures',
  'nail-art': 'Nail Art & Design',
  'gel-polish': 'Gel Polish',
  'extensions': 'Extensions',
  'spa-treatments': 'Spa Treatments',
}

export const services: Service[] = [
  {
    id: '1',
    slug: 'classic-manicure',
    name: 'Classic Manicure',
    shortDescription: 'Traditional nail care with expert shaping and polish',
    fullDescription: 'Our classic manicure includes nail shaping, cuticle care, hand massage, and your choice of polish. Perfect for maintaining healthy, beautiful nails.',
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
    pricing: [
      {
        id: '1-1',
        name: 'Classic',
        price: 35,
        description: 'Standard manicure service',
        includes: ['Nail shaping', 'Cuticle care', 'Hand massage', 'Polish application'],
      },
      {
        id: '1-2',
        name: 'Deluxe',
        price: 50,
        description: 'Enhanced with extended massage',
        includes: ['Everything in Classic', 'Extended hand & arm massage', 'Paraffin wax treatment', 'Premium polish'],
      },
    ],
    duration: { min: 30, max: 45 },
    features: ['Nail shaping', 'Cuticle care', 'Hand massage', 'Polish'],
    popular: true,
  },
  {
    id: '2',
    slug: 'gel-manicure',
    name: 'Gel Manicure',
    shortDescription: 'Long-lasting gel polish with UV/LED curing',
    fullDescription: 'Enjoy up to 2 weeks of chip-free, high-shine nails with our professional gel manicure service.',
    category: 'gel-polish',
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&h=300&fit=crop',
    pricing: [
      {
        id: '2-1',
        name: 'Gel Manicure',
        price: 50,
        description: 'Professional gel polish application',
        includes: ['Nail prep', 'Cuticle care', 'Gel polish', 'UV/LED curing'],
      },
      {
        id: '2-2',
        name: 'Gel with Design',
        price: 70,
        description: 'Gel manicure with nail art',
        includes: ['Everything in Gel Manicure', 'Custom nail art design', 'Embellishments'],
      },
    ],
    duration: { min: 45, max: 60 },
    features: ['Long-lasting', 'Chip-resistant', 'High shine', 'Quick dry'],
    popular: true,
  },
  {
    id: '3',
    slug: 'spa-pedicure',
    name: 'Spa Pedicure',
    shortDescription: 'Luxurious foot treatment with massage and polish',
    fullDescription: 'Indulge in our signature spa pedicure featuring a relaxing soak, exfoliation, massage, and polish for beautifully pampered feet.',
    category: 'pedicure',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop',
    pricing: [
      {
        id: '3-1',
        name: 'Classic Spa',
        price: 55,
        description: 'Essential spa pedicure',
        includes: ['Foot soak', 'Nail shaping', 'Cuticle care', 'Callus removal', 'Foot massage', 'Polish'],
      },
      {
        id: '3-2',
        name: 'Deluxe Spa',
        price: 75,
        description: 'Premium spa experience',
        includes: ['Everything in Classic Spa', 'Sugar scrub exfoliation', 'Hot towel treatment', 'Extended massage', 'Paraffin wax'],
      },
    ],
    duration: { min: 60, max: 75 },
    features: ['Relaxing soak', 'Exfoliation', 'Massage', 'Callus removal'],
    popular: true,
  },
  {
    id: '4',
    slug: 'acrylic-extensions',
    name: 'Acrylic Extensions',
    shortDescription: 'Durable acrylic nail extensions for length and strength',
    fullDescription: 'Create the perfect nail length and shape with our professional acrylic extensions. Customizable length and design.',
    category: 'extensions',
    image: 'https://images.unsplash.com/photo-1604902396830-aca29761a77a?w=400&h=300&fit=crop',
    pricing: [
      {
        id: '4-1',
        name: 'Full Set',
        price: 65,
        description: 'Complete acrylic extension set',
        includes: ['Nail prep', 'Acrylic application', 'Shaping', 'Basic polish'],
      },
      {
        id: '4-2',
        name: 'Fill-in',
        price: 45,
        description: 'Acrylic maintenance',
        includes: ['Fill existing acrylics', 'Shaping', 'Polish'],
      },
    ],
    duration: { min: 90, max: 120 },
    features: ['Custom length', 'Durable', 'Natural look', 'Long-lasting'],
  },
  {
    id: '5',
    slug: 'nail-art-design',
    name: 'Nail Art & Design',
    shortDescription: 'Custom nail art created by our talented artists',
    fullDescription: 'Express your creativity with custom nail art. From simple accents to intricate designs, our artists bring your vision to life.',
    category: 'nail-art',
    image: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=400&h=300&fit=crop',
    pricing: [
      {
        id: '5-1',
        name: 'Simple Design',
        price: 10,
        description: 'Per nail - basic designs',
        includes: ['Accent nail', 'Simple patterns', 'Stripes or dots'],
      },
      {
        id: '5-2',
        name: 'Complex Design',
        price: 20,
        description: 'Per nail - intricate art',
        includes: ['Custom artwork', 'Detailed designs', '3D embellishments'],
      },
    ],
    duration: { min: 15, max: 45 },
    features: ['Custom designs', 'Expert artists', 'Unique styles', 'Trending looks'],
    popular: true,
  },
  {
    id: '6',
    slug: 'gel-pedicure',
    name: 'Gel Pedicure',
    shortDescription: 'Spa pedicure with long-lasting gel polish',
    fullDescription: 'Combine the luxury of our spa pedicure with the durability of gel polish for beautiful, chip-free toes.',
    category: 'pedicure',
    image: 'https://images.unsplash.com/photo-1619451334792-150bdee346f6?w=400&h=300&fit=crop',
    pricing: [
      {
        id: '6-1',
        name: 'Gel Pedicure',
        price: 65,
        description: 'Spa pedicure with gel polish',
        includes: ['All spa pedicure services', 'Gel polish application', 'UV/LED curing'],
      },
    ],
    duration: { min: 75, max: 90 },
    features: ['Long-lasting polish', 'Spa treatment', 'No chipping', 'High shine'],
  },
  {
    id: '7',
    slug: 'french-manicure',
    name: 'French Manicure',
    shortDescription: 'Timeless elegance with classic French tips',
    fullDescription: 'The ultimate in elegant sophistication. Our French manicure features perfectly painted white tips for a classic, refined look.',
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1594608661623-f29eb6b99ba3?w=400&h=300&fit=crop',
    pricing: [
      {
        id: '7-1',
        name: 'Classic French',
        price: 40,
        description: 'Traditional French manicure',
        includes: ['Nail prep', 'Cuticle care', 'French tip application', 'Hand massage'],
      },
      {
        id: '7-2',
        name: 'French Gel',
        price: 55,
        description: 'French with gel polish',
        includes: ['Everything in Classic French', 'Gel polish', 'Long-lasting finish'],
      },
    ],
    duration: { min: 40, max: 60 },
    features: ['Classic elegance', 'Perfect tips', 'Professional finish', 'Timeless style'],
  },
  {
    id: '8',
    slug: 'paraffin-treatment',
    name: 'Paraffin Wax Treatment',
    shortDescription: 'Deep moisturizing treatment for hands or feet',
    fullDescription: 'Deeply moisturize and soften skin with our therapeutic paraffin wax treatment. Perfect add-on to any service.',
    category: 'spa-treatments',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    pricing: [
      {
        id: '8-1',
        name: 'Hands',
        price: 15,
        description: 'Hand paraffin treatment',
        includes: ['Paraffin dip', 'Heat therapy', 'Deep moisturizing'],
      },
      {
        id: '8-2',
        name: 'Feet',
        price: 15,
        description: 'Foot paraffin treatment',
        includes: ['Paraffin dip', 'Heat therapy', 'Deep moisturizing'],
      },
    ],
    duration: { min: 15, max: 20 },
    features: ['Deep moisturizing', 'Therapeutic heat', 'Soft skin', 'Relaxing'],
  },
]

export const servicePackages = [
  {
    id: 'pkg-1',
    name: 'Monthly Maintenance',
    description: 'Perfect for regular upkeep',
    price: 120,
    savings: 25,
    popular: false,
    includes: [
      '2 Gel Manicures',
      '1 Spa Pedicure',
      '10% off nail art',
      'Priority booking',
    ],
  },
  {
    id: 'pkg-2',
    name: 'Bridal Package',
    description: 'Complete bridal nail care',
    price: 250,
    savings: 50,
    popular: true,
    includes: [
      'Trial session',
      'Wedding day manicure',
      'Wedding day pedicure',
      'Custom nail art',
      'Take-home touch-up kit',
    ],
  },
  {
    id: 'pkg-3',
    name: 'Pamper Day',
    description: 'Full luxury experience',
    price: 150,
    savings: 30,
    popular: false,
    includes: [
      'Deluxe spa pedicure',
      'Deluxe gel manicure',
      'Paraffin treatment',
      'Complimentary beverage',
    ],
  },
]