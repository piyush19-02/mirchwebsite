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
     <title>
Shree Ganesh Masala Udhyog | Premium Indian Spices Manufacturer & Exporter from Dewas, India
</title>

       <meta
  name="description"
  content="Shree Ganesh Masala Udhyog, Dewas (India) is a trusted manufacturer and supplier of premium Indian spices including red chilli powder, turmeric, coriander and garam masala. Supplying quality spices across India and for international markets."
/>
<meta
  name="keywords"
  content="
  Shree Ganesh Masala Udhyog,
  Indian spices manufacturer,
  spices exporter India,
  chilli powder exporter,
  turmeric supplier India,
  garam masala manufacturer,
  spices supplier Dewas,
  Indian masala exporter,
  bulk spices supplier,
  wholesale spices India
  "
/>
<meta property="og:title" content="Shree Ganesh Masala Udhyog – Premium Spices in Dewas -– Premium Spices in India" />
<meta property="og:description" content="Buy pure & fresh spices from Shree Ganesh Masala Udhyog, Dewas. Mirch masala, haldi, dhaniya & all Indian spices available." />
<meta property="og:type" content="business.business" />
<meta property="og:url" content="https://spicesshreeganesh.com.com" />
<meta property="og:image" content="https://spicesshreeganesh.com/logo.png" />
<meta property="og:locale" content="en_IN" />

      </Helmet>

      <Navbar />
<Front/>
<a
  href="tel:+919770298309"
 className="animate-bounce fixed bottom-40 right-7 bg-green-500 hover:bg-green-600
          text-white p-4  rounded-full shadow-lg
          flex items-center justify-center z-50"
>
  📞
</a>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919770298309?text=Hello%20I%20want%20Connect%20regarding%20Mirchi%20Masala%20products"
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
