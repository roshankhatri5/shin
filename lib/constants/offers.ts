export interface Offer {
  id: string
  title: string
  description: string
  discount: string
  value: number
  validFrom: string
  validUntil: string
  terms: string[]
  code?: string
  badge?: 'new' | 'limited' | 'popular'
  category: 'service' | 'package' | 'seasonal'
}

export interface MembershipTier {
  id: string
  name: string
  price: number
  billingPeriod: 'monthly' | 'yearly'
  savings: number
  benefits: string[]
  popular?: boolean
}

export const currentOffers: Offer[] = [
  {
    id: '1',
    title: 'New Client Special',
    description: 'First-time guests receive 20% off any service',
    discount: '20% OFF',
    value: 20,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    terms: [
      'Valid for first-time clients only',
      'Cannot be combined with other offers',
      'Must mention offer when booking',
    ],
    code: 'WELCOME20',
    badge: 'new',
    category: 'service',
  },
  {
    id: '2',
    title: 'Referral Reward',
    description: 'Refer a friend and both receive $25 off your next service',
    discount: '$25 OFF',
    value: 25,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    terms: [
      'Friend must be a new client',
      'Credit applied after friend\'s first appointment',
      'No limit on referrals',
      'Credit valid for 6 months',
    ],
    badge: 'popular',
    category: 'service',
  },
  {
    id: '3',
    title: 'Birthday Month Special',
    description: 'Enjoy a complimentary upgrade on any service during your birthday month',
    discount: 'FREE UPGRADE',
    value: 15,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    terms: [
      'Valid ID required',
      'Must book during birthday month',
      'Upgrade value up to $15',
      'One per person per year',
    ],
    category: 'service',
  },
  {
    id: '4',
    title: 'Midweek Spa Day',
    description: 'Tuesday-Thursday spa pedicures are $10 off',
    discount: '$10 OFF',
    value: 10,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    terms: [
      'Valid Tuesday through Thursday only',
      'Applies to spa pedicures only',
      'Must book before 3 PM',
      'Cannot be combined with packages',
    ],
    badge: 'limited',
    category: 'service',
  },
  {
    id: '5',
    title: 'Student Discount',
    description: 'Students save 15% on all services with valid ID',
    discount: '15% OFF',
    value: 15,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    terms: [
      'Valid student ID required',
      'Available Monday-Thursday',
      'Not valid on packages',
      'Cannot be combined with other discounts',
    ],
    category: 'service',
  },
  {
    id: '6',
    title: 'Bridal Party Package',
    description: 'Book 4+ services and receive 20% off the entire party',
    discount: '20% OFF',
    value: 20,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    terms: [
      'Minimum 4 people required',
      'All services must be booked same day',
      'Advance booking required',
      'Includes complimentary champagne',
    ],
    badge: 'popular',
    category: 'package',
  },
  {
    id: '7',
    title: 'Spring Refresh Special',
    description: 'Gel manicure + spa pedicure combo for $99',
    discount: 'SAVE $21',
    value: 21,
    validFrom: '2024-03-01',
    validUntil: '2024-05-31',
    terms: [
      'Must book both services together',
      'Valid March through May',
      'Includes basic nail art',
      'Subject to availability',
    ],
    badge: 'limited',
    category: 'seasonal',
  },
  {
    id: '8',
    title: 'Mother\'s Day Package',
    description: 'Treat mom to a deluxe spa experience - $130 value',
    discount: '$25 OFF',
    value: 25,
    validFrom: '2024-05-01',
    validUntil: '2024-05-31',
    terms: [
      'Includes deluxe spa pedicure',
      'Includes deluxe gel manicure',
      'Includes paraffin treatment',
      'Gift wrapping available',
    ],
    badge: 'limited',
    category: 'seasonal',
  },
]

export const membershipTiers: MembershipTier[] = [
  {
    id: 'basic',
    name: 'Basic Member',
    price: 49,
    billingPeriod: 'monthly',
    savings: 100,
    benefits: [
      '10% off all services',
      'Priority booking',
      'Birthday month gift',
      'Exclusive member events',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Member',
    price: 89,
    billingPeriod: 'monthly',
    savings: 200,
    popular: true,
    benefits: [
      '15% off all services',
      'Priority booking',
      'One free gel manicure monthly',
      'Birthday month gift',
      'Exclusive member events',
      'Bring a friend discount',
    ],
  },
  {
    id: 'vip',
    name: 'VIP Member',
    price: 499,
    billingPeriod: 'yearly',
    savings: 500,
    benefits: [
      '20% off all services',
      'VIP priority booking',
      'Two free services monthly',
      'Birthday month spa package',
      'Exclusive VIP events',
      'Unlimited bring a friend discount',
      'Free nail art upgrades',
      'Complimentary product samples',
    ],
  },
]