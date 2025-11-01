import type { Product } from '../types'
export function getTopSellingProducts(products: Product[]){
  type ProductWithSold = Product & { sold: number };
  return products
    .map(p=> ({ ...p, sold: (p as ProductWithSold).sold || 0 }))
    .sort((a: ProductWithSold, b: ProductWithSold) => b.sold - a.sold)
    .slice(0,5)
}
