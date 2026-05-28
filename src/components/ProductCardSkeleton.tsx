import { memo } from "react"

/**
 * ProductCardSkeleton
 * Pulse-animated loading placeholder that matches the ProductCard layout exactly.
 * Prevents layout shift during data fetch.
 *
 * Usage:
 *   {isLoading
 *     ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
 *     : products.map(p => <ProductCard key={p.id} {...p} />)
 *   }
 */
export const ProductCardSkeleton = memo(() => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
    {/* Image placeholder */}
    <div className="aspect-square bg-gray-100" />
    {/* Content */}
    <div className="p-4 space-y-3">
      <div className="h-3.5 bg-gray-100 rounded-full w-3/4" />
      <div className="h-3 bg-gray-100 rounded-full w-1/3" />
      <div className="pt-1">
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
      </div>
    </div>
  </div>
))
ProductCardSkeleton.displayName = "ProductCardSkeleton"

/** Skeleton for testimonial cards */
export const TestimonialSkeleton = memo(() => (
  <div className="bg-white rounded-2xl border border-gray-100 p-7 animate-pulse">
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-3 h-3 rounded-sm bg-gray-100" />
      ))}
    </div>
    <div className="space-y-2 mb-6">
      <div className="h-3 bg-gray-100 rounded-full w-full" />
      <div className="h-3 bg-gray-100 rounded-full w-4/5" />
      <div className="h-3 bg-gray-100 rounded-full w-2/3" />
    </div>
    <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
      <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
      <div className="space-y-1.5 flex-1">
        <div className="h-3 bg-gray-100 rounded-full w-28" />
        <div className="h-2.5 bg-gray-100 rounded-full w-20" />
      </div>
    </div>
  </div>
))
TestimonialSkeleton.displayName = "TestimonialSkeleton"

/** Skeleton for category feature cards */
export const FeatureCardSkeleton = memo(() => (
  <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100 animate-pulse" />
))
FeatureCardSkeleton.displayName = "FeatureCardSkeleton"