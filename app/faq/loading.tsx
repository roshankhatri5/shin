import { Skeleton } from '@/components/ui/skeleton'

export default function FAQLoading() {
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

      {/* FAQ Section Skeleton */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Search Skeleton */}
            <Skeleton className="h-12 w-full mb-8" />

            {/* Category Filters Skeleton */}
            <div className="flex flex-wrap gap-3 mb-12">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-40 rounded-full" />
              ))}
            </div>

            {/* FAQ Items Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}