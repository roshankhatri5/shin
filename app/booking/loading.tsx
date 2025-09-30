import { Skeleton } from '@/components/ui/skeleton'

export default function BookingLoading() {
  return (
    <div className="min-h-screen">
      {/* Header Skeleton */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </section>

      {/* Booking Wizard Skeleton */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
              <Skeleton className="h-2 w-full rounded-full" />
            </div>

            {/* Form Content */}
            <div className="bg-cream rounded-2xl p-8 space-y-6">
              <Skeleton className="h-8 w-64" />
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-32 rounded-xl" />
                ))}
              </div>
              <div className="flex justify-between pt-6">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}