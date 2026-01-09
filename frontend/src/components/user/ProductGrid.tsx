import React, { useEffect, useState } from "react";
import { ProductCard } from "../user/ProductCard";
import { OrderDrawer } from "../user/OrderDrawer";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
}

export function ProductGrid() {
  const API_HOST = "https://api.spicesshreeganesh.com";

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ✅ background color state INSIDE component
  const [bgColor, setBgColor] = useState("#f97316");

  // 🔹 fetch products
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(
          data.map((p: any) => ({
            id: String(p.id),
            name: p.name,
            description: p.description,
            price: p.price,
            unit: "",
            image: p.image
              ? `https://api.spicesshreeganesh.com/uploads/products/${p.image}`
              : "https://via.placeholder.com/400",
          }))
        );
      });
  }, []);

  // 🔹 fetch section background color (from admin)
  useEffect(() => {
   fetch(`${import.meta.env.VITE_API_URL}/setting`)
      .then(res => res.json())
      .then(data => {
        if (data?.bg_color) setBgColor(data.bg_color);
      });
  }, []);

  const handleBuy = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <section
      id="products"
      data-aos="fade-up"
      style={{ backgroundColor: bgColor }}
      className="py-20 overflow-x-hidden will-change-transform"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={handleBuy}
            />
          ))}
        </div>
      </div>

      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={handleClose}
        product={selectedProduct}
      />
    </section>
  );
}
