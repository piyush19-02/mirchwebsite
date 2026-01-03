import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/user/Navbar';
import { Hero } from '../../components/user/Hero';
import { ProductGrid } from '../../components/user/ProductGrid';
import { Footer } from '../../components/user/Footer';
import { Helmet } from "react-helmet-async";
import Front from '../../components/user/Front';
import "aos/dist/aos.css";
import AOS from "aos";

// AOS.init({ duration: 800, once: false });

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1509358271058-acd22cc93898";

export function HomePage() {
  const [images, setImages] = useState<string[]>([DEFAULT_IMAGE]);
  const [currentImage, setCurrentImage] = useState(0);
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
const API_HOST = "http://10.221.214.70:8080";
  // 🔥 FETCH SLIDER IMAGES
  useEffect(() => { 
    fetch("/api/hero-images")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const imgs = data.map((item: any) =>
            `${API_HOST}/${item.image}`
          );
          setImages(imgs);
        } else {
          // fallback
          setImages([DEFAULT_IMAGE]);
        }
      })
      .catch(() => {
        // API fail fallback
        setImages([DEFAULT_IMAGE]);
      });
  }, []);

  // 🔁 AUTO SLIDER (only if more than 1 image)
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);




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
        <section data-aos="fade-up"   data-aos-offset="400"
  data-aos-easing="ease-in-out"  id="about" className="py-20 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* 🔥 IMAGE SLIDER */}
              <div className="relative">
                <div className="absolute -inset-4 bg-red-200 rounded-2xl h-full transform rotate-3 opacity-150"></div>

                <img
                  src={images[currentImage]}
                  alt="Spices"
                  className="relative rounded-xl shadow w-full transition-opacity duration-700"
                />
              </div>

              {/* Text */}
              <div data-aos="slide-left"  aos-offset="4000">
                <h2 className="text-3xl font-bold text-amber-950 mb-8">
                  Our Story of Spice
                </h2>

                <p className="text-lg text-amber-800/80 mb-3 leading-relaxed">
                  For over 40 years, Mirchi Masala has been synonymous with purity.
                </p>

                <p className="text-lg text-amber-800/80 leading-relaxed">
                  Traditional grinding preserves natural oils and aroma.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
