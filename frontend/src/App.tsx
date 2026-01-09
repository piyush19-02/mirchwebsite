import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/user/HomePage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AddProduct } from './pages/admin/AddProduct';
import { ViewProducts } from './pages/admin/ViewProducts';
import { OrdersPage } from './pages/admin/OrdersPage';
import { EditProduct } from './pages/admin/EditProduct';
import StoryImage from './pages/admin/StoryImage';
import ProductsSectionSetting from './pages/admin/ProductsSectionSetting';
export function App() {
  return <Router>
    
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<ViewProducts />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        <Route path="/admin/story-images" element={<StoryImage />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/admin/products-section-setting" element={<ProductsSectionSetting />} />
      </Routes>
    
    </Router>;
}