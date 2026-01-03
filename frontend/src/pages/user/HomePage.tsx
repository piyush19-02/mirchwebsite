import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/user/Navbar';
import { Hero } from '../../components/user/Hero';
import { ProductGrid } from '../../components/user/ProductGrid';
import { Footer } from '../../components/user/Footer';
import { Helmet } from "react-helmet-async";
import Front from '../../components/user/Front';
import "aos/dist/aos.css";
import AOS from "aos";
import Story from '../../components/user/Story';

// AOS.init({ duration: 800, once: false });


export function HomePage() {

useEffect(() => {
    AOS.init({
      duration: window.innerWidth < 768 ? 400 : 700,
      offset: 100,
      once: false,
      easing: 'ease-out-cubic',
    });

    window.addEventListener('load', () => {
      AOS.refresh();
    });
  }, []);



  return (
    <div  className="min-h-screen  font-sans text-slate-900">
      <Helmet>
        <title>Mirchi Masala | Pure Spices Online</title>
        <meta
          name="description"
          content="Buy pure red chilli, turmeric, garam masala directly from farmers. 100% authentic spices."
        />
      </Helmet>

      <Navbar />
<Front/>
<a
  href="tel:+919343185294"
 className="animate-bounce fixed bottom-40 right-7 bg-green-500 hover:bg-green-600
          text-white p-4  rounded-full shadow-lg
          flex items-center justify-center z-50"
>
  📞
</a>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919343185294?text=Hello%20I%20want%20Connect%20regarding%20Mirchi%20Masala%20products"
        target="_blank"
        className="animate-bounce fixed bottom-5 right-5 bg-green-500 hover:bg-green-600
          text-white p-4 my-10 rounded-full shadow-lg
          flex items-center justify-center z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 fill-white">
          <path d="M16 .3C7.3.3.3 7.3.3 16c0 2.8.7 5.5 2.1 7.9L.1 31.7l7.9-2.1
          c2.3 1.3 5 2.1 7.9 2.1 8.7 0 15.7-7 15.7-15.7S24.7.3 16 .3z"/>
        </svg>
      </a>

      <main>
        <Hero />
        <ProductGrid />

        {/* About Section */}
  </main>
<Story/>
      <Footer />
    </div>
  );
}
