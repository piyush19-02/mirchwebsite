import React, { useEffect, useState, Component } from 'react';
import { X, MessageCircle, MapPin, User, Phone, ShoppingBag } from 'lucide-react';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Product } from './ProductCard';
interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}
export function OrderDrawer({
  isOpen,
  onClose,
  product
}: OrderDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // Reset state when drawer opens/closes
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setFormData({
        name: '',
        mobile: '',
        address: ''
      });
      setShowSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);
  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  if (!isOpen || !product) return null;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // 1️⃣ ORDER BACKEND ME SAVE
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product.id,
        product_name: product.name,
        qty: quantity,
        customer_name: formData.name,
        mobile: formData.mobile,
        location: formData.address,
      }),
    });

    // 2️⃣ WHATSAPP OPEN
    const message = `
Order Details:
Product: ${product.name}
Qty: ${quantity}
Name: ${formData.name}
Mobile: ${formData.mobile}
Address: ${formData.address}
price: ₹${product.price * quantity}
`;

    window.open(
      `https://wa.me/918224950286?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setShowSuccess(true);
  } catch {
    alert("Order failed");
  } finally {
    setIsSubmitting(false);
  }
};

  return <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300" onClick={onClose} aria-hidden="true" />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-amber-50/50">
          <h2 className="text-xl font-bold text-amber-950 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-red-600" />
            Place Order
          </h2>
          <button onClick={onClose} className="p-2 text-amber-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {showSuccess ? <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-800">
                Order Ready!
              </h3>
              <p className="text-amber-700 max-w-xs">
                Your order details have been prepared. Click below to send via
                WhatsApp.
              </p>
              <Button onClick={onClose} className="mt-4 bg-green-600 hover:bg-green-700">
                Open WhatsApp
              </Button>
            </div> : <div className="space-y-8">
              {/* Product Summary */}
              <div className="flex gap-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md shadow-sm" />
                <div>
                  <h3 className="font-bold text-amber-950">{product.name}</h3>
                  <p className="text-sm text-amber-700">
                    {product.description}
                  </p>
                  <p className="text-red-700 font-bold mt-1">
                    ₹{product.price}{' '}
                    <span className="text-xs font-normal text-amber-600">
                      / {product.unit}
                    </span>
                  </p>
                </div>
              </div>

              {/* Order Form */}
              <form id="order-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-1">
                      Quantity (Packets)
                    </label>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-md border border-amber-200 flex items-center justify-center hover:bg-amber-50 text-amber-900">
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-lg text-amber-950">
                        {quantity}
                      </span>
                      <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-md border border-amber-200 flex items-center justify-center hover:bg-amber-50 text-amber-900">
                        +
                      </button>
                    </div>
                  </div>

                  <Input label="Full Name" name="name" placeholder="Enter your name" required value={formData.name} onChange={handleInputChange} />

                  <Input label="Mobile Number" name="mobile" type="tel" placeholder="10-digit mobile number" required value={formData.mobile} onChange={handleInputChange} />

                  

                  <Input label="Delivery Address" name="address" multiline placeholder="House no, Street, City, Pincode" required value={formData.address} onChange={handleInputChange} />
                </div>
              </form>
            </div>}
        </div>

        {/* Footer Actions */}
        {!showSuccess && <div className="p-6 border-t border-amber-100 bg-white">
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-amber-600">Total Amount:</span>
              <span className="text-xl font-bold text-red-700">
                ₹{product.price * quantity}
              </span>
            </div>
            <Button type="submit" form="order-form" fullWidth size="lg" isLoading={isSubmitting} className="bg-[#25D366] hover:bg-[#128C7E] text-white">
              Order on WhatsApp <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
          </div>}
      </div>
    </>;
}