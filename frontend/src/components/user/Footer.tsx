import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
export function Footer() {
  return <footer className="bg-amber-950 text-amber-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl" role="img" aria-label="chilli">
                
              </span>
              <span className="font-bold text-2xl text-white tracking-tight">
                Mirchi Masala
              </span>
            </div>
            <p className="text-amber-200/80 leading-relaxed">
              Bringing the authentic taste of Indian spices to your kitchen.
              Pure, fresh, and full of flavor.<br/>
              ✔ Made in India  <br/>
✔ Bulk Supply Available  <br/>
✔ Export Quality Spices  <br/>
✔ Worldwide Enquiry via WhatsApp  

            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-amber-200/80 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-amber-200/80 hover:text-white transition-colors">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-amber-200/80 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-amber-200/80 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div id="contact">
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-amber-200/80">
              shop no 201 , Hevat Ram Marg , Sukervariya Hat
                  <br />
                 Dewas Madhya Pradesh , India - 455001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-amber-200/80">+91 9770298309</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-amber-200/80">
                  santoshfn@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-900 pt-8 text-center text-sm text-amber-400/60">
          <p>
            &copy; {new Date().getFullYear()} Mirchi Masala Store. All rights
            reserved.
          </p>
          <p>Devloped & Devloped with ❤️ By <a className='text-blue-600' href='https://www.linkedin.com/in/piyush-yadav-500805228/' target='_blank' >Piyush & Ajay</a > </p>
          <p>Feel Free to contact: 8224950286 , 9343185294</p>
        </div>
      </div>
    </footer>;
}