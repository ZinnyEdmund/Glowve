import { memo, useState } from "react"
import type { FC } from "react"
import { Instagram, Heart } from "lucide-react"

interface InstaPost {
  id: number
  image: string
  likes: number
}

const INSTAGRAM_POSTS: InstaPost[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80", likes: 234 },
  { id: 2, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80", likes: 567 },
  { id: 3, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80", likes: 891 },
  { id: 4, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", likes: 432 },
  { id: 5, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80", likes: 678 },
  { id: 6, image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80", likes: 345 },
]

const INSTAGRAM_URL = "https://instagram.com/glowve"

/**
 * InstaPhoto
 * Individual photo cell with per-image load state so each image
 * gets its own skeleton rather than all loading together.
 */
function InstaPhoto({ post }: { post: InstaPost }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 block"
      aria-label={`View on Instagram — ${post.likes.toLocaleString()} likes`}
    >
      {/* Skeleton */}
      {!loaded && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}

      <img
        src={post.image}
        alt={`Glowve community post ${post.id}`}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-1.5">
          <Heart size={18} className="text-white fill-white" />
          <span className="text-white text-xs font-semibold tabular-nums">
            {post.likes.toLocaleString()}
          </span>
        </div>
      </div>
    </a>
  )
}

const InstagramFeed: FC = memo(() => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <div>
          <p className="text-[11px] font-semibold text-[#755757] uppercase tracking-widest mb-2">
            Community
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Follow{" "}
            <span className="text-[#755757]">@glowve</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Share your style with our community</p>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-[#755757] hover:text-[#755757] transition-all duration-200 shrink-0 bg-white"
        >
          <Instagram size={14} />
          Follow us
        </a>
      </div>

      {/* PHOTO GRID
          Previous: grid-cols-3 md:grid-cols-6
          - 3-col mobile = ~100px photos, too small
          - 3→6 jump at md with no 4-col or 5-col state is jarring

          Fixed: 2-col mobile → 3-col sm → 6-col lg
          Each photo is comfortably sized at every breakpoint.
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {INSTAGRAM_POSTS.map(post => (
          <InstaPhoto key={post.id} post={post} />
        ))}
      </div>

    </div>
  </section>
))

InstagramFeed.displayName = "InstagramFeed"
export default InstagramFeed