export interface Testimonial {
  id: string
  customerName: string
  rating: number
  reviewText: string
  service: string
  date: string
  verified: boolean
  featured: boolean
  image?: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    customerName: 'Jennifer Martinez',
    rating: 5,
    reviewText: 'Absolutely love this salon! Sarah did an amazing job on my wedding nails. The attention to detail was incredible, and they lasted perfectly through my honeymoon. Highly recommend!',
    service: 'Bridal Nail Package',
    date: '2024-03-15',
    verified: true,
    featured: true,
    image: '/images/testimonials/jennifer-m.jpg',
  },
  {
    id: '2',
    customerName: 'Rachel Thompson',
    rating: 5,
    reviewText: 'The best nail salon experience I\'ve ever had! The spa pedicure was so relaxing, and my nails have never looked better. Maya has magic hands!',
    service: 'Deluxe Spa Pedicure',
    date: '2024-03-10',
    verified: true,
    featured: true,
  },
  {
    id: '3',
    customerName: 'Amanda Lee',
    rating: 5,
    reviewText: 'Emily created the most beautiful nail art for me. She really listened to what I wanted and exceeded my expectations. The salon is gorgeous and so clean!',
    service: 'Gel Manicure with Nail Art',
    date: '2024-03-08',
    verified: true,
    featured: true,
  },
  {
    id: '4',
    customerName: 'Michelle Davis',
    rating: 5,
    reviewText: 'I\'ve been coming here for 2 years and wouldn\'t go anywhere else. The quality is consistently excellent, and the staff is so friendly and professional.',
    service: 'Monthly Maintenance Package',
    date: '2024-03-05',
    verified: true,
    featured: true,
  },
  {
    id: '5',
    customerName: 'Lisa Wang',
    rating: 5,
    reviewText: 'Jessica is amazing with natural, elegant looks. My gel manicure lasted 3 weeks without chipping! The salon is my happy place.',
    service: 'Gel Manicure',
    date: '2024-02-28',
    verified: true,
    featured: false,
  },
  {
    id: '6',
    customerName: 'Sarah Johnson',
    rating: 5,
    reviewText: 'The French manicure I got here is perfection! So classic and elegant. The whole experience was luxurious from start to finish.',
    service: 'French Gel Manicure',
    date: '2024-02-25',
    verified: true,
    featured: false,
  },
  {
    id: '7',
    customerName: 'Rebecca Brown',
    rating: 5,
    reviewText: 'My acrylic extensions look so natural and beautiful! Amanda really knows what she\'s doing. Great salon with a wonderful atmosphere.',
    service: 'Acrylic Extensions',
    date: '2024-02-20',
    verified: true,
    featured: false,
  },
  {
    id: '8',
    customerName: 'Nicole Taylor',
    rating: 5,
    reviewText: 'The pamper day package was the best gift I could give myself! Left feeling completely refreshed and my nails look incredible.',
    service: 'Pamper Day Package',
    date: '2024-02-15',
    verified: true,
    featured: false,
  },
]

export const reviewStats = {
  averageRating: 5.0,
  totalReviews: testimonials.length,
  ratingDistribution: {
    5: 8,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  },
}