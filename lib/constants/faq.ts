export type FAQCategory = 
  | 'general'
  | 'services'
  | 'booking'
  | 'products'
  | 'pricing'

export interface FAQItem {
  id: string
  category: FAQCategory
  question: string
  answer: string
}

export const faqCategoryLabels: Record<FAQCategory, string> = {
  'general': 'General',
  'services': 'Services',
  'booking': 'Booking & Cancellation',
  'products': 'Products & Safety',
  'pricing': 'Pricing & Payments',
}

export const faqItems: FAQItem[] = [
  // General
  {
    id: '1',
    category: 'general',
    question: 'What are your hours of operation?',
    answer: 'We are open Monday through Saturday from 9:00 AM to 7:00 PM, and Sunday from 10:00 AM to 6:00 PM. We recommend booking in advance to ensure your preferred time slot is available.',
  },
  {
    id: '2',
    category: 'general',
    question: 'Where are you located?',
    answer: 'We are conveniently located in downtown at 123 Main Street. There is ample parking available in the adjacent parking structure, and we are also accessible via public transportation.',
  },
  {
    id: '3',
    category: 'general',
    question: 'Do I need an appointment?',
    answer: 'While we accept walk-ins based on availability, we highly recommend booking an appointment to guarantee your preferred time and technician. You can book online through our website or call us directly.',
  },
  {
    id: '4',
    category: 'general',
    question: 'What safety measures do you follow?',
    answer: 'We follow strict sanitation protocols including sterilizing all tools, using disposable files and buffers, and maintaining a clean environment. All our technicians are licensed and trained in proper hygiene practices.',
  },
  
  // Services
  {
    id: '5',
    category: 'services',
    question: 'How long does a gel manicure last?',
    answer: 'Our gel manicures typically last 2-3 weeks without chipping when properly cared for. We use premium gel products and proper application techniques to ensure maximum longevity.',
  },
  {
    id: '6',
    category: 'services',
    question: 'What is the difference between gel and regular polish?',
    answer: 'Gel polish is cured under UV/LED light and lasts 2-3 weeks without chipping, while regular polish air-dries and typically lasts 5-7 days. Gel provides a more durable, high-shine finish.',
  },
  {
    id: '7',
    category: 'services',
    question: 'Can you remove my old gel polish?',
    answer: 'Yes! We offer gel removal services. If you are getting a new gel manicure with us, removal is complimentary. Stand-alone removal service is available for a small fee.',
  },
  {
    id: '8',
    category: 'services',
    question: 'Do you offer nail art and custom designs?',
    answer: 'Absolutely! Our talented nail artists can create everything from simple accent nails to intricate custom designs. Nail art pricing varies based on complexity - please ask your technician for details.',
  },
  {
    id: '9',
    category: 'services',
    question: 'What types of extensions do you offer?',
    answer: 'We offer both acrylic and gel extensions in various lengths and shapes. During your consultation, your technician will help you choose the best option for your lifestyle and preferences.',
  },
  
  // Booking & Cancellation
  {
    id: '10',
    category: 'booking',
    question: 'How do I book an appointment?',
    answer: 'You can book online through our website 24/7, call us during business hours, or download our mobile app. Online booking allows you to see real-time availability and choose your preferred technician.',
  },
  {
    id: '11',
    category: 'booking',
    question: 'What is your cancellation policy?',
    answer: 'We require at least 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a fee. We understand emergencies happen - please call us as soon as possible.',
  },
  {
    id: '12',
    category: 'booking',
    question: 'Can I request a specific technician?',
    answer: 'Yes! When booking online or by phone, you can request your preferred technician. We will do our best to accommodate your request based on availability.',
  },
  {
    id: '13',
    category: 'booking',
    question: 'How early should I arrive for my appointment?',
    answer: 'Please arrive 5-10 minutes early to check in and fill out any necessary forms. This ensures your service can start on time. If you are running late, please call us.',
  },
  
  // Products & Safety
  {
    id: '14',
    category: 'products',
    question: 'What brands of polish do you use?',
    answer: 'We use premium professional brands including OPI, Essie, CND, and Gelish. All our products are high-quality, long-lasting, and come in a wide range of colors.',
  },
  {
    id: '15',
    category: 'products',
    question: 'Are your products safe and non-toxic?',
    answer: 'Yes! We prioritize using products that are 5-free or better, meaning they are formulated without harmful chemicals like formaldehyde, toluene, and DBP. We are happy to discuss product ingredients with you.',
  },
  {
    id: '16',
    category: 'products',
    question: 'Do you accommodate allergies or sensitivities?',
    answer: 'Absolutely. Please inform your technician of any allergies or sensitivities before your service. We have alternative products available and can customize your service accordingly.',
  },
  {
    id: '17',
    category: 'products',
    question: 'Can I bring my own polish?',
    answer: 'While we have an extensive color selection, you are welcome to bring your own polish. Please note that we cannot guarantee the quality or longevity of products not used regularly in our salon.',
  },
  
  // Pricing & Payments
  {
    id: '18',
    category: 'pricing',
    question: 'What forms of payment do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and cash. We also offer digital payment options including Apple Pay and Google Pay.',
  },
  {
    id: '19',
    category: 'pricing',
    question: 'Do you offer any packages or memberships?',
    answer: 'Yes! We offer various service packages and a VIP membership program with exclusive benefits and discounts. Visit our Special Offers page or ask at the salon for current promotions.',
  },
  {
    id: '20',
    category: 'pricing',
    question: 'Is gratuity included in the service price?',
    answer: 'Gratuity is not included in our service prices. Tips for your technician are greatly appreciated and can be added when paying by card or given in cash.',
  },
  {
    id: '21',
    category: 'pricing',
    question: 'Do you offer gift cards?',
    answer: 'Yes! Gift cards are available in any denomination and can be purchased in-salon or online. They make perfect gifts for birthdays, holidays, or any special occasion.',
  },
]