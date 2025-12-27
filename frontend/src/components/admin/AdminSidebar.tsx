import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ShoppingBag, List, LogOut } from 'lucide-react';
import path from 'path';
export function AdminSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navItems = [{
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: LayoutDashboard
  }, {
    name: 'Add Product',
    path: '/admin/add-product',
    icon: PlusCircle
  }, {
    name: 'View Products',
    path: '/admin/products',
    icon: List
  }, {
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
  return <div className="hidden md:flex flex-col w-64 bg-amber-950 text-amber-100 min-h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-amber-900">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌶️</span>
          <span className="font-bold text-xl text-white">Admin Panel</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path) ? 'bg-red-700 text-white shadow-md' : 'text-amber-200 hover:bg-amber-900 hover:text-white'}`}>
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </Link>)}
      </nav>

      <div className="p-4 border-t border-amber-900">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-amber-300 hover:bg-amber-900 hover:text-white transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>;
}