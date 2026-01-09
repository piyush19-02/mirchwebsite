import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { Product } from "./ProductCard";

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function OrderDrawer({ isOpen, onClose, product }: OrderDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  /* 🔒 BODY SCROLL LOCK */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* RESET */
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setShowSuccess(false);
      setIsSubmitting(false);
      setFormData({ name: "", mobile: "", address: "" });
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  /* ✅ ORIGINAL LOGIC – BACKEND + WHATSAPP */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 🔹 BACKEND SAVE
      await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          product_name: product.name,
          qty: quantity,
          customer_name: formData.name,
          mobile: formData.mobile,
          location: formData.address,
          total: product.price * quantity,
        }),
      });

      // 🔹 WHATSAPP MESSAGE
      const message = `
🛒 *New Order*
Product: ${product.name}
Qty: ${quantity}
Name: ${formData.name}
Mobile: ${formData.mobile}
Address: ${formData.address}
Total: ₹${product.price * quantity}
`;

      window.open(
        `https://wa.me/919770298309?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      setShowSuccess(true);
    } catch {
      alert("Order failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* 🔹 DRAWER JSX */
  const drawer = (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 z-[9998]"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-white z-[9999] flex flex-col shadow-2xl">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-amber-50">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag className="text-red-600" /> Place Order
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6">
          {showSuccess ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <MessageCircle className="w-14 h-14 text-green-600" />
              <h3 className="text-xl font-bold text-green-700">
                Order Sent on WhatsApp
              </h3>
              <Button onClick={onClose} className="bg-green-600">
                Close
              </Button>
            </div>
          ) : (
            <>
              {/* PRODUCT */}
              <div className="flex gap-4 mb-6">
                <img
                  src={product.image}
                  className="w-20 h-20 rounded object-cover"
                />
                <div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label>Quantity</label>
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span className="w-10 text-center">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>

                <Input label="Full Name" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                <Input label="Mobile" value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />

                <Input label="Address" multiline value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </form>
            </>
          )}
        </div>

        {/* FOOTER (UP FROM BOTTOM) */}
        {!showSuccess && (
          <div className="p-6 border-t mb-6">
            <div className="flex justify-between mb-3">
              <span>Total</span>
              <span className="font-bold text-red-600">
                ₹{product.price * quantity}
              </span>
            </div>

            <Button
              onClick={handleSubmit as any}
              isLoading={isSubmitting}
              className="w-full bg-[#25D366]"
            >
              Order on WhatsApp <MessageCircle className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </>
  );

  return createPortal(drawer, document.body);
}
