'use client'

import React, { useState } from 'react'
import {
  Button,
  Input,
  Textarea,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Modal,
  Badge,
  Avatar,
  Skeleton,
  Spinner,
  Accordion,
  ToastProvider,
  useToast,
  Tabs,
  Tooltip,
  Rating,
  FormField,
} from '@/components/ui'

const ShowcaseSection: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({
  title,
  description,
  children,
}) => (
  <section className="mb-16">
    <h2 className="font-heading text-h2 text-charcoal mb-2">{title}</h2>
    {description && <p className="text-body text-charcoal-light mb-6">{description}</p>}
    <div className="space-y-8">{children}</div>
  </section>
)

const ComponentGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="font-heading text-h4 text-charcoal mb-4">{title}</h3>
    <div className="flex flex-wrap items-center gap-4">{children}</div>
  </div>
)

function ShowcaseContent() {
  const { showToast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rating, setRating] = useState(3.5)

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="font-display text-display-lg text-charcoal mb-4">
            UI Component Library
          </h1>
          <p className="text-body-lg text-charcoal-light max-w-3xl">
            A comprehensive collection of accessible, responsive, and beautifully designed components
            for the luxury nail salon website. Built with React, TypeScript, Tailwind CSS, and Framer
            Motion.
          </p>
        </header>

        {/* Buttons */}
        <ShowcaseSection title="Buttons" description="Interactive buttons with various styles, sizes, and states">
          <ComponentGroup title="Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </ComponentGroup>

          <ComponentGroup title="Sizes">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </ComponentGroup>

          <ComponentGroup title="States">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth>Full Width</Button>
          </ComponentGroup>

          <ComponentGroup title="With Icons">
            <Button leftIcon={<span>←</span>}>With Left Icon</Button>
            <Button rightIcon={<span>→</span>}>With Right Icon</Button>
          </ComponentGroup>
        </ShowcaseSection>

        {/* Form Inputs */}
        <ShowcaseSection title="Form Inputs" description="Text inputs, textareas, and selects with validation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              helperText="We'll never share your email"
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="(555) 000-0000"
              error="Please enter a valid phone number"
            />
            <Input label="Name" placeholder="Your name" required />
            <Input label="Disabled" placeholder="Cannot edit" disabled value="Disabled value" />
          </div>

          <div className="max-w-2xl">
            <Textarea
              label="Message"
              placeholder="Type your message here..."
              helperText="Maximum 500 characters"
              maxLength={500}
              showCount
            />
          </div>

          <div className="max-w-md">
            <Select
              label="Service Type"
              options={[
                { value: '', label: 'Select a service' },
                { value: 'manicure', label: 'Manicure' },
                { value: 'pedicure', label: 'Pedicure' },
                { value: 'nail-art', label: 'Nail Art' },
              ]}
            />
          </div>
        </ShowcaseSection>

        {/* Cards */}
        <ShowcaseSection title="Cards" description="Container components with various styles">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Simple card with shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body text-charcoal-light">
                  This is a default card with basic styling and subtle shadow.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Learn More</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated" hover>
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Hover for lift effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body text-charcoal-light">
                  This card has a hover effect that lifts it up.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">
                  Explore
                </Button>
              </CardFooter>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Bordered Card</CardTitle>
                <CardDescription>With rose gold border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body text-charcoal-light">
                  This card features a decorative border.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </ShowcaseSection>

        {/* Modal */}
        <ShowcaseSection title="Modal" description="Dialog component with overlay and animations">
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Welcome to Our Salon"
            description="Experience luxury nail care at its finest"
            size="md"
          >
            <div className="space-y-4">
              <p className="text-body text-charcoal-light">
                Book your appointment today and enjoy our premium services in a relaxing
                environment.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Book Now</Button>
              </div>
            </div>
          </Modal>
        </ShowcaseSection>

        {/* Badges */}
        <ShowcaseSection title="Badges" description="Status indicators and labels">
          <ComponentGroup title="Variants">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </ComponentGroup>

          <ComponentGroup title="Sizes">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </ComponentGroup>

          <ComponentGroup title="With Dot">
            <Badge variant="success" dot>
              Available
            </Badge>
            <Badge variant="error" dot>
              Busy
            </Badge>
          </ComponentGroup>
        </ShowcaseSection>

        {/* Avatars */}
        <ShowcaseSection title="Avatars" description="User profile images with status indicators">
          <ComponentGroup title="Sizes">
            <Avatar size="xs" fallback="JD" />
            <Avatar size="sm" fallback="JD" />
            <Avatar size="md" fallback="JD" />
            <Avatar size="lg" fallback="JD" />
            <Avatar size="xl" fallback="JD" />
          </ComponentGroup>

          <ComponentGroup title="With Status">
            <Avatar fallback="JS" status="online" />
            <Avatar fallback="AM" status="away" />
            <Avatar fallback="BD" status="busy" />
            <Avatar fallback="OF" status="offline" />
          </ComponentGroup>
        </ShowcaseSection>

        {/* Loading States */}
        <ShowcaseSection title="Loading States" description="Skeleton loaders and spinners">
          <ComponentGroup title="Spinners">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </ComponentGroup>

          <ComponentGroup title="Skeletons">
            <div className="space-y-4 max-w-md">
              <Skeleton variant="text" lines={3} />
              <div className="flex items-center gap-4">
                <Skeleton variant="circle" width={48} height={48} />
                <div className="flex-1">
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="80%" />
                </div>
              </div>
              <Skeleton variant="rectangle" width="100%" height={200} />
            </div>
          </ComponentGroup>
        </ShowcaseSection>

        {/* Accordion */}
        <ShowcaseSection title="Accordion" description="Collapsible content sections">
          <div className="max-w-2xl">
            <Accordion
              items={[
                {
                  id: '1',
                  trigger: 'What services do you offer?',
                  content: (
                    <p>
                      We offer a wide range of nail services including manicures, pedicures, nail
                      art, gel polish, and extensions. All services are performed by certified
                      technicians.
                    </p>
                  ),
                },
                {
                  id: '2',
                  trigger: 'How do I book an appointment?',
                  content: (
                    <p>
                      You can book an appointment through our website, by phone, or walk in if
                      we have availability. We recommend booking in advance for your preferred
                      time slot.
                    </p>
                  ),
                },
                {
                  id: '3',
                  trigger: 'What is your cancellation policy?',
                  content: (
                    <p>
                      We require 24 hours notice for cancellations. Late cancellations or
                      no-shows may be subject to a fee. Please contact us as soon as possible if
                      you need to reschedule.
                    </p>
                  ),
                },
              ]}
              defaultValue="1"
            />
          </div>
        </ShowcaseSection>

        {/* Toast */}
        <ShowcaseSection title="Toast Notifications" description="Temporary notification messages">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  variant: 'success',
                  title: 'Success!',
                  description: 'Your appointment has been booked.',
                })
              }
            >
              Show Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  variant: 'error',
                  title: 'Error',
                  description: 'Something went wrong. Please try again.',
                })
              }
            >
              Show Error Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  variant: 'warning',
                  title: 'Warning',
                  description: 'Your session will expire soon.',
                })
              }
            >
              Show Warning Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  variant: 'info',
                  title: 'Info',
                  description: 'We have new services available!',
                })
              }
            >
              Show Info Toast
            </Button>
          </div>
        </ShowcaseSection>

        {/* Tabs */}
        <ShowcaseSection title="Tabs" description="Organize content into tabbed sections">
          <div className="max-w-3xl">
            <Tabs
              tabs={[
                {
                  value: 'services',
                  label: 'Services',
                  content: (
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-heading text-h4 mb-2">Our Services</h4>
                      <p className="text-body text-charcoal-light">
                        Explore our comprehensive range of nail care services, from classic
                        manicures to intricate nail art designs.
                      </p>
                    </div>
                  ),
                },
                {
                  value: 'pricing',
                  label: 'Pricing',
                  content: (
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-heading text-h4 mb-2">Transparent Pricing</h4>
                      <p className="text-body text-charcoal-light">
                        View our competitive prices for all services. We believe in transparent
                        pricing with no hidden fees.
                      </p>
                    </div>
                  ),
                },
                {
                  value: 'gallery',
                  label: 'Gallery',
                  content: (
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-heading text-h4 mb-2">Our Work</h4>
                      <p className="text-body text-charcoal-light">
                        Browse through our portfolio of stunning nail designs and satisfied
                        customers.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </ShowcaseSection>

        {/* Tooltip */}
        <ShowcaseSection title="Tooltips" description="Contextual information on hover">
          <div className="flex flex-wrap gap-8">
            <Tooltip content="This is a top tooltip" position="top">
              <Button variant="outline">Hover Top</Button>
            </Tooltip>
            <Tooltip content="This is a bottom tooltip" position="bottom">
              <Button variant="outline">Hover Bottom</Button>
            </Tooltip>
            <Tooltip content="This is a left tooltip" position="left">
              <Button variant="outline">Hover Left</Button>
            </Tooltip>
            <Tooltip content="This is a right tooltip" position="right">
              <Button variant="outline">Hover Right</Button>
            </Tooltip>
          </div>
        </ShowcaseSection>

        {/* Rating */}
        <ShowcaseSection title="Rating" description="Star rating component for reviews">
          <div className="space-y-6">
            <ComponentGroup title="Interactive">
              <div className="space-y-2">
                <Rating value={rating} onChange={setRating} allowHalf />
                <p className="text-body-sm text-charcoal-light">
                  Current rating: {rating} / 5
                </p>
              </div>
            </ComponentGroup>

            <ComponentGroup title="Read-only">
              <Rating value={4.5} readonly allowHalf />
              <Rating value={3} readonly />
              <Rating value={5} readonly />
            </ComponentGroup>

            <ComponentGroup title="Sizes">
              <Rating value={4} size="sm" readonly />
              <Rating value={4} size="md" readonly />
              <Rating value={4} size="lg" readonly />
            </ComponentGroup>
          </div>
        </ShowcaseSection>

        {/* Form Field Wrapper */}
        <ShowcaseSection title="Form Field" description="Wrapper component for consistent form layouts">
          <div className="max-w-md space-y-4">
            <FormField
              label="Full Name"
              helperText="Enter your first and last name"
              required
            >
              <Input placeholder="John Doe" />
            </FormField>

            <FormField label="Email" error="Please enter a valid email address" required>
              <Input type="email" placeholder="john@example.com" />
            </FormField>

            <FormField label="Comments" helperText="Optional feedback">
              <Textarea placeholder="Share your thoughts..." />
            </FormField>
          </div>
        </ShowcaseSection>
      </div>
    </div>
  )
}

export default function ComponentsPage() {
  return (
    <ToastProvider>
      <ShowcaseContent />
    </ToastProvider>
  )
}