import { ArrowRight } from "lucide-react";
import { memo } from "react";
import type { FC } from "react";

interface InstaPost {
  id: number;
  image: string;
  likes: number;
}

const INSTAGRAM_POSTS: InstaPost[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80", likes: 234 },
  { id: 2, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80", likes: 567 },
  { id: 3, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80", likes: 891 },
  { id: 4, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", likes: 432 },
  { id: 5, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80", likes: 678 },
  { id: 6, image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80", likes: 345 }
];

const InstagramFeed: FC = memo(() => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-14 space-y-3">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Follow Us{" "}
          <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">@glowve</span>
        </h2>
        <p className="text-gray-600 text-lg">Join our community and share your style</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {INSTAGRAM_POSTS.map((post, index) => (
          <a
            key={post.id}
            href="#instagram"
            className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all hover:scale-105"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <img
              src={post.image}
              alt={`Instagram post ${post.id}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
              <span className="text-white font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                ❤️ {post.likes.toLocaleString()}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="#instagram"
          className="inline-flex items-center gap-2 text-[#755757] font-semibold text-lg hover:gap-3 transition-all group"
        >
          View More on Instagram
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  </section>
));

InstagramFeed.displayName = "InstagramFeed";
export default InstagramFeed;
