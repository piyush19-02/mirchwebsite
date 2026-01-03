import React from 'react';
// import { Button } from '../shared/Button';
import { Button } from '../shared/Button';
import { ArrowRight } from 'lucide-react';
import bgImage from "../../images/herobg.png";
export function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className="relative overflow-y-hidden "   style={{
backgroundImage: `url("${bgImage}")`,
backgroundSize: 'cover',
backgroundPosition: 'center',
backgroundRepeat: 'no-repeat',

  }}>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 bg-black/60 z-10">
    
      </div>

      <div className="relative max-w-7xl shadow-lg mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32  z-20">
        <div className="  text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium mb-6 animate-fade-in-up">
            <span className="mr-2 ">🔥</span> Authentic Indian Spices
          </div>

          <h1 data-aos="fade-up" className="text-4xl font-serif md:text-6xl shadow-lg font-extrabold text-amber-300 tracking-tight mb-6 leading-tight">
            Pure & Fresh <br />
            <span data-aos="fade-down" className="text-red-700 shadow-xl">Mirchi Masala</span>
          </h1>

          <p className="text-xl md:text-2xl text-amber-100 shadow  italic font-medium mb-8 font-serif">
            "Shuddh, Teekhi aur Bharosemand Masale"
          </p>

          <p className="text-lg text-amber-100 mb-10 max-w-2xl mx-auto  shadow-2xl leading-relaxed">
            Experience the true taste of India with our hand-picked, sun-dried,
            and freshly ground spices. No preservatives, just pure flavor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={scrollToProducts} className="group min-w-[200px]">
              View Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a
        href="https://wa.me/919343185294?text=Hello%20I%20want%20Connect%20regarding%20Mirchi%20Masala%20products"
        target="_blank" variant="outline" size="lg" className="group min-w-[200px]">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>;
}