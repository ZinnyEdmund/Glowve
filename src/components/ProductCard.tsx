// src/components/ProductCard.tsx

import { useState } from "react";
import type { Product } from "../types";

type Props = {
  product: Product;
  onAdd: () => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const discount = product.discountPercentage || 0;
  const hasDiscount = discount > 0;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container with Carousel */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
            -{discount.toFixed(0)}% OFF
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-semibold z-10 shadow-lg flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span>{product.rating.toFixed(1)}</span>
        </div>

        {/* Product Image */}
        <img
          src={product.images?.[currentImg] || product.thumbnail}
          alt={product.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Loading Skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Image Navigation Dots */}
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {product.images.slice(0, 4).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImg(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImg === idx
                    ? "bg-white w-6"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center gap-2 mb-2">
          {product.brand && (
            <span className="text-xs font-semibold text-[#6d2929]  uppercase tracking-wide">
              {product.brand}
            </span>
          )}
          <span className="text-xs text-gray-500 capitalize">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-12">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price & Stock */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  ${(product.price / (1 - discount / 100)).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="text-xs">
            {product.stock > 10 ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : product.stock > 0 ? (
              <span className="text-orange-600 font-medium">
                Only {product.stock} left
              </span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAdd}
          disabled={product.stock === 0}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
            product.stock === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-linear-to-r from-[#755757] to-[#5a4242] text-white hover:bg-[#755757] hover:shadow-lg active:scale-95"
          }`}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
