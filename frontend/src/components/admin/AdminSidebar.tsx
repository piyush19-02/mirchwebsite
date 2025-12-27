import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  ShoppingBag,
  List,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export function AdminSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Add Product',
      path: '/admin/add-product',
      icon: PlusCircle
    },
    {
      name: 'View Products',
      path: '/admin/products',
      icon: List
    },
    {
      name: 'Orders',
      path: '/admin/orders',
      icon: ShoppingBag
    },
    {
      name: 'backgrund Color Products',
      path: '/admin/products-section-setting',
      icon: PlusCircle
    },
    {
      name: 'Story Images',
      path: '/admin/story-images',
      icon: PlusCircle
    }
  ];

  return (
    <>
      {/* 🔹 Mobile top bar */}
      <div className="w-10 bg-amber-950 p-2 m-5 text-white rounded-sm">
        <div className="flex items-center gap-2">
          {/* <span className="text-xl">🌶️</span> */}
          {/* <span className="font-bold">Admin Panel</span> */}
        </div>
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* 🔹 Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-white z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔹 Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64 bg-amber-950 text-amber-100
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:flex md:flex-col
        `}
      >
        <div className="p-6 border-b border-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌶️</span>
            <span className="font-bold text-xl text-white">Admin Panel</span>
          </div>

          {/* close button (mobile) */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${
                  isActive(item.path)
                    ? 'bg-red-700 text-white shadow-md'
                    : 'text-amber-200 hover:bg-amber-900 hover:text-white'
                }
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-5 border-t border-amber-900">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-amber-300 hover:bg-amber-900 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
}
