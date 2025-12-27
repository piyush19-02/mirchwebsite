import  { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [{
    name: 'Home',
    href: '/'
  }, {
    name: 'Products',
    href: '#products'
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  return <nav className="fixed top-0 z-50 w-full overflow-hidden rounded-b-2xl bg-slate-100 backdrop-blur  border border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto  sm:px-5 lg:px-7">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label="chilli">
             <img className='logo w-20 md:w-20' src={logo} alt="" />
              </span>
              <span className="font-bold  md:text-xl text-lg text-red-800 text-wrap tracking-tight">
        Shri Ganesh Masala Udhyog Dewas
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => <a key={link.name} href={link.href} className="text-amber-900 hover:text-red-700 font-medium transition-colors text-sm uppercase tracking-wide">
                {link.name}
              </a>)}
            <Link to="/admin/login" className="text-xs text-amber-500 hover:text-amber-700 font-medium ml-4">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-amber-900 hover:text-red-700 p-1 " aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden bg-white border-t border-amber-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map(link => <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-amber-900 hover:text-red-700 hover:bg-amber-50 rounded-md">
                {link.name}
              </a>)}
            <Link to="/admin/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-amber-500 hover:text-amber-700">
              Admin Login
            </Link>
          </div>
        </div>}
    </nav>;
}