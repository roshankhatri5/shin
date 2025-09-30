export interface TeamMember {
  id: string
  slug: string
  name: string
  role: string
  bio: string
  specialties: string[]
  yearsExperience: number
  image: string
  featured: boolean
  certifications?: string[]
  instagram?: string
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Master Nail Technician & Owner',
    bio: 'With over 15 years of experience, Sarah founded Luxury Nail Salon to bring high-end nail artistry to the community. Her passion for creativity and precision has earned her recognition in industry publications.',
    specialties: ['Nail Art', 'Gel Extensions', 'Custom Designs', 'Bridal Nails'],
    yearsExperience: 15,
    image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=300&h=300&fit=crop&crop=face',
    featured: true,
    certifications: ['Master Nail Technician', 'Certified Nail Artist', 'Advanced Gel Systems'],
    instagram: '@sarah.nails',
  },
  {
    id: '2',
    slug: 'emily-rodriguez',
    name: 'Emily Rodriguez',
    role: 'Senior Nail Technician',
    bio: 'Emily specializes in creating stunning nail art and has a keen eye for the latest trends. Her gentle approach and attention to detail make her a client favorite.',
    specialties: ['3D Nail Art', 'Acrylic Sculpting', 'Hand-Painted Designs', 'Ombré Techniques'],
    yearsExperience: 10,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
    featured: true,
    certifications: ['Certified Nail Technician', 'Advanced Nail Art'],
    instagram: '@emily.nailartist',
  },
  {
    id: '3',
    slug: 'jessica-kim',
    name: 'Jessica Kim',
    role: 'Nail Technician',
    bio: 'Jessica brings a fresh perspective to nail care with her knowledge of Korean beauty techniques. She excels at creating natural, elegant looks and specializes in minimalist nail art.',
    specialties: ['Gel Manicures', 'Natural Nail Care', 'Minimalist Designs', 'Japanese Gel'],
    yearsExperience: 7,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
    featured: true,
    certifications: ['Licensed Nail Technician', 'Korean Beauty Specialist'],
    instagram: '@jessica.nails',
  },
  {
    id: '4',
    slug: 'maya-patel',
    name: 'Maya Patel',
    role: 'Spa Specialist',
    bio: 'Maya creates the ultimate pedicure experience with her spa therapy expertise. Her soothing techniques and attention to foot health keep clients coming back for relaxation and rejuvenation.',
    specialties: ['Spa Pedicures', 'Reflexology', 'Callus Treatments', 'Aromatherapy'],
    yearsExperience: 8,
    image: 'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?w=300&h=300&fit=crop&crop=face',
    featured: true,
    certifications: ['Licensed Nail Technician', 'Reflexology Certification', 'Spa Therapy'],
  },
  {
    id: '5',
    slug: 'amanda-wright',
    name: 'Amanda Wright',
    role: 'Nail Technician',
    bio: 'Amanda is passionate about nail health and education. She loves helping clients maintain strong, beautiful nails while creating stylish looks that complement their lifestyle.',
    specialties: ['French Manicures', 'Nail Strengthening', 'Classic Styles', 'Gel Polish'],
    yearsExperience: 5,
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=300&fit=crop&crop=face',
    featured: false,
    certifications: ['Licensed Nail Technician', 'Nail Health Specialist'],
  },
  {
    id: '6',
    slug: 'lisa-nguyen',
    name: 'Lisa Nguyen',
    role: 'Junior Nail Technician',
    bio: 'Lisa is our newest team member with a talent for trendy designs and a dedication to perfecting her craft. Her enthusiasm and creativity bring fresh energy to the salon.',
    specialties: ['Trend-Inspired Designs', 'Basic Manicures', 'Polish Application', 'Nail Prep'],
    yearsExperience: 3,
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop&crop=face',
    featured: false,
    certifications: ['Licensed Nail Technician'],
    instagram: '@lisa.naildesigns',
  },
]

export const salonValues = [
  {
    id: '1',
    title: 'Expert Craftsmanship',
    description: 'Every technician is highly trained and continuously educated in the latest techniques and trends.',
    icon: 'award',
  },
  {
    id: '2',
    title: 'Premium Products',
    description: 'We use only the finest professional-grade products that are safe, effective, and long-lasting.',
    icon: 'sparkles',
  },
  {
    id: '3',
    title: 'Hygiene Excellence',
    description: 'Our sterilization procedures exceed industry standards to ensure your safety and peace of mind.',
    icon: 'shield-check',
  },
  {
    id: '4',
    title: 'Personalized Service',
    description: 'We take time to understand your preferences and customize each service to your unique needs.',
    icon: 'heart',
  },
  {
    id: '5',
    title: 'Relaxing Atmosphere',
    description: 'Our beautifully designed space provides a tranquil escape from the everyday.',
    icon: 'home',
  },
  {
    id: '6',
    title: 'Satisfaction Guaranteed',
    description: 'Your happiness is our priority. We stand behind our work with a satisfaction guarantee.',
    icon: 'smile',
  },
]