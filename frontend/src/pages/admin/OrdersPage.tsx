// import React from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { OrdersList } from '../../components/admin/OrdersList';
export function OrdersPage() {
  return <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="md:ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500">Orders received via WhatsApp</p>
        </header>

        <div className="max-w-4xl">
          <OrdersList />
        </div>
      </div>
    </div>;
}