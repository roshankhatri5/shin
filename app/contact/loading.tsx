import { Skeleton } from '@/components/ui/skeleton'

export default function ContactLoading() {
  return (
    <div className="min-h-screen">
      {/* Header Skeleton */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-16 w-2/3 mx-auto" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
            {/* Form Skeleton */}
            <div className="bg-white rounded-2xl p-8 md:p-10 space-y-6">
              <Skeleton className="h-8 w-48 mb-6" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>

            {/* Info Skeleton */}
            <div className="bg-white rounded-2xl p-8 md:p-10 space-y-8">
              <Skeleton className="h-8 w-48 mb-6" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}