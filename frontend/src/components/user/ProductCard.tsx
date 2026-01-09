import React, { lazy } from 'react';
import { Button } from '../shared/Button';
import { ShoppingBag } from 'lucide-react';
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  unit: string;
}
interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}
export function ProductCard({
  product,
  onBuy
}: ProductCardProps) {
  return <div  className="group bg-white rounded-xl shadow-2xl shadow-black border border-amber-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-amber-50">
        <img src={product.image} alt={product.name} title={product.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-amber-950 line-clamp-1">
            {product.name}
          </h3>
          {/* <span className="inline-flex items-center px-2 py-1 rounded bg-red-50 text-red-700 text-xs font-bold">
            ₹{product.price}
          </span> */}
        </div>

        <p className="text-amber-700/70 text-sm mb-y hidden lg:block line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-amber-50">
          {/* <span className="text-xs text-amber-500 font-medium">
            Per {product.unit}
          </span> */}
          <Button size="sm" onClick={() => onBuy(product)} className="shadow-red-200 w-full">
            Order Now
            <ShoppingBag className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>;
}